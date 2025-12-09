import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import {type  getUserDto } from './dto/getUser.dto';

@Controller('crud')
export class CrudController {
    constructor(private readonly crudService: CrudService) { }

    //查询所有用户
    @Get()
    findUser(@Query() query: getUserDto) {
        return this.crudService.findUser(query);
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
