// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://xrmymfda:4Gu39CxYA3sP_lLpSEUY-tvd2iQxLbx9@baasu.db.elephantsql.com:5432/xrmymfda',
    searchPath: "public",
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
