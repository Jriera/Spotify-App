import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { SpotifyService } from '../services/spotify.service';
import { SpotifyUser } from '../spotify-user';
import { TokenResponse } from '../token-response';
import { finalize, map, pluck } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  code: string = '';
  TokenResponse: TokenResponse | null = null;
  logged: string | null= 'false';

  accessToken: string = '';
  user: SpotifyUser = {
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
      filter_enabled: false,
      filter_locked: false,
    },
    external_urls: {
      spotify: '',
    },
    followers: {
      href: '',
      total: 0,
    },
    href: '',
    id: '',
    images: [
      {
        height: 0,
        url: '',
        width: 0,
      },
    ],
    type: '',
    uri: '',
  };
  constructor(
    private aRoute: ActivatedRoute,
    private http: HttpService,
    private spotify: SpotifyService
  ) {}

  ngOnInit(): void {
    this.getCode();
    this.getToken();
  }

  getToken() {
    this.logged = localStorage.getItem('isLogged');
    if(this.logged === 'false' || this.logged === null) {
    this.http
      .getToken(this.code)
      .pipe(
        pluck('access_token'),
        map((data) => {
          localStorage.setItem('token', data);
          localStorage.setItem('isLogged', 'true');
          console.log(data);
          console.log('get token finalized');
          /* this.spotify.token= data; */
        }),
        finalize(() => {
          this.encrypt();
          this.getUser();
          this.getRecent();
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
    } else{
      this.getUser();
      this.getRecent();
    }
  }

  getCode() {
    this.aRoute.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
    return this.code;
  }

  getUser() {
    this.spotify.getProfile().subscribe((data) => {
      console.log(data);
      this.user = data;
      return data;
    });
  }

  getRecent() {
    this.spotify.getRecentTracks().subscribe((data) => console.log(data));
  }

  encrypt() {
    const text = localStorage.getItem('token');
    this.logged = localStorage.getItem('isLogged');
    if (text != null && this.logged=== 'false') {
      const encrypted = CryptoJS.AES.encrypt(text, 'secret key 123').toString();
      localStorage.removeItem('token');
      localStorage.setItem('token', encrypted);
      localStorage.setItem('isLogged', 'true');
    }
  }
}
