interface BaseResponse {
  code: string;
  shortCode: string;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  errors?: string | object | object[];
  stacktraces?: string | object | object[];
}

export interface SuccessResponse extends BaseResponse {
  data?: object | object[];
}

export const SUCCESSFUL_RESPONSE: SuccessResponse = {
  code: 'OK',
  shortCode: 'SUCCESSFUL',
  message: 'Data retrieved successfully',
};

export const VALIDATION_ERROR_RESPONSE: ErrorResponse = {
  code: 'BR',
  shortCode: 'VALIDATION_ERROR',
  message: 'Bad Request',
};

export const UNAUTHORIZED_RESPONSE: ErrorResponse = {
  code: 'UA',
  shortCode: 'UNAUTHORIZED',
  message: 'Unauthorized access',
};

export const SERVER_ERROR_RESPONSE: ErrorResponse = {
  code: 'IE',
  shortCode: 'SERVER_ERROR',
  message: 'Internal Server Error',
};

export const ResponseEnums = {
  200: SUCCESSFUL_RESPONSE,
  422: VALIDATION_ERROR_RESPONSE,
  401: UNAUTHORIZED_RESPONSE,
  500: SERVER_ERROR_RESPONSE,
};
