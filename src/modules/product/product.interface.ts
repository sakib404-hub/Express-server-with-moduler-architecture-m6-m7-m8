export interface IProduct {
    name : string;
    description : string;
    price : number;
    in_stock : boolean;
    category_id : number;
    brand  ? :  string;
}