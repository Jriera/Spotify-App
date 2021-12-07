import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { SpotifyUser } from '../spotify-user';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = environment.baseUrl;
  token:string = '';
  constructor(private httpSpotify:HttpClient,
              private cookieService:CookieService) { }

  getProfile(){
    this.decodeToken();
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`
    });
    return this.httpSpotify.get<SpotifyUser>(`${this.baseUrl}/me`,{headers})
  }

  getRecentTracks(){
    this.decodeToken();
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`,
       
    });
    return this.httpSpotify.get(`https://api.spotify.com/v1/me/player/recently-played`,{headers})
  }

  decodeToken(){

   const encoded =  this.cookieService.get('token');
    const decoded = CryptoJS.AES.decrypt(encoded, 'secret key 123').toString(CryptoJS.enc.Utf8);
    this.token = decoded;
  }


}



