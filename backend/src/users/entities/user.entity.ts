import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
import { School } from '../../school/entities/school.entity';
import { Skill } from 'src/skills/entities/skill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  isAdmin: boolean;

  @ManyToOne(type => School, school => school.users)
  school: number;

  @Column({ nullable: true })
  debt: number;

  @ManyToMany(type => Skill, skill => skill.users)
  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  discord_id: string;

  @Column({ nullable: true })
  linkedin_link: string;

  @Column({ nullable: true })
  hopper_link: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

}
