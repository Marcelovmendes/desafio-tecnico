import { ApplicationError } from '../protocols';

export function invalidAmountError(message: string): ApplicationError {
  return {
    name: 'InvalidAmountError',
    message,
  };
}
