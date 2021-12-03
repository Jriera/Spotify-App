import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mySpotify';
  

  constructor(private aRoute:ActivatedRoute,private http:HttpService) {}

  ngOnInit() {
    
  }

  
    

}
