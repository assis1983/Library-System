const { ObjectId } = require("mongodb")

class MongoBookRepository {
  constructor(collection) {
    this.collection = collection
  }

  async create(book) {
    await this.collection.insertOne(book)
  }

  findAll() {
    return this.collection.find().toArray()
  }

  findAllByAuthor(author) {
    return this.collection.find({ author }).toArray()
  }

  findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) })
  }

  async update(id, data) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          author: data.author,
          description: data.description,
          category: data.category,
          releasedAt: data.releasedAt,
          title: data.title,
        }
      }
    )
  }

  async deleteById(id) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
  
}

module.exports = MongoBookRepository