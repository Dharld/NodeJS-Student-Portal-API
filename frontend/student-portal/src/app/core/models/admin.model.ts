import { User } from './user.model';

export interface Admin extends User {
  ADMIN_ID: string;
}
