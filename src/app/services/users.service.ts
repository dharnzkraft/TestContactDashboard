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

  public blockUser(id: any){
    return this.http.get(this.baseUrl+`/user/block/${id}`)
  }

  public unblockUser(id: any){
    return this.http.get(this.baseUrl+`/user/unblock/${id}`)
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

  public getWithdrawalRequests(){
    return this.http.get(this.baseUrl+`/user/withdrawals`)
  }

  public approveWithdrawal(id: any){
    return this.http.get(this.baseUrl+`/user/withdrawal/approve/${id}`)
  }

  public disapproveWithdrawal(id: any){
    return this.http.get(this.baseUrl+`/user/withdrawal/disapprove/${id}`)
  }

  public getLoggedInUser(){
    return this.http.get(this.baseUrl+`/user/profile`)
  }

  public getAnalytics(){
    return this.http.get(this.baseUrl+`/admin/analytics`)
  }

  public searchQuery(fromDate: string, toDate: string, term: string, limit?: number, page?: number){
    return this.http.get(this.baseUrl+`/admin/users?from_date=${fromDate}&to_date=${toDate}&search_term=${term}&limit=${limit}&page=${page}`)
  }
  
}
