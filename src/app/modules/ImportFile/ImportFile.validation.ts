import { z } from "zod";


const FileValidationSchema = z.object({
    body: z.object({
        userEmail: z.string({required_error:"User Email is required"}),
        type:z.string({required_error:"file type is required"}),
        favourite: z.boolean().optional(),
    })
})

export const FileValidation = {
    FileValidationSchema
}