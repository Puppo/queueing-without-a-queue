import PgBoss from 'pg-boss';
  
const pgBossInstance = new PgBoss({
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
});

pgBossInstance.on('error', console.error)

await pgBossInstance.start()

export default pgBossInstance;