import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'from_user_id' })
  fromUserId: string;

  @Column({ name: 'to_user_id' })
  toUserId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.receivesFrom)
  @JoinColumn({ name: 'from_user_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.sendsTo)
  @JoinColumn({ name: 'to_user_id' })
  recipient: User;
}
