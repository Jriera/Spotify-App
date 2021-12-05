import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { SpotifyUser } from '../spotify-user';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = environment.baseUrl;
  token:string = '';
  constructor(private httpSpotify:HttpClient) { }

  getProfile(){
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`
    });
    return this.httpSpotify.get<SpotifyUser>(`${this.baseUrl}/me`,{headers})
  }

  getRecentTracks(){
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`,
       
    });
    console.log(this.token);
    return this.httpSpotify.get(`https://api.spotify.com/v1/me/player/recently-played`,{headers})
  }


}



