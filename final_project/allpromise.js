let books = require("./router/booksdb.js");
let allPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
    resolve("Found: ")
},1000)})

allPromise.then((successMessage) => {
console.log(successMessage + JSON.stringify(books,null,4))
})