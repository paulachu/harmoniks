import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
@Entity()
export class School {
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    domain: string;
    @OneToMany(type => User, user => user.school_id)
    users: User[]
}
