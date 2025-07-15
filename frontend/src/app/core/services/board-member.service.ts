import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BoardMember } from '../../shared/models/board.model';


@Injectable({
  providedIn: 'root',
})
export class BoardMemberService {
  private membersSubject = new BehaviorSubject<BoardMember[]>([]);
  private membersLoaded = false; // to prevent duplicate loading

  constructor(private http: HttpClient) {
    this.loadMockData(); // optional for mock fallback
  }

   getMembers(boardId: string): Observable<BoardMember[]> {
    return this.http.get<BoardMember[]>(`/api/boards/${boardId}/members`);
  }

  // getMembers(): Observable<BoardMember[]> {
  //   if (!this.membersLoaded) {
  //     this.fetchMembersFromApi();
  //   }
  //   return this.membersSubject.asObservable();
  // }

  // private fetchMembersFromApi(): void {
  //   this.http
  //     .get<BoardMember[]>('/api/boards/members') // ✅ Replace with actual endpoint
  //     .pipe(
  //       tap((members) => {
  //         this.membersLoaded = true;
  //         this.membersSubject.next(members);
  //       })
  //     )
  //     .subscribe({
  //       error: () => {
  //         console.warn('API call failed, falling back to mock data.');
  //         this.loadMockData();
  //       },
  //     });
  // }

  private loadMockData(): void {
    const mockData: BoardMember[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'JD' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Member', avatar: 'JS' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'MJ' },
      { id: '4', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'MJ' },
      { id: '5', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'MJ' },
    ];
    this.membersSubject.next(mockData);
  }
}
