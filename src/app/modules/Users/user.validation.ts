import {z} from 'zod';

const createUserValidation = z.object({
    body: z.object({
       name: z.string().min(1, "Name is required").max(20) ,
       email: z.string().email("{VALUE} is not a valid email type"),
       password: z.string().min(1, "Password is required"),
       confirm_password: z.string().min(1, "Password is required"),  
    })
})

const changePasswordValidationSchema = z.object({
    body : z.object({
        
        old_password:z.string({required_error:"oldPassword is required !"}),
        new_password:z.string({required_error:"newPassword is required !"}),
        confirm_password:z.string({required_error:"Confirm Password is required !"})
    })
})

const forgetPassValidation = z.object({
    body: z.object({
        email:z.string({required_error:"email is required"})
    })
})
const resetPassValidation = z.object({
    body: z.object({
        email:z.string({required_error:"email is required"}),
        new_password:z.string({required_error:"new password is required"}),
        confirm_password:z.string({required_error:"confirm password is required"}),
    })
})

const blockUserValidation = z.object({
    body: z.object({
        userId:z.string().optional()
    })
})

export const UserValidation = {
    createUserValidation,
    blockUserValidation,
    changePasswordValidationSchema,
    forgetPassValidation,
    resetPassValidation
}