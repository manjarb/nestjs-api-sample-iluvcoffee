import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // @Get()
  // findAll(@Res() response) {
  //   response.status(200).send('All coffees')
  // }

  @Get()
  findAll(@Query() query) {
    const { limit, offset } = query
    return `This action return all coffees, Limit: ${limit}, offset: ${offset}`
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This Action return ${id} coffee`
  }

  @Post()
  // Status code sample
  // @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `this action update #${id} coffee`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action remove #${id} coffee`
  }
}
