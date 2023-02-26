import { Response,Request } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from '../../services/CreateCategoryService';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


class CreateCategoryController{

    handle( request: Request, response: Response){
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
        
        createCategoryUseCase.execute({description, name});
     
        return response.status(201).send();
    }
}

export { CreateCategoryController }