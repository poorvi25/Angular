import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable,of } from 'rxjs';
//delay the emitting of items from observables 
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  //data is fetched from server side
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

   getDishes():Observable<Dish[]>{
    //will fetch data from server side on url http://localhost:3000/dishes
    //data supplied in form of observable when get method called
     return this.http.get<Dish[]>(baseURL + 'dishes')
     .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //filter dish on basis of id
  getDish(id: number): Observable<Dish> {
    //of will emit item with delay 2 sec to promise
    //return of(DISHES.filter((dish) =>(dish.id=== id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
     }
 
 getFeaturedDish(): Observable<Dish> {
     return this.http.get<Dish>(baseURL + 'dishes?featured=true')
     .pipe(map(dishes => dishes[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));
  }
 //will return id of all the Dishes,
 //it is observable of string type array
getDishIds(): Observable<string[] | any>{
   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
   .pipe(catchError(error => error));
 }

 //return a dish put in server side
 putDish(dish: Dish): Observable<Dish>{
   //to inform server what is been send to server
    const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' +dish.id, dish, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
 }
}
