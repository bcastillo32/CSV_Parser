import { Client } from '@notionhq/client';
import csv from 'csv-parser';
import fs from 'fs';

const notion = new Client({
  auth: 'secret_MmOjLSmGJSCeYQZXApaO04K7FioJ4pS1a91i0azzW3A'
});

const databaseId = '5f75e6f065214229ad99e1ca8350ac71';

function OrganizeData() {
  const arr = [];
  fs.createReadStream('ratings.csv')
    .pipe(csv(['Book Title', 'Reader', 'Rating']))
    .on('data', (data) => {
      data['Book Title'] = data['Book Title'].trim().toLowerCase();
      arr.push(data);
    })
    .on('end', () => solution(arr));
  const solution = (arr) => {
    let books = {};
    for (let i = 0; i < arr.length; i++) {
      let entry = arr[i];
      // create title object if it doesn't exist
      let title = entry['Book Title'];
      let reader = entry['Reader'];
      let rating = Number(entry['Rating']);
      let TOP_RATING = 5;

      if (!books[title]) {
        books[title] = {
          favorites: 0,
          ratingSum: 0,
          avgRating: 0,
          readers: { total: 0 }
        };
      }

      // new reader
      if (!books[title].readers[reader]) {
        if (rating == TOP_RATING) books[title].favorites++;
        books[title].readers[reader] = rating;
        books[title].ratingSum += rating;
        books[title].readers.total++;
        books[title].avgRating = Math.round(
          books[title].ratingSum / books[title].readers.total
        ).toPrecision(2);
        continue;
      }

      // existing reader
      let existingRating = books[title].readers[reader];
      let diff = Math.abs(existingRating - rating);
      // update favorites
      if (rating == TOP_RATING && existingRating !== TOP_RATING)
        books[title].favorites += 1;
      // update ratingSum
      if (existingRating == TOP_RATING && rating !== TOP_RATING)
        books[title].favorites -= 1;
      books[title].ratingSum += existingRating > rating ? -diff : diff;
      // update reader rating
      books[title].readers[reader] = rating;
      books[title].avgRating = Math.round(
        books[title].ratingSum / books[title].readers.total
      ).toPrecision(2);
    }

    const titles = Object.keys(books);
    for (let i = 0; i < titles.length; i++) {
      addRow(titles[i], books[titles[i]]);
    }
  };
}

async function addRow(title, props) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        },
        'Avg Rating': {
          rich_text: [
            {
              text: {
                content: String(props.avgRating)
              }
            }
          ]
        },
        'Number of Times Favorited': {
          rich_text: [
            {
              text: {
                content: String(props.favorites)
              }
            }
          ]
        }
      }
    });
    console.log(response);
    console.log('Success! Entry added.');
  } catch (error) {
    console.error(error.body);
  }
}

OrganizeData();
