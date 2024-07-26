import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TokenDto } from '../_models/TokenDto';
const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

 @Injectable({
    providedIn: 'root'
})

export class OAuth2RedirectService {
    oauthURL = 'http://localhost:8082/oauth2/';
    googleurl='http://localhost:8082/google';

    constructor(private http: HttpClient) { }
    public google(tokenDto: TokenDto): Observable<TokenDto> {
        return this.http.post<TokenDto>(this.googleurl , tokenDto, headers);
    }

    public facebook(tokenDto: any): Observable<TokenDto> {
        return this.http.post<any>(this.oauthURL + 'facebook', tokenDto, headers);
    }
    handleOAuth2SuccessRedirect() {
        this.http.get<any>(this.oauthURL + 'success').pipe(
            catchError(error => throwError(error))
        ).subscribe(response => {
            window.location.href = response.redirectUrl;
        });
    }

    handleOAuth2FailureRedirect() {
        this.http.get<any>(this.oauthURL + 'failure').pipe(
            catchError(error => throwError(error))
        ).subscribe(response => {
            window.location.href = response.redirectUrl;
        });
    }
}
