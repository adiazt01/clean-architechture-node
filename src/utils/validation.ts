import type { ZodError } from "zod";
import type { ValidationError } from "../domain/dtos/interface/interfaces";

export function extractValidationErrors(error: ZodError): ValidationError[] {
    return error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));
}