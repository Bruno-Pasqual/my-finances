export function isEqual(item1: any, item2: any) {
	return item1 == item2;
}

export function isValidEmailFormat(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
