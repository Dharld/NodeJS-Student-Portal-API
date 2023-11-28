export interface User {
  USER_ID: string;
  USER_LNAME: string;
  USER_FNAME: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_ROLE: string;
  USER_ACTIVATED?: boolean;
  USER_DOB: Date;
}
