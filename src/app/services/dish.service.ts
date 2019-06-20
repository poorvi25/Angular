import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes' ;

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor() { }

  //instead returing dish array will return js object with resolve/reject 
  getDishes():Promise<Dish[]>{
    return new Promise(resolve => {
   //Stimulates server latency with 2 sec delay
   //Settimeout stimulates short delay
   setTimeout(() => resolve(DISHES), 2000);
    });
  }
  //filter dish on basis of id
  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      //Stimulates server latency with 2 sec delay
      //Settimeout stimulates short delay
      setTimeout(() => resolve(DISHES.filter((dish) =>(dish.id=== id))[0]), 2000);
       });
     }
 
 getFeaturedDish(): Promise<Dish> {
   return new Promise(resolve => {
    //Stimulates server latency with 2 sec delay
    //Settimeout stimulates short delay
    setTimeout(() => resolve(DISHES.filter((dish)=> dish.featured)[0]), 2000);
     });
  

 }
}
