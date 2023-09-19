/// <reference types="lucia" />
declare namespace Lucia {
  // (lucia docs)
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type Auth = import('./lucia.js').Auth;
  // type DatabaseUserAttributes = {
  //   username: string;
  // };
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type DatabaseUserAttributes = Omit<import('core-db').User, 'id'>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  type DatabaseSessionAttributes = {};
}
