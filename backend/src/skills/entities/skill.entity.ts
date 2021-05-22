import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from "src/requests/entities/request.entity";
import { Project } from "src/project/entities/project.entity";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tags: string;

    @ManyToMany(type => User, user => user.skills)
    users: User[];

    @ManyToMany(type => Request, request => request.skills)
    requests: Request[];

    @ManyToMany(type => Project, project => project.skills)
    projects: Project[];
}
