const sequelize = require('../config/connection');

// grab models, exported from the models/name.js file
const { Todo, User } = require('../models');

const todoDataSeed = require('./todoDataSeed.json');
const userDataSeed = require('./userDataSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userDataSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const todo of todoDataSeed) {
   await Todo.create({
    ...todo,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }



  process.exit(0);
};

seedDatabase();
