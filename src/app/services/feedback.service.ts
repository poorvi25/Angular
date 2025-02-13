import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(feedback: Feedback): Observable<Feedback>{
    //to inform server what is been send to server
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
     };
     return this.http.post<Feedback>(baseURL + 'feedback' ,feedback, httpOptions)
     .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
