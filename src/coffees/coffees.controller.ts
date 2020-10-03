import { Public } from './../common/decorators/public.decorator';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// Add validation for all /coffees route
// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  // @Get()
  // findAll(@Res() response) {
  //   response.status(200).send('All coffees')
  // }

  // Add validation for only /
  // @UsePipes(ValidationPipe)
  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    /* Add manual timeout to force timeout interceptor to work */
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCoffeeDto) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    // Validation for only body of this route
    @Body(ValidationPipe) body: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
