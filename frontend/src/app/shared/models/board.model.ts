import { Column } from "./column.model";

export type BoardRole = 'admin' | 'member';

export interface BoardMember {
  id:string;
  name: string;
  email:string;
  role: BoardRole;
  avatar: string;
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

  