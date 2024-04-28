import postgres from 'postgres';

async function main() {
  const sql = postgres(process.env.POSTGRES_CONNECTION_STRING);
  const res = await sql`select * from public.countries limit 10`;
  console.log(res);
  await sql.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
