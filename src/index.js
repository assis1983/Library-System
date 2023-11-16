const BookRepository = require("./repositories/BookRepository");
const MongoBookRepository = require("./repositories/MongoBookRepository");
const BookService = require("./services/BookService");
const { books, client } = require("./database/data");

const mongoRepository = new MongoBookRepository(books)
const repository = new BookRepository()
const service = new BookService(mongoRepository)

;(async () => {
  // await service.create("Sexta Feira 13", "terror", 1000, "Eder", "Terror Geral")

  // await service.update("65568877ab0414dd443db783", {
  //   title: "Poeira em Alto Mar",
  //   description: "Alteração",
  //   releasedAt: 1990,
  //   author: "Eder Assis",
  //   category: "Juvenil"
  // })

  // const paolaBooks = await service.findAllByAuthor("Paola")
  // console.log(paolaBooks)
  // // Exemplo de uso do método deleteById
  
  await service.deleteById("65568c133f204af6a745a574");
  

  client.close()

})()