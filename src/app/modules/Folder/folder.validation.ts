import { z } from "zod";


const FolderValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error:"Folder name is required"}),
        userEmail: z.string({required_error:"User Email is required"}),
        favourite: z.boolean().optional(),
        parentId: z.boolean().optional()
    })
})

export const ForlderValidation = {
    FolderValidationSchema
}