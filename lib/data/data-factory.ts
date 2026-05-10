import { DataSource } from './types';
import { JsonDataSource } from './json-provider';
import { DbDataSource } from './db-provider';

let instance: DataSource | null = null;

export function getDataSource(): DataSource {
  if (instance) return instance;

  const source = process.env.DATA_SOURCE || 'json';
  if (source === 'db') {
    instance = new DbDataSource();
  } else {
    instance = new JsonDataSource();
  }
  return instance;
}
