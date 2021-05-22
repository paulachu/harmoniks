import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;

    @Column()
    status: number;

    @ManyToMany(type => Skill, )
    @JoinTable({name: 'project_skills'})
    skills: Skill[];

    @ManyToMany(type => User, user => user.projects)
    @JoinTable({name: 'project_users'})
    users: User[];
}
