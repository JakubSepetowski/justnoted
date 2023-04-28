/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bgc: '#F6F8FC',
				'popup-good': '#07bc0c',
			},
		},
	},
	plugins: [],
};
