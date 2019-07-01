import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];
  //when observable throw error it return error msg
  errMess: string;
  constructor(private dishService : DishService,
    //baseurl is provided as provider
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //dishes is not a dish array now it is js object so it will have then method
    //this.dishes = this.dishService.getDishes();


    //then returning dishes obj, then take as parameter 
    //we are using observable instead a promise so now we use subscribe instead then 
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

}
