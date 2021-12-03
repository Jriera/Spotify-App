import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getBasicToken() {
  
    let clientId = environment.clientId; // Your client id
    let clientSecret = environment.clientSecret; // Your secret
    const redirect_uri = 'http://localhost:4200/callback'; // Your redirect uri
    let apiURL = "https://accounts.spotify.com/api/token";
  
    const encodedClient = btoa(`${clientId}:${clientSecret}`);

const headers = new HttpHeaders({
  'Content-Type':'application/x-www-form-urlencoded',
   'Authorization': `Basic ${encodedClient}`
});
  
    let params = new HttpParams();
    params = params.append('grant_type', 'client_credentials');
    /* params = params.append('code', 'AQCcKUYqn2fqK240h1xhMk7o8L1rPts7khDRSlmaAWTvjS2hR0U_SNkFwBkd0DWd0iBwwnW2PpMekRrYHmjA9Annt5to5tWbqxHE4AjRewS2hiFC0wF6PriIyGzJdNspyrDbeEigeapPBhQO-WOm-9c7FEj9c-KU7cSt7W8Za8GqpuNfeF-CRnv41oFbVip7M9d0fVukhTU0CdMpkaNWwQfI6ZzFMA');
    params = params.append('redirect_uri', redirect_uri); */
  
    return this.http.post(apiURL,params, { headers })
    
  }

  getToken(code:string) {
    let clientId = environment.clientId; // Your client id
    let clientSecret = environment.clientSecret; // Your secret
    const redirect_uri = 'http://localhost:4200/callback'; // Your redirect uri
    let apiURL = environment.tokenUrl;
  
    const encodedClient = btoa(`${clientId}:${clientSecret}`);

const headers = new HttpHeaders({
  'Content-Type':'application/x-www-form-urlencoded',
   'Authorization': `Basic ${encodedClient}`
});
  
    let params = new HttpParams();
    params = params.append('grant_type', 'authorization_code');
    params = params.append('code', code);
    params = params.append('redirect_uri', redirect_uri);
  
    return this.http.post(apiURL,params, { headers })
    
  }

}
