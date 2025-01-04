import { z } from "zod";
import type { ValidationError } from "../interface/interfaces";
import { extractValidationErrors } from "../../../utils/validation";

export class LoginUserDto {
    constructor (
        public email: string,
        public password: string,
    ) {}

    private static LoginUserSchema = z.object({
        email: z
            .string({
                message: "Email must be a string",
            })
            .email("Invalid email"),
        password: z
            .string({
                message: "Password must be a string",
            })
            .min(6, "Password must be at least 6 characters long"),
    });

    static create(object: {
        [key: string]: unknown;
    }): [ValidationError[] | null, LoginUserDto | null] {
        const result = LoginUserDto.LoginUserSchema.safeParse(object);

        if (!result.success) {
            const errors = extractValidationErrors(result.error);
            return [errors, null];
        }

		const { email, password } = result.data;
		return [null, new LoginUserDto(email, password)];
    }

}