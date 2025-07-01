import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: "email is requird"}),
        password: z.string({required_error: "password is requird"}),
    })
})

const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'refresh token is required!'
        })
    })
})

export const AuthValidation = {
    loginValidationSchema,
    refreshTokenValidation
}