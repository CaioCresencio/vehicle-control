import { Response,Request } from 'express';
import { CreateCategoryService } from '../../services/CreateCategoryService';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


class CreateCategoryController{

    constructor(private createCategoryUseCase: CreateCategoryUseCase ){}

    handle( request: Request, response: Response){
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({description, name});
     
        return response.status(201).send();
    }
}

export { CreateCategoryController }