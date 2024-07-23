import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				fundobackground: "#131622",
				fundojanelas: "#21242",
				fundoMenu: "#020514",
				primary: "#5D69F3",
			},
		},
	},
	plugins: [],
};
export default config;
