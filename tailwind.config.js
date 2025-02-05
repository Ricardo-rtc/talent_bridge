import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				bayon: ["Bayon", "sans-serif"],
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				talent: {
					primary: "#1F82BF",
					secondary: "#FFFFFF", // White
					accent: "#7FC15E",
					neutral: "#000000", // Black (for text)
					"base-100": "#F3F2EF", // Light Gray (background)
					info: "#5E5E5E", // Dark Gray (for secondary text)
					success: "#057642", // Dark Green (for success messages)
					warning: "#F5C75D", // Yellow (for warnings)
					error: "#CC1016", // Red (for errors)
				},
			},
		],
	},
};
