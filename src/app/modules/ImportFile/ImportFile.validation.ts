import { z } from "zod";


const FileValidationSchema = z.object({
    body: z.object({
        userEmail: z.string({required_error:"User Email is required"}),
        favourite: z.boolean().optional(),
    })
})

const FileUpdateValidationSchema = z.object({
    body: z.object({
        newName: z.string({required_error:"Folder name is required"}),
        email: z.string({required_error:"User Email is required"}),
    })
})

export const FileValidation = {
    FileValidationSchema,
    FileUpdateValidationSchema
}