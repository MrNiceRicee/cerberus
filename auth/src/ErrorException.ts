const statusCodes = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: 'Method Not Allowed',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
  },
} as const;

type StatusCode = keyof typeof statusCodes;

export class ErrorException extends Error {
  public status: number;
  public message: string;
  public code: string;
  constructor(code: StatusCode, message?: string) {
    super(message ?? statusCodes[code].message);
    this.status = statusCodes[code].status;
    this.message = message ?? statusCodes[code].message;
    this.code = code;
  }
}
