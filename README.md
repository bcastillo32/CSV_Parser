Hi! Thank you for looking over my submission! I am looking forward to feedback and potential next steps!

Video here: https://www.loom.com/share/57a6d03b6d53499fb4c87f69306822e0

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

Was there anything you got stuck on, and if so what did you do to resolve it?

    - I got stuck on whether or not to buld an simple CSV uploader and actually ended up wasting a lot of time doing that and ultimately scrapped that idea for the sake of time. I ended up using a library called CSV-Parser instead and this ended up keeping my code much more clean and concise. I also was stuck on the Idempotency part. The only way I can think of doing it was deleting the DB everytime but That would mean you could lose data and it could be inaccurate. For the sake of time, I didnt get to finihsing Idempotency. My thought was to compare the data to what is already in the database but at this point, If I were to go about figuring that out it would have taken me more time than what is being asked here. I will still look at how to do that as this is something that is pretty interesting to me!

Do you have any suggestions for improving the API documentation to make it clearer or easier to use?

    - One suggestion I have is clarification on if you want the averages rounded or want a specific decimal place. I ended up roundning up! Overall, I feel like the documentation was pretty clear. Anything I had issues with was due to this API being completely new to me.

A list of links to any major sources you relied on, if any (e.g. a StackOverflow response about how to structure Node CLI applications)

    - Mostly the Notion API docs and MDN!

A list of major open-source libraries you chose to use and their purpose, if any (e.g. "Axios for networking")

    - CSV - Parser https://www.npmjs.com/package/csv-parser was huge for me!

Thank you again for reading! I appreciate the opportunity. This was a great experience!

Brandon Castillo
