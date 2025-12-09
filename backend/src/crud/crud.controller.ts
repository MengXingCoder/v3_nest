import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';

@Controller('crud')
export class CrudController {
    constructor(private readonly crudService: CrudService) { }

    //查询所有用户
    @Get()
    findUser() {
        return this.crudService.findUser();
    }
    //查询指定用户
    @Get('/queryId/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.crudService.findQueryId(id);
    }
    //更新用户
    @Patch('/updateTest/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCrudDto: UpdateCrudDto) {
        return this.crudService.update(id, updateCrudDto);
    }
    //新增用户
    @Post()
    create(@Body() createCrudDto: CreateCrudDto) {
        return this.crudService.create(createCrudDto);
    }
    //删除指定用户
    @Delete('/deleteId/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.crudService.remove(id);
    }
}
