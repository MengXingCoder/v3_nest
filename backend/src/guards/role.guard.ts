import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorators';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private reflator:Reflector,private userService:UserService){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    //整个流程就是 在你需要加守卫控制的controller或者请求方法(get post) 加上守卫
    // 用户是通过jwt进行登陆验证的 然后 可以通过this.reflator.getAllAndMerge 拿到施加在controller或者请求方法上的role信息
    
    // 然后通过 context.switchToHttp().getRequest() 拿到用户请求的信息 解析其信息拿到用户名 然后根据用户名查询其关联的 role对应的权限
    // 拿到登录用户的role信息后，与通过this.reflator.getAllAndMerge 拿到施加在controller或者请求方法上的role信息 进行比对，
    // 看看比对结果是否 满足守卫的限制要求 如果满足 可以访问该controller或者请求方法
    //getAllAndOverride<Role> 这个Role是字符串(因为就保留最后一个) 方法会导致 路由上的方法(get post) @Get()
      // @Roles(Role.User) 会覆盖 @controller 上面的@Controller('roles') @Roles(Role.Admin) 最后只保留了 ['User']
      
    // getAllAndMerge<Role[]> 因为是合并 所以Role类型是数组 最后结果是['User','Admin']
    const requireRoles = this.reflator.getAllAndMerge<Role[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ])
        console.log('role guard requireRoles',requireRoles)
    if(!requireRoles) {
      //如果没有设置guard 也就是说这些路由 不需要进行控制访问 直接放行
      return true
    }
   
   const reqInfo = context.switchToHttp().getRequest() //拿到用户请求过来的信息 来和guard里面存储信息 进行对比 
    const userInfo = await this.userService.find(reqInfo.user.username)

    console.log('用户的信息',JSON.parse(JSON.stringify(userInfo)),userInfo)
    const roleId = JSON.parse(JSON.stringify(userInfo)).roles.map(o=>o.name)
    console.log('拿到该用户 roleid',roleId)
    const isAccess = requireRoles.some((o)=>roleId.includes(o))
    console.log('是否通过',isAccess)
    return isAccess;
  }
}
