const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const vue = require('eslint-plugin-vue')

module.exports = [js.configs.recommended, ...tseslint.configs.recommended, ...vue.configs['flat/recommended']]
