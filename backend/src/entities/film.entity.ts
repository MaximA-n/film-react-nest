import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryColumn('uuid')
  id: string;

  @Column('decimal')
  rating: number;

  @Column()
  director: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { eager: true })
  schedule: Schedule[];
}
