export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;          // Optional profile picture URL
    boards?: string[];        // Array of board IDs the user belongs to
    createdAt?: Date;         // From backend
    updatedAt?: Date;         // From backend
    token?: string;          // JWT token for authenticated users
  }
  