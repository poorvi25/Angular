import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders' ;
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
 
  getLeaders():Observable<Leader[]>{
    //return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
   }
  //filter dish on basis of id
  getLeader(id: string): Observable<Leader> {
    //return of(LEADERS.filter((leader) =>(leader.id=== id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leaders/' + id)
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }
 getFeaturedLeader(): Observable<Leader> {
    //return of(LEADERS.filter((leader)=> leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leaders?featured=true')
     .pipe(map(leaders => leaders[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));
 }
}
