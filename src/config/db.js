import pg from 'pg';

const { Poll } = pg;

const dbConfig = {
  connectionString: process.env.DATABASE_URL
};

if(process.env.MODE === "PROD"){
  dbConfig.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(dbConfig);

export default db; 