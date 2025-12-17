import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menus } from './menus.entity';
@Injectable()
export class MenusService {
    constructor(@InjectRepository(Menus) private menusRepo: Repository<Menus>) { }

    async create(createMenuDto: CreateMenuDto) {
        const res = await this.menusRepo.save(createMenuDto)
        return res
    }

    async findAll() {
        return await this.menusRepo.find()
    }

    async findOne(id: number) {
        return await this.menusRepo.findOne({ where: { id } })
    }

   async update(id: number, updateMenuDto: UpdateMenuDto) {
       const temp = await this.findOne(id)
       if (!temp) { 
            throw new NotFoundException(`Menus with ID ${id} not found`);
       }
        return this.menusRepo.save(Object.assign(temp,updateMenuDto))
    }

   async remove(id: number) {
        return await this.menusRepo.delete(id)
    }
}
