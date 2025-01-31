const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
 // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
   // Filter the users array for any user with the same username and password
   let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const Book = books[req.index]
    const password = req.password
    const username = req.username

    if (authenticatedUser(username, password)) {

        const lEntry = "None"
        const newReview = {
            "Review": req.review,
            "User": username
        }
        let sameUser = Book.reviews.filter((entry) => {
            lEntry = entry
            return entry.User === username;
        });

        if (sameUser.length > 0) {
            //Update entry
            lEntry.Review = req.newReview
            return res.status(404).json({ message: "Updated entry!" });
        } else {
            //Add entry.
            books.reviews.push(newReview);
            return res.status(404).json({ message: "Added entry!" });
        }
        //users.push({"username": username, "password": password});
    } else {
        return res.status(404).json({ message: "User does not exist or password is wrong!" });
    }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const Book = books[req.index]
    const password = req.password
    const username = req.username
    const rIndex = 0

    if (authenticatedUser(username, password)) {
        let sameUser = Book.reviews.filter((entry) => {
            rIndex = rIndex + 1
            return entry.User === username;
        });

        if (sameUser.length > 0) {
            //Update entry
            Book.reviews.splice(rIndex,1)
            return res.status(404).json({ message: "Removed!" });
        } else {
            //Add entry.
            return res.status(404).json({ message: "Nothing to remove!" });
        }
        //users.push({"username": username, "password": password});
    } else {
        return res.status(404).json({ message: "User does not exist or password is wrong!" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
