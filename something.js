const oracle = require('oracledb');

const param = process.argv.slice(2);

async function run() {

  let connection;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.query("SELECT * from foobar WHERE foo_id = " + param);

    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // Connections should always be released when not needed
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
