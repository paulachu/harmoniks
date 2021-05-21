import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tags: string;

    @Column()
    description: string;

    @ManyToMany(type => User, user => user.skills)
    users: User[];
}
