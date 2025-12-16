import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private rolesRepo: Repository<Roles>) { }
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepo.create(createRoleDto)
    return this.rolesRepo.save(role)
  }

  async findAll() {
    const res = await this.rolesRepo.find()
    return res
  }

  async findOne(id: number) {
    return await this.rolesRepo.findOne({
      where: { id }
    })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepo.findOneBy({ id })

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    //第一种 merge和save结合  用第一种 因为merge会过滤未定义的字段
     this.rolesRepo.merge(role,updateRoleDto) // merge(role,obj1,obj2) 会将obj1,obj2 都合并到role上
    return this.rolesRepo.save(role)
    //第二种 Object.assign合并后 直接save
    // return await this.rolesRepo.save(Object.assign(role, updateRoleDto))
  }

  async remove(id: number) {
    return await this.rolesRepo.delete({
      id
    })
  }
}
