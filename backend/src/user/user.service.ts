import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/hashAndVerification'
import { type getUserDto } from './dto/getUser.dto';
@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async findUser(getUserDto: getUserDto) {
        console.log('userservice-----s', getUserDto)
        const { limit, page, username, password, roleId, gender } = getUserDto
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
                password: true,
                profile: {
                    gender: true  //查profile表的用户性别
                },
                roles: {
                    id: true,    
                    name: true  
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
                    id: roleId
                }
            },
            take,
            skip: ((page || 1) - 1) * take
        })
        const result = res.map(item => JSON.parse(JSON.stringify(item)));
        console.log('查询用户结果 userservices', result)
        return result
    }

    async create(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;

        // 检查用户名是否已存在
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }



        // //创建用户时 对用户密码进行加密
        const newUser = this.userRepository.create({
            username,
            password: await hashPassword(createUserDto.password)
        });



        const savedUser = await this.userRepository.save(newUser);

        // 返回时剔除 password
        // const { password: _, ...result } = savedUser;
        return savedUser;

    }
    async find(username: string) {
        return await this.userRepository.findOne({
            where: { username },
            relations: ['roles']
        })
    }
    findAll() {
        return `This action returns all user`;
    }

    async findOne(id: number) {
        return await this.userRepository.findOne({ where: { id } })
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
