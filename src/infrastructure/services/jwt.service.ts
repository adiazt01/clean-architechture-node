import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtService {
	private readonly secret: string;
	private readonly expiresIn: string | number;

	constructor(secret: string, expiresIN: string | number) {
		this.secret = secret;
		this.expiresIn = expiresIN;
	}

	genereToken(payload: string | object): string {
		return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
	}

	verifyToken(token: string): JwtPayload {
		return jwt.verify(token, this.secret) as JwtPayload;
	}
}
