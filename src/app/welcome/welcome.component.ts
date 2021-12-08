import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { SpotifyService } from '../services/spotify.service';
import { SpotifyUser } from '../spotify-user';
import {TokenResponse} from '../responses.interfaces';
import {finalize, map, pluck} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  code:string= '';
  TokenResponse:TokenResponse|null = null;
  accessToken:string='';
  user:SpotifyUser|null = null;
  savedTotal: number=0;
  playlistTotal:number=0;
  mostPlayedSong='';
  mostPlayedArtist='';
  constructor(private aRoute:ActivatedRoute,
              private http:HttpService,
              private spotify:SpotifyService,
              private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getCode();
    this.http.getToken(this.code).pipe(
      map(data=>{
        this.encode(data.access_token);
        
        const refreshToken = data.refresh_token;
        this.cookieService.set('refreshToken', refreshToken);
      }),
      finalize(()=>{
        console.log('get token finalized');
        this.getUser();
        this.getRecent();
        this.getSavedTotal();
        this.getPlaylistTotal();
        this.gettopTracks();
        this.gettopArtists();
        this.getfreshToken(this.cookieService.get('refreshToken'));
        
      })).subscribe(data=>{
        console.log(data);
      });
    }
    
   
    

  getCode() {
    this.aRoute.queryParams.subscribe(params => {
      this.code = params['code'];});
      return this.code;
    }

    getUser(){
      this.spotify.getProfile().subscribe(data => {
        console.log(data);
        this.user = data;
        return data;
      });
    }
  
    getRecent(){
      this.spotify.getRecentTracks().subscribe(data => console.log(data));
    }

    getfreshToken(cookie:string){
      this.http.getRefreshToken(cookie).subscribe(data=>{
        this.spotify.token= data.access_token;
        const refreshToken = data.refresh_token;
        this.cookieService.set('refreshToken', refreshToken);
        console.log(data);
        
      });
    }

    getSavedTotal(){
      this.spotify.getSavedTracks().subscribe(data=>{
        this.savedTotal = data.total;
      });
    }
    getPlaylistTotal(){
      this.spotify.getPlaylists().subscribe(data=>{
        this.playlistTotal = data.total;
      });
    }

    gettopTracks(){
      this.spotify.getTop('tracks','long_term').subscribe(data=>{
        this.mostPlayedSong = data.items[0].name;
      });
    }
    gettopArtists(){
      this.spotify.getTop('artists','long_term').subscribe(data=>{
        this.mostPlayedArtist = data.items[0].name;
      });
    }

    
        
      
    encode(value:string){
      const coded= CryptoJS.AES.encrypt(value, 'secret key 123').toString();
      this.cookieService.set('token', coded);
    }
  
    



  

   
}
