import { Board } from "./board.model";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName:string;
    avatar?: string;          // Optional profile picture URL
    ownBoards?: Board[];        // Array of boards the user owns
    memberBoards?: Board[];     // Array of boards the user is a member of
    createdAt?: Date;         // From backend
    updatedAt?: Date;         // From backend
    token?: string;          // JWT token for authenticated users
  }
  