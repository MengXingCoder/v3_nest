import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/crud.entity';
import { getUserDto } from './dto/getUser.dto';
@Injectable()
export class CrudService {
    constructor(@InjectRepository(Test) private crudRepository: Repository<Test>) { }
    //查询全部用户 分页
    async findUser(query: getUserDto) {
        const { limit, page } = query
        const take = limit || 10 //一般为10条一页
        const res = await this.crudRepository.find({
            take,
            skip: (page - 1) * take, //跳转的页码
        })
        console.log('crud', res)
        return res
    }
    //查询指定用户
    async findQueryId(id: number) {
        const res = await this.crudRepository.findOne({ where: { id } })
        if (!res) {
            throw new NotFoundException(`Test ID ${id} 不存在`);
        }
        return res
    }
    async update(id: number, updateCrudDto: UpdateCrudDto) {
        const res = await this.crudRepository.update(id, updateCrudDto);
        console.log('更新', res)
        return await this.crudRepository.findOne({ where: { id } }); // 重新查一次，拿到完整数据
    }
    create(createCrudDto: CreateCrudDto) {
        const test = this.crudRepository.create(createCrudDto);
        return this.crudRepository.save(test);
    }
    //删除用户
    async remove(id: number) {
        const res = await this.crudRepository.delete(id)
        console.log('删除结果', res)
        if (res.affected === 0) {
            throw new NotFoundException(`ID ${id} 不存在`);
        }
        return { message: `${id} 删除成功` };
    }
}
