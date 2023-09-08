export const dbOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'events-test',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
};

module.exports = {
  ...dbOptions,
  seeds: ['db/seeds/**/*{.ts,.js}'],
  factories: ['db/factories/**/*{.ts,.js}'],
};
