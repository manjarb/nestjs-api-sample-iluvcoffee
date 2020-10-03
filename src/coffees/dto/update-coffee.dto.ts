import { CreateCoffeeDto } from './create-coffee.dto';
import { PartialType } from '@nestjs/swagger';

// PartialType mark all fields optional
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
