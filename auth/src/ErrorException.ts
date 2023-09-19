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
  NOT_IMPLEMENTED: {
    status: 501,
    message: 'Not Implemented',
  },
} as const;

type StatusCode = keyof typeof statusCodes;

export class ErrorException extends Error {
  public status: number;
  public override message: string;
  public type: string;
  public help?: string;
  constructor(
    type: StatusCode,
    message?: string,
    options?: {
      help?: string;
    },
  ) {
    super(message ?? statusCodes[type].message);
    this.status = statusCodes[type].status;
    this.message = message ?? statusCodes[type].message;
    this.type = type;
    if (options?.help) {
      // this.message += ` See ${options.help} for more information.`;
      this.help = options.help;
    }
  }
}
