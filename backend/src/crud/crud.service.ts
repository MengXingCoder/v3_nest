import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/crud.entity';
@Injectable()
export class CrudService {
    constructor(@InjectRepository(Test) private crudRepository: Repository<Test>) { }


    async findAll() {
        const res = await this.crudRepository.find()
        console.log('crud',res)
        return res
    }
    create(createCrudDto: CreateCrudDto) {
        return 'This action adds a new crud';
    }
    findOne(id: number) {
        return `This action returns a #${id} crud`;
    }

    update(id: number, updateCrudDto: UpdateCrudDto) {
        return `This action updates a #${id} crud`;
    }

    remove(id: number) {
        return `This action removes a #${id} crud`;
    }
}
