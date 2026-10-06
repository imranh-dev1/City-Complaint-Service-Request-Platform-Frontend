import z from "zod";

export const signupSchema = z
    .object({
        name: z
            .string({
                message: "Name is required",
            })
            .min(
                2,
                "Name must be at least 2 characters long"
            ),

        email: z
            .string({
                message: "Email is required",
            })
            .email("Invalid email format"),

        phone: z
            .string()
            .regex(
                /^\+?[1-9]\d{1,14}$/,
                "Invalid phone number format"
            )
            .optional()
            .or(z.literal("")),

        password: z
            .string({
                message: "Password is required",
            })
            .min(
                6,
                "Password must be at least 6 characters long"
            ),

        confirmPassword: z
            .string({
                message: "Confirm password is required",
            })
            .min(
                1,
                "Please confirm your password"
            ),
    })
    .refine(
        (data) =>
            data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type SignupFormValues =
    z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});