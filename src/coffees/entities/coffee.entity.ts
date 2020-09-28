import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
  // Mongoose add by default
  // id: number;

  // Mongoose Property
  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
