import { StatusMap } from "elysia/utils";
import type { HTTPStatusName } from "elysia/utils";

// const statusCodes = {
//   BAD_REQUEST: {
//     status: 400,
//     message: 'Bad Request',
//   },
//   UNAUTHORIZED: {
//     status: 401,
//     message: 'Unauthorized',
//   },
//   FORBIDDEN: {
//     status: 403,
//     message: 'Forbidden',
//   },
//   NOT_FOUND: {
//     status: 404,
//     message: 'Not Found',
//   },
//   METHOD_NOT_ALLOWED: {
//     status: 405,
//     message: 'Method Not Allowed',
//   },
//   INTERNAL_SERVER_ERROR: {
//     status: 500,
//     message: 'Internal Server Error',
//   },
//   NOT_IMPLEMENTED: {
//     status: 501,
//     message: 'Not Implemented',
//   },
// } as const;


export class ErrorException extends Error {
  /**
   * The HTTP status code.
   */
  public status: number;
  /**
   * The HTTP status message.
   */
  public override message: string;
  /**
   * The HTTP status name.
   */
  public type: string;
  /**
   * Help message, help url, etc. \
   * Just send any helpful information to the client.
   */
  public help?: string;
  constructor(
    type: HTTPStatusName,
    message?: string,
    options?: {
      help?: string;
    },
  ) {
    // super(message ?? statusCodes[type].message);
    super(message ?? type);
    this.status = StatusMap[type];
    this.message = message ?? type;
    this.type = type;
    if (options?.help) {
      // this.message += ` See ${options.help} for more information.`;
      this.help = options.help;
    }
  }
}
