import postgres from 'postgres';

async function dropTable(sql) {
  try {
    const dropTable = await sql``;

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error dropping table:', error);
    throw error;
  }
}

async function seedUsers(sql) {
  try {
    const createTable = await sql``;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const sql = postgres(process.env.POSTGRES_CONNECTION_STRING);

  await dropTable(sql);
  await seedUsers(sql);

  await sql.end();
}

main().catch((error) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    error,
  );
});
