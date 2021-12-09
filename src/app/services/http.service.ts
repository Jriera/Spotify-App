import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { TokenResponse } from '../responses.interfaces';
import { CookieService } from 'ngx-cookie-service';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, 
    private cookieService:CookieService,
    private spotifyService:SpotifyService) {}

accessToken= this.spotifyService.token;

  getBasicToken() {
    let clientId = environment.clientId; // Your client id
    let clientSecret = environment.clientSecret; // Your secret
    const redirect_uri = 'http://localhost:4200/welcome'; // Your redirect uri
    let apiURL = 'https://accounts.spotify.com/api/token';

    const encodedClient = btoa(`${clientId}:${clientSecret}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedClient}`,
    });

    let params = new HttpParams();
    params = params.append('grant_type', 'client_credentials');
    return this.http.post(apiURL, params, { headers });
  }

  getToken(code: string) {
    let clientId = environment.clientId; // Your client id
    let clientSecret = environment.clientSecret; // Your secret
    const redirect_uri = 'http://localhost:4200/welcome'; // Your redirect uri
    let apiURL = environment.tokenUrl;

    const encodedClient = btoa(`${clientId}:${clientSecret}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedClient}`,
    });

    let params = new HttpParams();
    params = params.append('grant_type', 'authorization_code');
    params = params.append('code', code);
    params = params.append('redirect_uri', redirect_uri);

    return this.http.post<TokenResponse>(apiURL, params, { headers });
  }

  getRefreshToken(refresh_token: string) {
    let clientId = environment.clientId; // Your client id
    let clientSecret = environment.clientSecret; // Your secret
    let apiURL = environment.tokenUrl;
    

    const encodedClient = btoa(`${clientId}:${clientSecret}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${encodedClient}`,
    });

    let params = new HttpParams();
    params = params.append('grant_type', 'refresh_token');
    params = params.append('refresh_token', refresh_token);
    params = params.append('access_token', this.accessToken);
    console.log(this.accessToken);
    return this.http.post<TokenResponse>(apiURL, params, { headers });
  }
}
