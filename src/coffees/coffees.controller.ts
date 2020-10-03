import { Protocol } from './../common/decorators/protocol.decorator';
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
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

// Add validation for all /coffees route
// @UsePipes(ValidationPipe)
/**
 * Swagger Tags decorator.
 * 💡 Note: Can also be done on an individual method-level if needed as well!
 */
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  // @Get()
  // findAll(@Res() response) {
  //   response.status(200).send('All coffees')
  // }

  // Add validation for only /
  // @UsePipes(ValidationPipe)
  // Sample others Response for swagger (same error case)
  // Long version
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  /* short-hand versions are available as well */
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    /* Add manual timeout to force timeout interceptor to work */
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // Add pipe for modify data before the method
      // ParseIntPipe
    )
    id: string,
  ) {
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
