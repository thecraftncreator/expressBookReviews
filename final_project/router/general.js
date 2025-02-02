const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/books',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  res.send(JSON.stringify(books[req.params.isbn],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  for (const [key, value] of Object.entries(books)) {
    if (value.author == req.params.author) {
        res.send(JSON.stringify(books[key],null,4));
        //That's that and this is this, I suppose. Might as well put a break here.
        break
    }
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //In theory this works, but i don't know how you handle curl commands with spaces.
    for (const [key, value] of Object.entries(books)) {
        if (value.title == req.params.title) {
            res.send(JSON.stringify(books[key],null,4));
        }
      }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Well, I guess they ARE empty after all.
    res.send(JSON.stringify(books[req.params.isbn].reviews,null,4));
});


module.exports.general = public_users;
