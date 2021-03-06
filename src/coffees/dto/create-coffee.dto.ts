import { ApiProperty } from '@nestjs/swagger';
// For using 'class-validator
// Need to app.useGlobalPipes(new ValidationPipe()) on main.ts first
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'Name of a coffee' })
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  // each: true for expect each string value
  @IsString({ each: true })
  readonly flavors: string[];
}
