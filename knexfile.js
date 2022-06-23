// Update with your config settings.

require('dotenv').config();
const { DB_HOST,DB_NAME, DB_PASSWORD,DB_PORT,DB_USERNAME}=process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DB_HOST
    },
    migrations:{
      tableName: "knex_migrations"
    }
   }//,

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
