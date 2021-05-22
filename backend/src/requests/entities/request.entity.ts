import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(type => Skill, (skill) => skill.requests, { eager: true })
    @JoinTable({name: "request_skills"})
    skills: Skill[];

    @ManyToMany(type => User, (user) => user.helps, { eager: true })
    @JoinTable({name: "request_helpers"})
    helpers: User[];

    @ManyToOne(type => User, (user) => user.my_requests, { eager: true })
    @JoinTable()
    user_from: User;

    @Column({nullable: false, default: () => "CURRENT_TIMESTAMP", type: "timestamp"})
    createdAt: Date;
}
