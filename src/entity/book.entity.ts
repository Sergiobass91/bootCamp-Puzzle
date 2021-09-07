import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Author } from "./author.entity";
import { Field, ObjectType } from "type-graphql";

//Se define clase porque typeorm se define en clases, los decoradores nos ayudan a definir los tipos.
@ObjectType()
@Entity()
export class Book {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number                 //! se inicializa siempre
    
    @Field()
    @Column()
    title!: String
    
    @Field( ()=> Author )
    @ManyToOne( ()=> Author, author => author.books) //Se define cardinalidad de la relacion
    author!: Author
    
    @Field()
    @CreateDateColumn( {type: 'timestamp'} )
    createdAt!: String
}