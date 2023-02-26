import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO{
    name: string;
    description;
}

interface ISpecificationRepository{
    
    create({ description , name }: ICreateSpecificationDTO): void;
    findByName( name: string ):Specification; 
}

export { ICreateSpecificationDTO, ISpecificationRepository }