import { Model } from "mongoose";




export interface TUser {
    name: string;
    email:string;
    password:string;
    isDeleted:boolean;
    
}

export interface UserStaticModel extends Model<TUser> {
    isUserExists(id:string): Promise<TUser>;  
    isUserExistsByEmail(email:string):Promise<TUser>;
    isPasswordMaatched(plainTextPass:string, hashedPass:string): Promise<boolean>;
}

export interface TBlockUser {
    userId:string,
}


  
