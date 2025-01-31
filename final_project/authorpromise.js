let books = require("./router/booksdb.js");
let author = "Unknown"
let newPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
    resolve("Found: ")
},1000)})

newPromise.then((successMessage) => {
    for (const [key, value] of Object.entries(books)) {
    if (value.author == author) {
        console.log(successMessage + JSON.stringify(books[key],null,4))
        //That's that and this is this, I suppose. Might as well put a break here.
        break
    }
  }
})