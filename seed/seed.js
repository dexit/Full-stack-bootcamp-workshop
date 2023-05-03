const sequelize = require('../config/connection');

// grab models, exported from the models/name.js file
//const { Reader, Book, LibraryCard , Book} = require('../models');

//const readerSeedData = require('./readerSeedData.json');
//const bookSeedData = require('./bookSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Reader.bulkCreate(readerSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of readers) {
    const newCard = await LibraryCard.create({
      reader_id: id,
    });
  }

  for (const book of bookSeedData) {
    const newBook = await Book.create({
      ...book,
      // Attach a random reader ID to each book
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
