import { z } from "zod";

interface ValidationError {
	field: string;
	message: string;
}

export class RegisterUserDto {
	private constructor(
		public name: string,
		public email: string,
		public password: string,
	) {}

	private static RegisterUserSchema =
		z.object({
			name: z
				.string({
					message:
						"Name must be a string",
				})
				.nonempty("Name is required"),
			email: z
				.string({
					message:
						"Email must be a string",
				})
				.email("Invalid email"),
			password: z
				.string({
					message:
						"Password must be a string",
				})
				.min(
					6,
					"Password must be at least 6 characters long",
				),
		});

	static create(object: {
		[key: string]: any;
	}): [
		ValidationError[] | null,
		RegisterUserDto | null,
	] {
		const result =
			RegisterUserDto.RegisterUserSchema.safeParse(
				object,
			);

		if (!result.success) {
			const errors =
				result.error.errors.map(
					(error) => {
						return {
							field:
								error.path.join("."),
							message: error.message,
						};
					},
				);
			return [errors, null];
		}

		const { name, email, password } =
			result.data;
		return [
			null,
			new RegisterUserDto(
				name,
				email,
				password,
			),
		];
	}
}
