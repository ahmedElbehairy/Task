export interface User {
    Name: string;
    Id: number;
    Phone: string;
    Email: string;
}
export interface Paginater {
    pages: number;
    Users:number;
}
export interface UserInput{
    errorMessage: string;
    id:string;
    ng_model:string
    placeHolder:string
    label:string
}