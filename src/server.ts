import express from 'express';
import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { Bookresolver } from "./resolvers/book.resolver";
import { AuthorResolver } from "./resolvers/author.resolver";

//Creando servidor
export async function startServer() {
    
    const app = express();

    /*
    instanciando ApolloServer, debe incluir squema, squema debe poder interpretarlo node
    para ello se importa builSquema, se le pasa un objeto de los resolver que a su vez
    contienen un array de los mismos.
    */
    const apolloServer = new ApolloServer({
        schema: await buildSchema( {resolvers: [Bookresolver, AuthorResolver]} )
    });


    //Se le pasa a nuestro servidor, nuestro apollo en server express
    apolloServer.applyMiddleware( {app, path: '/graphql'} )

    //Debemos pasarle nuestro resolvers

    
    return app;
}