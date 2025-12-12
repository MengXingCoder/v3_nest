
import { IsNotEmpty, IsString, Length, ValidationArguments } from 'class-validator'
const validateMsg = (args: ValidationArguments): string => {
    return `用户名长度必须在${args.constraints[0]}至${args.constraints[1]}`
}
export class loginUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 20, {
        // $value 前端传过来的要校验的值
        // $targetName 当前的类
        // $property 当前属性名
        // $constraints 最小长度 这是一个数组 $constraints1就是第一个值(即为6)，$constraints2就是第二个值(即为20)

        //第一种 最简单
        // message: '用户名长度必须在$constraint1至$constraint2' // 不能是$constraints1 不带s

        //第二种 自定义
        // message: (args) => {
        //     return `用户名长度必须在${args.constraints[0]}至${args.constraints[1]}`
        // }


        //第三种 单独出来复杂校验逻辑
        message: validateMsg


    })
    username: string
    password: string
}
