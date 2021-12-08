const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const users = require('./userData.json');
const posts = require('./postData.json');
const comments = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });
  console.error();
  console.log('\n----- USERS SEEDED -----\n');

  await Post.bulkCreate(posts, {
    individualHooks: true,
    returning: true,
  });
  console.error();
  console.log('\n----- POSTS SEEDED -----\n');

  await Comment.bulkCreate(comments, {
    individualHooks: true,
    returning: true,
  });
  console.error();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
