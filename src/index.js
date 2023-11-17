const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BookRepository = require("./repositories/BookRepository");
const MongoBookRepository = require("./repositories/MongoBookRepository");
const BookService = require("./services/BookService");
const { books, client } = require("./database/data");

const mongoRepository = new MongoBookRepository(books);
const repository = new BookRepository();
const service = new BookService(mongoRepository);

async function showMenu() {
  console.log("1. Criar livro");
  console.log("2. Atualizar livro");
  console.log("3. Listar livros por autor");
  console.log("4. Deletar livro por ID");
  console.log("5. Sair");

  const choice = await askQuestion("Escolha uma opção: ");

  switch (choice) {
    case '1':
      await createBook();
      break;
    case '2':
      await updateBook();
      break;
    case '3':
      await listBooksByAuthor();
      break;
    case '4':
      await deleteBookById();
      break;
    case '5':
      console.log("Obrigado por usar nosso Sistema!");
      client.close();
      process.exit(0);
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
      break;
  }

  await showMenu();
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createBook() {
  const title = await askQuestion("Digite o título do livro: ");
  const description = await askQuestion("Digite a descrição do livro: ");
  const releasedAt = await askQuestion("Digite o ano de lançamento: ");
  const author = await askQuestion("Digite o nome do autor: ");
  const category = await askQuestion("Digite a categoria do livro: ");

  await service.create(title, description, releasedAt, author, category);
  console.log("Livro criado com sucesso!");
}

async function updateBook() {
  const id = await askQuestion("Digite o ID do livro a ser atualizado: ");
  const title = await askQuestion("Digite o novo título do livro: ");
  const description = await askQuestion("Digite a nova descrição do livro: ");
  const releasedAt = await askQuestion("Digite o novo ano de lançamento: ");
  const author = await askQuestion("Digite o novo nome do autor: ");
  const category = await askQuestion("Digite a nova categoria do livro: ");

  await service.update(id, { title, description, releasedAt, author, category });
  console.log("Livro atualizado com sucesso!");
}

async function listBooksByAuthor() {
  const author = await askQuestion("Digite o nome do autor: ");
  const booksByAuthor = await service.findAllByAuthor(author);
  console.log(booksByAuthor);
}

async function deleteBookById() {
  const id = await askQuestion("Digite o ID do livro a ser deletado: ");
  await service.deleteById(id);
  console.log("Livro deletado com sucesso!");
}

;(async () => {
  await showMenu();
  rl.close();
})();
