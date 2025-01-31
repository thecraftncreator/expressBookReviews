let books = require("./router/booksdb.js");
let title = "The Divine Comedy"
let newPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
    resolve("Found: ")
},1000)})

newPromise.then((successMessage) => {
    for (const [key, value] of Object.entries(books)) {
        if (value.title == title) {
            console.log(successMessage + JSON.stringify(books[key],null,4));
        }
      }
})