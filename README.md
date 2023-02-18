To run my program, run node index.js from the terminal :)

My program takes in CSV data, parses that data, organizes and aggregates the data into a hash and then uploads that organized data into a Notion databse. The data comes in a bit messy, so I made sure to trim any extra whitespace in the text and also made sure to convert all text to lowercase to mitigate any risk of duplicate entries.

Once I had the cleaned up data from the CSV, I was left with a Book Title, a Reader and a Rating. The data is organized into the books hash like so:

books[title] = {
favorites: 0,
ratingSum: 0,
avgRating: 0,
readers: { total: 0 }
}

I made sure to sum up all of the ratings and number of times rated (for readers who rated the book multiple times, their most recent rating was used in the ratingSum). I also counted number of times a book recived a rating of 5 (this was adjusted as ratings came in for both new and existing readers for that book title). With this data I was able to get the average rating of each book. What you'll see in my notion database are rows with the follwing info: Book, Avg Rating and Number of Times favorited.


 
