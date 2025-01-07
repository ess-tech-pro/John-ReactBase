import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist', 'node_modules', 'build'], // Bỏ qua thư mục "dist"
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Áp dụng cho các file JavaScript và TypeScript
    languageOptions: {
      ecmaVersion: 2020, // Phiên bản ECMAScript
      globals: globals.browser, // Biến toàn cục của môi trường trình duyệt
      parser: tsParser, // Sử dụng parser của TypeScript
    },
    plugins: {
      'react': react,
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
      'react/jsx-pascal-case': ['error', {
        'allowAllCaps': false, // Ngăn cấm tất cả các component viết hoa toàn bộ
        'ignore': [] // Đảm bảo không bỏ qua bất kỳ tên component nào
      }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
