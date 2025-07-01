import { z } from "zod";


const NoteValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error:"Note name is required"}),
        userEmail: z.string({required_error:"User Email is required"}),
        favourite: z.boolean().optional(),
    })
})

export const NoteValidation = {
    NoteValidationSchema
}