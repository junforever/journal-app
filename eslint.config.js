import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'jsx-quotes': ['error', 'prefer-double'], // Comillas dobles en JSX
      'react-hooks/exhaustive-deps': 'off',
      'indent': ['warn', 2]
      // 'react/prop-types': 'off', // Desactiva la regla de prop-types
    },
  },
  // configuración para el archivo de configuración de eslint
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // configuración para archivos de pruebas con funciones de jest en js y jsx
  {
    files: ['**/*.test.js', '**/*.spec.js','**/*.test.jsx', '**/*.spec.jsx'], // Archivos de prueba
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.jest, // Reconoce las globals de Jest
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  //configuración para el archivo de configuración de babel y jest
  {
    files: ['babel.config.{js,cjs,mjs}', 'jest.config.{js,cjs,mjs}'], // Aplica a archivos de configuración
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // Reconoce las globals de Node.js
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script', // Se usa "script" para CommonJS
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
  },
]