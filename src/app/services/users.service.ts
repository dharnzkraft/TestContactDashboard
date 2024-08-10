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

  public blockUser(){
    return this.http.get(this.baseUrl+`/user/block/:userID`)
  }

  public unblockUser(){
    return this.http.get(this.baseUrl+`/user/unblock/:userID`)
  }

  public createInspection(payload: any){
    return this.http.post(this.baseUrl+`/inspection/create`, payload)
  }

  public getAllInspections(){
    return this.http.get(this.baseUrl+`/inspection/all`)
  }

  public getOneInspection(id: any){
    return this.http.get(this.baseUrl+`/inspection/${id}`)
  }
  
}
