import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateRotaDto } from './dto/update-rota.dto';
import { Rota, RotaDocument } from './entities/rota.entity';

@Injectable()
export class RotasService {


  constructor(
    @InjectModel(Rota.name) private readonly rotasRepository: Model<RotaDocument>
  ) {}

  create(createRotaDto: CreateRotaDto) {
    return 'This action adds a new rota';
  }

  findAll(): Promise<RotaDocument[]> {
    return this.rotasRepository.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} rota`;
  }

  update(id: number, updateRotaDto: UpdateRotaDto) {
    return `This action updates a #${id} rota`;
  }

  remove(id: number) {
    return `This action removes a #${id} rota`;
  }

  
}
