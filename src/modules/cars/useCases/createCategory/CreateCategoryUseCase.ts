import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable}  from 'tsyringe';

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase{

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository 
    ){}

    execute({description, name}:IRequest):void{
        const categoryAlreadyExists = this.categoriesRepository.findByName( name );

        if( categoryAlreadyExists){
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({name, description}); 
    }

}
export {CreateCategoryUseCase}