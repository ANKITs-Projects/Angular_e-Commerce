export interface userSignUp{
    name: string;
    email: string;
    password: string;
    id:number;
}
export interface userSignIn{
    email: string;
    password: string;
}
export interface product{
    id:number;
    name: string;
    price:number;
    color:string;
    category:string;
    description: string;
    image:string;
    quantity : undefined | number;
    productId:number |undefined;
}
export interface cart{
    id:number | undefined;
    name: string;
    price:number;
    color:string;
    category:string;
    description: string;
    image:string;
    quantity : undefined | number;
    userId:number;
    productId:number;
}
export interface priceSummary{
    price:number;
    discount: number;
    tax: number;
    deliveryFees:number;
    total:number;
}
export interface order{
    address:string;
    contact: number;
    totalPrice: number;
    userId:number;
    id:number|undefined
}