export class AppException extends Error {
  constructor(public status: number, ...args: Parameters<ErrorConstructor>) {
    super(...args);
  }
}
