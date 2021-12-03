import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  code:string|null = '';
  constructor(private aRoute:ActivatedRoute,private http:HttpService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getCode();
    this.getToken();
    console.log(this.code);
  }
    

  getCode() {
    this.aRoute.queryParams.subscribe(params => {
      this.code = params['code'];});
      console.log(this.code);
    }

  getBasicToken() {
   this.http.getBasicToken().subscribe(data => {
      console.log(data);
   });
  }

  getToken(){
    if(this.code) {
      this.http.getToken(this.code).subscribe(data => {
        console.log(data);
      });
    }
    
  }

}
