require('dotenv').config();


module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'chef_database',
    username: 'postgres',
    password: 'postgres',
    host: 'chef-database.ce44y9m9agto.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
  },

  test: {
    database: 'chef_database',
    username: 'postgres',
    password: 'postgres',
    host: 'chef-database.ce44y9m9agto.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};