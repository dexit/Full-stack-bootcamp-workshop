const User = require('./User');
const Todo = require('./Todo');

// From -> User -> ToDo
User.hasMany(Todo, {
  foreignKey: 'user_id',
 // onDelete: 'CASCADE',
});

//But we need to add a relationship between Todo and User
Todo.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Todo };
