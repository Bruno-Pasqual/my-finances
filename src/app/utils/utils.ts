export function isEqual(item1: any, item2: any) {
	return item1 == item2;
}

export function isValidEmailFormat(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function saveToLocalStorage(key: string, value: any): void {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string): any {
	const storedValue = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : null;
}
