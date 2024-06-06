import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ length: 100 })
  title: string = "";
  @Column({ nullable: true })
  description?: string;
  @Column({ nullable: true })
  owner?: string = "";
  @Column({ nullable: true })
  price: number = 0;
  @Column({ nullable: true })
  picture?: string;
  @Column({ nullable: true })
  location: string = "";
  @Column({ nullable: true })
  createdAt?: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true }) // eager : la relation sera chargée en même temps que l’entité
  category?: Category;
  @ManyToMany(() => Tag, { cascade: true }) // cascade permet d'insérer les éléments qui ne sont pas encore connus au moment de la sauvegarde de l'annonce
  @JoinTable()
  tags?: Tag[]; // Promesse pour ne pas que ce soit chargé en eager
}
