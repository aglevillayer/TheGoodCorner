import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name?: string;
}
