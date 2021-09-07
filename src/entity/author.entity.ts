import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Book } from "./book.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType() //Tipo de dato de  graphql

//Se define clase porque typeorm se define en clases, los decoradores nos ayudan a definir los tipos.
@Entity()
export class Author {

    @Field( ()=> String )
    @PrimaryGeneratedColumn()
    id!: number
    
    @Field( ()=> String )
    @Column()
    fullName!: String
    
    @Field( {nullable: true} )
    @OneToMany( ()=> Book, book => book.author ) //Se define cardinalidad de la relacion
    books!: Book
    
    @Field( ()=> String )
    @CreateDateColumn( {type: 'timestamp'} )
    createdAt!: String
}