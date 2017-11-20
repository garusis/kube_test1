const pg = require('knex')({
    client: 'pg',
    connection: 'postgres://xrmymfda:4Gu39CxYA3sP_lLpSEUY-tvd2iQxLbx9@baasu.db.elephantsql.com:5432/xrmymfda',
    searchPath: 'public'
});


module.exports = pg;