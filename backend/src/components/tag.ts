import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {
  private static counter: number = 0;
  @PrimaryGeneratedColumn()
  id: number = Tag.counter++;
  @Column()
  name?: string;
}
