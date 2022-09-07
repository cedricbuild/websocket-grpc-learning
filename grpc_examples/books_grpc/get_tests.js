const client = require("./client");

// get all books
client.getAllBooks({}, (error, books) => {
  if (!error) throw error;
  console.log(books);
});

// add a book
client.AddBook(
  {
    title: "Title book",
    author: "Body content 3",
    pages: 400,
  },
  (error, book) => {
    if (error) throw error;
    console.log("Successfully added a book.");
  }
);

// edit a book
client.EditBook(
  {
    id: 2,
    title: "Body content 2 edited.",
    author: "author edited.",
    pages: 522,
  },
  (error, book) => {
    if (error) throw error;
    console.log("Successfully edited a book");
  }
);

// delete a book
client.DeleteBook(
  {
    id: 2,
  },
  (error, book) => {
    if (error) throw error;
    console.log("Successfully deleted a book");
  }
);