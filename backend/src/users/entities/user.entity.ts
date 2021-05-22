import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
import { School } from '../../school/entities/school.entity';

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

  @Column({default: false})
  isAdmin: boolean;

  @ManyToOne(type => School, school => school.users)
  school: number;

  @Column({ nullable: true })
  debt: number;

  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  discord_id: string;

  @Column({ nullable: true })
  linkedin_link: string;

  @Column({ nullable: true })
  hopper_link: string;


}
