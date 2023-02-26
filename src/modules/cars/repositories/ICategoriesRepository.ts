import { Category } from "../model/Category"


interface ICategoriesRepository{  
    findByName( name: string ): Category;
    list( ): Category[];
    create( {name, description} ): void; 
}

export { ICategoriesRepository };