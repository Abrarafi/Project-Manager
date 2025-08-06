import { Column } from "./column.model";
import { User } from "./user.model";

export type BoardRole = 'admin' | 'member';

export interface BoardMember {
   id: string;
  role: 'admin' | 'member';
  user: User;
}


export interface Board {
    id: string;  // Optional alias for _id
    name: string;
    description: string;
    lastModified: Date;
    columns?: Column[];
    members: BoardMember[];
    thumbnailColor: string;
    createdAt: Date;
    updatedAt: Date;
  }

  