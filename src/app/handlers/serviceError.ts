export class ServiceError extends Error {
  constructor(public statusCode: number, m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}