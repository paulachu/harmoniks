import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "src/requests/entities/request.entity";
@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tags: string;

    @ManyToMany(type => User, (user) => user.skills)
    @JoinTable()
    users: User[];

    requests: Request[];
}
