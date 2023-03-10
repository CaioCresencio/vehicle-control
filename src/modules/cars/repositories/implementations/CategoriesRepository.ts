import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

interface ICreateCategoryDTO{
    name: string;
    description: string;
}


class CategoriesRepository implements ICategoriesRepository{

    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    private static INSTANCE: CategoriesRepository;

    public static getInstance():CategoriesRepository{
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }


    public create({name, description}: ICreateCategoryDTO):void {

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
        
        this.categories.push(category);
    }

    public list():Category[]{
        return this.categories;
    }

    public findByName(name: string ):Category|undefined{
        return this.categories.find( category => category.name === name);
    }
}

export {CategoriesRepository};