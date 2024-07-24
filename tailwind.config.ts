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
				fundobackground: "#1C1C1C",
				fundojanelas: "#232323",
				fundoMenu: "#060606",
				primary: "#10AC79",
			},
		},
	},
	plugins: [],
};
export default config;
