import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
class User extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: "text", unique: true })
    email?: string | undefined;

    @Column({ type: "text" })
    password?: string | undefined;
}

export default User;