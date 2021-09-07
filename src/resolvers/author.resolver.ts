//Nombre por convesión dentro de resolvers.
import { Mutation, Resolver, Arg, InputType, Field, Query } from "type-graphql";
import { Author } from "../entity/author.entity";
import { getRepository, Repository } from "typeorm";
import { query } from "express";

@InputType()
class AuthorInput {
    @Field()
    fullName!: String;
}

@InputType()
class AuthorUpdateInput {

    @Field(()=> Number)
    id!: number;

    @Field()
    fullName!: String;
}

@InputType()
class AuthorIdInput {
    @Field(()=> Number)
    id!: number;
}


//Decoradores para añadir comportamiento de clases, parametros etc, EXPERIMENTAL!
@Resolver()
export class AuthorResolver {

    authorRepository : Repository<Author>

    constructor() {
        this.authorRepository = getRepository(Author)
    }

    @Mutation( ()=> Author ) //Mutation= Guarda o genera datos en la BD, devuelve tipo Author (importado)
    async createAuthor( 
        @Arg('input', ()=> AuthorInput ) input: AuthorInput
    ) : Promise<Author | undefined> {
        try {
            const createdAuthor = await this.authorRepository.insert({fullName: input.fullName});
            const result = await this.authorRepository.findOne(createdAuthor.identifiers[0].id)
            return result;
        } catch (error) {
            console.error;
        }
    }

    @Query(()=> [Author])
    async getAllAuthors(): Promise<Author[]> {
        return await this.authorRepository.find();
    };

    @Query(()=> Author)
    async getAuthorById(
        @Arg('input', ()=> AuthorIdInput ) input: AuthorIdInput
    ) : Promise<Author | undefined> {
        return await this.authorRepository.findOne(input.id);
    }

    @Mutation(()=> Author)
    async updateAthor(
        @Arg('input', ()=> AuthorUpdateInput ) input: AuthorUpdateInput
    ) : Promise<Author | undefined> {

        const authorExists = await this.authorRepository.findOne(input.id);

        if (!authorExists)
            throw new Error('Author does not exists');

        return await this.authorRepository.save({
            id: input.id,
            fullName: input.fullName
        });
    }
};