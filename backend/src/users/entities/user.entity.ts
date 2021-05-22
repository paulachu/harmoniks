import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import { School } from '../../school/entities/school.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Request } from '../../requests/entities/request.entity';

@Entity()
export class User {
  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne((type) => School, (school) => school.users)
  @JoinColumn()
  school: School;

  @Column({ nullable: true })
  debt: number;

  @ManyToMany((type) => Skill, (skill) => skill.users, { eager: true })
  @JoinTable({ name: 'user_skills' })
  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  discord_id: string;

  @Column({ nullable: true })
  linkedin_link: string;

  @Column({ nullable: true })
  hopper_link: string;

  @ManyToMany((type) => Request, (request) => request.user_from)
  my_requests: Request[];

  @ManyToMany((type) => User, (user) => user.helps)
  helps: Request[];
}
