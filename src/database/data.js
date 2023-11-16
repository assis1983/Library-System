const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb+srv://assisederjd:Je4KKLJDy5T5XYrK@library.de0h7et.mongodb.net/");

const dbName = "BibliotecadeLivrosEder"

const books = client
  .db(dbName)
  .collection("books")

module.exports = { client, books }