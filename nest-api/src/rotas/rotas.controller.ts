import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RotasService } from './rotas.service';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateRotaDto } from './dto/update-rota.dto';

@Controller('rotas')
export class RotasController {

  constructor(private readonly rotasService: RotasService) {}

  @Post()
  create(@Body() createRotaDto: CreateRotaDto) {
    return this.rotasService.create(createRotaDto);
  }

  @Get()
  findAll() {
    return this.rotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rotasService.findOne(+id);
  }

  @Patch(':id') // Path: Atualização Parcial da entidade. O PUT seria para passagem inteira da Entidade
  update(@Param('id') id: string, @Body() updateRotaDto: UpdateRotaDto) {
    return this.rotasService.update(+id, updateRotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rotasService.remove(+id);
  }


  @Get(':id/start')
  startRota(@Param('id') id: string) {
    console.log(id)
    return `Iniciar corrida ${id}`
  }

}
