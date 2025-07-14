import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BoardMember } from '../../shared/interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class BoardMemberService {
  private membersSubject = new BehaviorSubject<BoardMember[]>([]);
  private membersLoaded = false; // to prevent duplicate loading

  constructor(private http: HttpClient) {
    this.loadMockData(); // optional for mock fallback
  }

  getMembers(): Observable<BoardMember[]> {
    if (!this.membersLoaded) {
      this.fetchMembersFromApi();
    }
    return this.membersSubject.asObservable();
  }

  private fetchMembersFromApi(): void {
    this.http.get<BoardMember[]>('/api/boards/members') // ✅ Replace with actual endpoint
      .pipe(
        tap(members => {
          this.membersLoaded = true;
          this.membersSubject.next(members);
        })
      )
      .subscribe({
        error: () => {
          console.warn('API call failed, falling back to mock data.');
          this.loadMockData();
        }
      });
  }

  private loadMockData(): void {
    const mockData: BoardMember[] = [
      { name: 'John Doe', role: 'Admin', avatar: 'JD' },
      { name: 'Jane Smith', role: 'Member', avatar: 'JS' },
      { name: 'Mike Johnson', role: 'Member', avatar: 'MJ' },
      { name: 'Mike Johnson', role: 'Member', avatar: 'MJ' },
      { name: 'Mike Johnson', role: 'Member', avatar: 'MJ' },
    ];
    this.membersSubject.next(mockData);
  }
}
