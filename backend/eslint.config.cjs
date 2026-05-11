const js = require('@eslint/js')
const tseslint = require('typescript-eslint')

module.exports = [
	{
		ignores: ['node_modules', 'dist', 'eslint.config.cjs', 'jest.config.cjs'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
]
