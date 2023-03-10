import * as fs from 'fs';

import { parse } from "csv-parse";
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { inject, injectable}  from 'tsyringe';

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{

        return new Promise( (resolve, reject ) => {
            
            const categories: IImportCategory[] = [];

            const stream = fs.createReadStream( file.path );

            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on("data", async(line) => {

                const [name,description] = line;

                categories.push({
                    name,
                    description
                })
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories)
            }).on("error", (error) => reject(error));
        });

    }

    async execute( file: Express.Multer.File ):Promise<void>{
        const categories = await this.loadCategories(file);
        
        categories.forEach( category => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName( name );

            if ( !existCategory ) {
                this.categoriesRepository.create({
                    name, description
                });
            }
            
        });
    }

}

export { ImportCategoryUseCase }