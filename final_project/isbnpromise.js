let books = require("./router/booksdb.js");
let id = 1
let newPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
    resolve("Found: ")
},1000)})

newPromise.then((successMessage) => {
    console.log(successMessage + JSON.stringify(books[id],null,4))
})