import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'links', schema: 'public' })
export class Links {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column('varchar', {
    length: 10,
  })
  short!: string;

  @Column('varchar', {
    length: 512,
  })
  long!: string;

  @Column('boolean', {
    name: 'is_active',
    default: false,
  })
  isActive!: boolean;
}
