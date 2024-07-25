import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export function getHash(password: string) {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);
	return hash;
}

export function comparePasswords(password: string, hash: string): boolean {
	const isMatch = compareSync(password, hash);
	return isMatch ? true : false;
}
