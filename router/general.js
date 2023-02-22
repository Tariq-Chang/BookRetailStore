const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      res.status(201).json({ message: "User Created" });
    } else {
      res.send("User already exists");
    }
  } else {
    return res.send("Error While Registering the user.");
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let singleBook = null;
  for (key in books) {
    if (key === isbn) {
      singleBook = books[key];
    }
  }
  if (!singleBook) {
    return res
      .status(404)
      .json({ message: "Could not get book with this ISBN" });
  }
  return res.status(200).json(singleBook);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  let matchBooks = [];
  let book = null;
  for (key in books) {
    book = books[key];

    if (book.author === author) {
      matchBooks.push(book);
    }
  }
  if (matchBooks.length > 0) res.status(200).json(matchBooks);
  else
    return res
      .status(404)
      .json({ message: `Book with author name ${author} is not available` });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  let matchBooks = [];
  let book = null;
  for (key in books) {
    book = books[key];

    if (book.title === title) {
      matchBooks.push(book);
    }
  }
  if (matchBooks.length > 0) res.status(200).json(matchBooks);
  else
    return res
      .status(404)
      .json({ message: `Book with author name ${author} is not available` });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let singleBook = null;

  for (key in books) {
    if (key === isbn) {
      singleBook = books[key];
      break;
    }
  }
  if (!singleBook) {
    return res
      .status(404)
      .json({ message: "There is no book with this isbn number" });
  }
  res.send(singleBook.reviews);
});

module.exports.general = public_users;
