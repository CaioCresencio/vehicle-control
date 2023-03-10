import { Request, Response } from "express";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


class ImportCategoryController{
    
    constructor( private importCategoryUseCase:ImportCategoryUseCase ){}
    
    handle( request: Request, response: Response): Response{
        const { file } = request;
        
        if ( file ){
            this.importCategoryUseCase.execute(file);
        }   
        return response.send();
    }
}

export { ImportCategoryController };