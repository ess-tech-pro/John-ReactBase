import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { fileURLToPath } from 'node:url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	...fixupConfigRules(
		compat.extends('./configs/.eslintrc-auto-import.json', 'airbnb', 'prettier')
	),
	{
		ignores: [
			'dist',
			'node_modules',
			'vite.config.ts',
			'postcss.config.cjs',
			'eslint.config.js',
			'jest.config.js',
			'**/*.test.{js,ts,jsx,tsx}',
			'configs/**/*.{js,ts}',
		], // Bỏ qua thư mục "dist"
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'], // Áp dụng cho các file JavaScript và TypeScript
		languageOptions: {
			ecmaVersion: 2020, // Phiên bản ECMAScript
			globals: globals.browser, // Biến toàn cục của môi trường trình duyệt
			parser: tsParser, // Sử dụng parser của TypeScript
		},
		plugins: {
			// ERROR - Config (unnamed): Key "plugins": Cannot redefine plugin "react".
			// Bởi vì react được định nghĩa ở extend của airbnb
			// 'react': react,
			'react-hooks': reactHooks, // Plugin React Hooks
			'react-refresh': reactRefresh, // Plugin React Refresh
			'@typescript-eslint': tseslint, // Plugin TypeScript ESLint
		},
		rules: {
			// Các quy tắc JavaScript cơ bản
			...js.configs.recommended.rules,
			// Các quy tắc React Hooks
			...reactHooks.configs.recommended.rules,
			// Các quy tắc TypeScript
			...tseslint.configs.recommended.rules,
			// Không sử dụng var
			'no-var': 'error',
			// Quy tắc PascalCase cho component
			'react/jsx-pascal-case': [
				'error',
				{
					allowAllCaps: false, // Ngăn cấm tất cả các component viết hoa toàn bộ
					ignore: [], // Đảm bảo không bỏ qua bất kỳ tên component nào
				},
			],
			'react/jsx-filename-extension': [
				'error',
				{ extensions: ['.tsx', '.jsx'] },
			],
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'jsx-a11y/label-has-associated-control': [
				'error',
				{
					controlComponents: ['Input'],
					depth: 3,
					assert: 'htmlFor',
				},
			],
			'react/jsx-props-no-spreading': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/button-has-type': 'off',
			'import/extensions': 'off',
			'no-param-reassign': 'off',
			'no-trailing-spaces': 'off',
			'max-len': 'off',
			'import/prefer-default-export': 'off',
			'react/jsx-one-expression-per-line': 'off',
			'react/jsx-wrap-multilines': 'off',
			'implicit-arrow-linebreak': 'off',
			quotes: 'off',
		},
		settings: {
			'import/resolver': {
				'eslint-import-resolver-custom-alias': {
					alias: {
						'': './src',
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
	},
]
