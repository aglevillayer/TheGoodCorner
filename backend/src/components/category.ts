import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from "typeorm";
import { Ad } from "./ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name?: string = "";
  //   @Column()
  //   ads?: Ad[];

  // On a défini la relation ManyToOne du côté de l'entité ads donc pas nécessaire de d'avoir ici le OneToMany.
  // Par contre si on veut la mettre il est obligatoire d'avoir définie le ManyToOne côté Ad
  @OneToMany(() => Ad, (ad) => ad.category)
  ads?: Promise<Ad[]>;
}
