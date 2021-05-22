import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "src/requests/entities/request.entity";
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
}
