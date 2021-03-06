import { ConfigModule } from '@nestjs/config';
import { EventSchema } from './../events/entities/event.entity';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Event } from '../events/entities/event.entity';
import { NotFoundException } from '@nestjs/common';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    //
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nest-course', {
          useNewUrlParser: true,
          useFindAndModify: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }),
        /* Add Schema to MongooseModule in CoffeesModule */
        MongooseModule.forFeature([
          {
            name: Coffee.name,
            schema: CoffeeSchema,
          },
          {
            name: Event.name,
            schema: EventSchema,
          },
        ]),
      ],
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '5f7800900f5d0c6e6cef073c';
        const coffee = await service.findOne(coffeeId);
        expect(coffee.id).toEqual(coffeeId);
      });
    });

    describe('otherwise (error case)', () => {
      it('should throw the "NotFoundException"', async done => {
        const coffeeId = '5f7800900f5d0c6e6cef073a';

        try {
          await service.findOne(coffeeId);

          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
          done();
        }
      });
    });
  });
});
