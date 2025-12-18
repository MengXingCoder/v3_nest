import { Injectable } from "@nestjs/common";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
@Injectable()
export class CaslAbilityService {
    forRoot() {

        const { can, build } = new AbilityBuilder(createMongoAbility)
        can('manage', 'all')
        const ability = build({
            detectSubjectType: (object): any => object.constructor
        })
        // ability.can()   这个里面传递的参数有一个或者多个，也有可能是数组，我们确定不了用户传递什么参数
        // 所以我们使用一个装饰器 @Checkcasl((ability)=>ability.can(Action,User,[''])) 
        // ability.cannot()
        return ability
    }
}
