import { Card } from "./card.model";


export interface Column {
  id: string;    // Frontend ID
  name: string;
  description?: string;
  wip?: number; // Work in progress limit
  color?: string;
  boardId: string;
  cards: Card[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}