import { Module } from '@nestjs/common';
import { RotasService } from './rotas.service';
import { RotasController } from './rotas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rota, RotaSchema } from './entities/rota.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rota.name, schema: RotaSchema }
    ])
  ],
  controllers: [RotasController],
  providers: [RotasService]
})
export class RotasModule {}
