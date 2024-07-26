import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../_models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl : string='http://localhost:8082/Room';

  getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${this.baseUrl}/getAllRooms`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(`${this.baseUrl}/addRoom`, room);
  }

  deleteRoomById(roomId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteRoomById/${roomId}`);
  }

}
