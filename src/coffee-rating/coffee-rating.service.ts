import { CoffeesService } from './../coffees/coffees.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
  constructor(private coffeeService: CoffeesService) {}
}
