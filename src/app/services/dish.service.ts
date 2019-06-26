import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes' ;
import { Observable,of } from 'rxjs';
//delay the emitting of items from observables 
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor() { }

  //instead returing dish array will return js object with resolve/reject 
  getDishes():Observable<Dish[]>{
  //getDishes():Promise<Dish[]>{
    return of(DISHES).pipe(delay(2000));
    //return of(DISHES).pipe(delay(2000)).toPromise();
    //new Promise(resolve => {
   //Stimulates server latency with 2 sec delay
   //Settimeout stimulates short delay
   //setTimeout(() => resolve(DISHES), 2000);
    //});
  }
  //filter dish on basis of id
  getDish(id: string): Observable<Dish> {
    //of will emit item with delay 2 sec to promise
    return of(DISHES.filter((dish) =>(dish.id=== id))[0]).pipe(delay(2000));
       // new Promise(resolve => {
      //Stimulates server latency with 2 sec delay
      //Settimeout stimulates short delay
      //setTimeout(() => resolve(DISHES.filter((dish) =>(dish.id=== id))[0]), 2000);
      // });
     }
 
 getFeaturedDish(): Observable<Dish> {
   return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));
   // new Promise(resolve => {
    //Stimulates server latency with 2 sec delay
    //Settimeout stimulates short delay
    //setTimeout(() => resolve(DISHES.filter((dish)=> dish.featured)[0]), 2000);
    // });
  

 }
 //will return id of all the Dishes,
 //it is observable of string type array
getDishIds(): Observable<string[] | any>{
   return of(DISHES.map(dish => dish.id));
 }
}
