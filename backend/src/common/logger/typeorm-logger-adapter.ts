import { Injectable } from '@nestjs/common';
import { Logger as TypeormLogger } from 'typeorm';
import { AppLogger } from './app-logger';

const safeJsonStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj);
  } catch {
    return `${
      Array.isArray(obj) ? 'array' : typeof obj
    } with cyclic dependencies`;
  }
};

const formatQuery = (query: string, parameters?: any[]): string => {
  let message = `query: ${query}`;
  if (
    (parameters ?? null) !== null &&
    (!Array.isArray(parameters) || parameters.length)
  ) {
    message = `${message} -- PARAMETERS: ${safeJsonStringify(parameters)}`;
  }
  return message;
};

const indent = (message: string): string => {
  return ` - ${message}`;
};

@Injectable()
export class TypeormLoggerAdapter implements TypeormLogger {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext('TypeormLoggerAdapter');
  }

  logQuery(query: string, parameters?: any[]) {
    this.logger.log(formatQuery(query, parameters));
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.logger.error(error);
    this.logger.error(indent(formatQuery(query, parameters)));
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(`Query execution time: ${time}ms`);
    this.logger.warn(indent(formatQuery(query, parameters)));
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'warn') {
      this.logger.warn(message);
    } else {
      this.logger.warn(message);
    }
  }
}
