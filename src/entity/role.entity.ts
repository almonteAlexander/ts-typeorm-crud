import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import User from "./user.entity";

@Entity("roles")
class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    @OneToMany(() => User, user => user.id)
    ownerId: User;

    @Column({ type: "text" })
    name: string;
}

export default Role;