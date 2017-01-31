import { ErrorHandler } from "@angular/core";

import { ServiceError } from './serviceError';

export class ServiceErrorHandler implements ErrorHandler {
  handleError(error) {
    if (error instanceof ServiceError) {
      let errorText: string = `Service error during request: ${(<ServiceError>error).statusCode} - ${error.message}`;

      console.log(errorText);

      alert(errorText);
    } else {
      throw error;
    }
  }
}