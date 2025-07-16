export interface LoggedInUser {
  id: number;
  email: string;
}

export interface LoginResponse {
  loggedInUser: LoggedInUser;
  access_token: string;
}

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: {
      id: number;
      email: string;
    };
  }

  interface User extends LoginResponse {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    accessToken: string;
  }
}
