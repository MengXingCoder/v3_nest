import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../entities/test.entity';
@Module({
    imports:[ TypeOrmModule.forFeature([Test])],
    controllers: [CrudController],
    
  providers: [CrudService],
})
export class CrudModule {}
