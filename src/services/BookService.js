const Book = require("../domain/Book")

class BookService {
  constructor(repository) {
    this.repository = repository
  }

  async create(title, description, releasedAt, author, category) {
    const book = new Book(title, description, releasedAt, author, category)
    await this.repository.create(book)
  }

  findAll() {
    return this.repository.findAll()
  }

  findAllByAuthor(author) {
    return this.repository.findAllByAuthor(author)
  }

  async update(id, data) {
    const book = await this.repository.findById(id)
    if (!book) {
      return "Book not found"
    }

    await this.repository.update(id, data)
  }

  async deleteById(id) {
    const book = await this.repository.findById(id);
    if (!book) {
      return "Book not found";
    }

    await this.repository.deleteById(id);
  }
  
}

module.exports = BookService