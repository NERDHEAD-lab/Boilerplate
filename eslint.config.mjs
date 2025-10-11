import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [
            '**/dist/',
            '**/node_modules/',
            'packages/electron-app/.webpack/',
            'packages/electron-app/out/'
        ],
    },
    {
        languageOptions: {
            globals: {
                process: 'readonly',
                __dirname: 'readonly'
            }
        }
    }
];