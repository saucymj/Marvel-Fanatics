const seedHero = require('./heroData');
const seedUsers = require('./userData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedHero();
    console.log('\n----- HEROS SEEDED -----\n');
  
  await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();