import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @ManyToMany(type => Skill, skill => skill.id)
    skills: Skill[];

    @ManyToMany(type => User, user => user.id)
    helpers: User[];

    @ManyToOne(type => User, user => user.id)
    user_from: User;
}