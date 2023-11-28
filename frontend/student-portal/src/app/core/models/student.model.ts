import { User } from './user.model';

export interface Student extends User {
  STU_ID: string;
  STU_LEVEL?: string;
  STU_GPA?: string;
}
