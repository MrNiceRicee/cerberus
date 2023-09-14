// app.d.ts

/// <reference types="lucia" />
declare namespace Lucia {
  // (lucia docs)
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports 
  type Auth = import("./lucia.js").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  type DatabaseSessionAttributes = {};
}
