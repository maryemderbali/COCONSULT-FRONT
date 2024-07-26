import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'SocialAuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public googleTokenSubject: BehaviorSubject<String | null>;
  public googleTokenObservable: Observable<String | null>;


  constructor() {

    this.googleTokenSubject = new BehaviorSubject( sessionStorage.getItem(TOKEN_KEY)!);
    this.googleTokenObservable = this.googleTokenSubject.asObservable();
   }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getgoogleToken() : boolean{
    return   this.googleTokenSubject.value!= null;
  }
  
  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  logOut(): void {
    sessionStorage.clear();
  }
}