import js from '@eslint/js';
import next from 'eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    {
        ignores: ['node_modules', '.next', 'dist'],
    },

    // Base JS/TS/React/Next.js rules
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            next,
            react: js.plugins.react, // optional if using react rules
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            'sort-keys-fix': sortKeysFix,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            // --- Import sorting ---
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'], // Side effects
                        ['^node:'], // Node.js built-ins
                        ['^@?\\w'], // Packages
                        ['^@/'], // Aliased internal packages
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Sibling/Index
                        ['^.+\\.s?css$'], // Style imports
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',

            // --- Unused imports/vars ---
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

            // --- Object sorting ---
            'sort-keys-fix/sort-keys-fix': 'warn',

            // --- Next.js specific ---
            'next/no-html-link-for-pages': 'off',

            // --- React hooks best practices (optional) ---
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },

    // Prettier formatting (based on .prettierrc)
    prettier,
];

export default config;
