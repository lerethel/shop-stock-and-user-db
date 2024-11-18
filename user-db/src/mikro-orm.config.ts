import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: 'postgresdb',
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  debug: true,
  extensions: [SeedManager, Migrator],

  // Seeder settings
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
  },
});
