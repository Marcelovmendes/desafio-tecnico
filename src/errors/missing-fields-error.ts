import { ApplicationError } from '../protocols';

export function missingFiledsError(message: string): ApplicationError {
  return {
    name: 'MissingFieldsError',
    message,
  };
}
