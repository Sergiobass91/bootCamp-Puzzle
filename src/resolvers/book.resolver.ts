//Nombre por convesi�n dentro de resolvers.
import { Query, Resolver } from "type-graphql";


//Decoradores para a�adir comportamiento de clases, parametros etc, EXPERIMENTAL!
@Resolver()
export class Bookresolver {

    //Forma de declarar un query que devuelve un String
    @Query( ()=> String)
    getAll() {
        return 'All my books';
    };
};