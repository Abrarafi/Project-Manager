import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Board, BoardMember } from '../../shared/models/board.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BoardMemberService extends ApiService {
  private membersSubject = new BehaviorSubject<BoardMember[]>([]);
  private membersLoaded = false;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  private generateAvatar(name: string): string {
    if (!name) return '';
    
    // Split name into parts and get first letters
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length === 0) return '';
    
    // Get first letter of first name
    let avatar = nameParts[0].charAt(0).toUpperCase();
    
    // Get first letter of last name if exists
    if (nameParts.length > 1) {
      avatar += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }
    
    return avatar;
  }

  private processMembers(members: BoardMember[] | any): BoardMember[] {
    if (!members) return [];
    
    // Handle case where members is a single object (like in board 2)
    const membersArray = Array.isArray(members) ? members : [members];
    
    return membersArray.map(member => ({
      ...member,
      avatar: member.avatar || this.generateAvatar(member.name)
    }));
  }

  getBoard(boardId: string): Observable<Board> {
    return this.get<Board>(`/boards/${boardId}`);
  }

  getMembers(boardId: string): Observable<BoardMember[]> {
    if (!this.membersLoaded) {
      return this.getBoard(boardId).pipe(
        map(board => {
          const processedMembers = this.processMembers(board.members);
          this.membersSubject.next(processedMembers);
          this.membersLoaded = true;
          return processedMembers;
        })
      );
    }
    return this.membersSubject.asObservable();
  }

  addMember(boardId: string, member: BoardMember): Observable<BoardMember> {
    return this.getBoard(boardId).pipe(
      map(board => {
        const processedMember = {
          ...member,
          avatar: member.avatar || this.generateAvatar(member.name)
        };
        const members = this.processMembers(board.members);
        const updatedMembers = [...members, processedMember];
        // In a real API, you would PATCH/PUT the board with updated members
        this.membersSubject.next(updatedMembers);
        return processedMember;
      })
    );
  }

  removeMember(boardId: string, memberId: string): Observable<void> {
    return this.getBoard(boardId).pipe(
      map(board => {
        const members = this.processMembers(board.members);
        const updatedMembers = members.filter(m => m.id !== memberId);
        // In a real API, you would PATCH/PUT the board with updated members
        this.membersSubject.next(updatedMembers);
      })
    );
  }
}