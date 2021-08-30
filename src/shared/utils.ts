import { Logger } from '@nestjs/common';
import { getConnectionOptions, getConnection } from 'typeorm';

export const getDBConnectionOptions = async (connectionName = 'default') => {
  const options = await getConnectionOptions(process.env.NODE_ENV || 'development');
  Logger.log(`Created DB Options ! ${JSON.stringify(options, null, 2)}`, 'Utils | getDBConnectionOptions');
  return {
    ...options,
    name: connectionName
  }
}

export const getDBConnection = async (connectionName = 'default') => {
  return await getConnection(connectionName);
}

export const runDBMigrations = async (connectionName = 'default') => {
  const conn = await getDBConnection(connectionName);
  await conn.runMigrations();
}

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>(
    resolve => {
      resolve(data);
    }
  )
};