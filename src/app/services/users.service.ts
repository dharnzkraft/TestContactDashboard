import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public getUsers(){
    return this.http.get(this.baseUrl+`/user/all`)
  }

  public getUserFullDetails(userId: any){
    return this.http.get(this.baseUrl+`/user/full-details/${userId}`)
  }
  
}
