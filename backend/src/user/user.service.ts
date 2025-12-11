import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { profile } from 'console';
@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async findUser(query) {
        const { limit, page, username, role, gender } = query
        const take = limit || 10
        const res = await this.userRepository.find({
            //输出结果为下面的
            //         {
            //     "id": 1,
            //     "username": "user1",
            //     "profile": {
            //         "gender": 1
            //     },
            //     "roles": [
            //         {
            //             "name": "admin"
            //         }
            //     ]
            // }
            //这个select 就是查询想要的数据
            select: {
                id: true,//这个id是多个表 join时所需要的id字段
                username: true, //查user表的用户名
                profile: {
                    gender: true  //查profile表的用户性别
                },
                roles: {
                    name: true //查该用户的权限名称
                }
            },
            //user表关联那些表 (关联了roles和profile表)
            relations: {
                profile: true,
                roles: true
            },
            //where 就是查询条件了
            where: {
                username,//本身就是在user表 所以用户名直接写
                //profile 表 传入的参数gender和profile的字段gender相同 所以同名简写
                profile: {
                    gender
                },
                //roles 表存的是id，但是传入的参数名是role 所以要进行对应
                roles: {
                    id: role
                }
            },
            take,
            skip: ((page || 1) - 1) * take
        })
        return res
    }
    queryId(id: number) {
        return this.userRepository.findOneBy(1);
    }
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
