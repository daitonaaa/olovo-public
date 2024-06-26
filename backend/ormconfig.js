// require('dotenv').config({ path: '/var/run/secrets/vault/conf/.env' })
require('dotenv')

module.exports = {
  type: process.env['DB_TYPE'],
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_BASE'],
  synchronize: true,
  entities: ['./dist/entities/**', './dist/sections-config/crud/**'],
  migrations: ['./dist/migration/**'],
  cli: {
    entitiesDir: './src/entities/',
    migrationsDir: './src/migration/',
  },
};
