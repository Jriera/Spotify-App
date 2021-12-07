import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { SpotifyUser } from '../spotify-user';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = environment.baseUrl;
  token:string = '';
  constructor(private httpSpotify:HttpClient) { }

  getProfile(){
    this.token=this.decrypt();
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`
    });
    return this.httpSpotify.get<SpotifyUser>(`${this.baseUrl}/me`,{headers})
  }

  getRecentTracks(){
    this.token=this.decrypt();
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
       'Authorization': `Bearer ${this.token}`,
       
    });
    console.log(this.token);
    return this.httpSpotify.get(`https://api.spotify.com/v1/me/player/recently-played`,{headers})
  }

  decrypt(){
    const text = localStorage.getItem('token');
    if(text!=null){
      return CryptoJS.AES.decrypt(text.trim(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    } else{
      return '';
    }
  }

    
    
    


}



