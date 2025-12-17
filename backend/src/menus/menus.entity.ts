import type { Roles } from "src/roles/roles.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
@Entity()
export class Menus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    path: string;
    @Column()
    order: number;
    @Column()
    acl: string;

    @ManyToMany('Roles', 'menus')
    @JoinTable({ name: "roles_menus" })
    roles: Roles[]
}
