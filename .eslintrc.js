module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'prettier'],
	plugins: ['prettier', 'jest'],
	rules: {
		'prettier/prettier': ['error'],
		'operator-linebreak': 0,
		'no-plusplus': 0,
		'prefer-spread': 0,
		'prefer-rest-params': 0,
		'class-methods-use-this': 0,
		'consistent-return': 0,
		'prefer-template': 0,
		'no-bitwise': 0,
		'no-underscore-dangle': [
			'warn',
			{
				allowAfterThis: true,
				allow: ['__', '_read', '_write']
			}
		],
		'max-classes-per-file': 0,
		'global-require': 0,
		'no-tabs': 0,
		'no-new': 0,
		'func-names': 0,
		'space-before-function-paren': 0,
		'arrow-parens': ['error', 'as-needed'],
		'arrow-body-style': 0,
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'comma-dangle': ['error', 'never'],
		'padded-blocks': 0,
		'max-len': [
			'error',
			{
				code: 150,
				tabWidth: 1,
				comments: 200
			}
		],
		'spaced-comment': [
			'error',
			'always',
			{
				exceptions: ['*']
			}
		],
		'no-param-reassign': 0,
		'no-prototype-builtins': 0,
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'function-paren-newline': 0,
		'prefer-promise-reject-errors': 1,
		'no-await-in-loop': 0,
		'no-continue': 0,
		'no-ex-assign': 0,
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: {
					minProperties: 5,
					multiline: true,
					consistent: true
				},
				ObjectPattern: { minProperties: 5, multiline: true, consistent: true }
			}
		],
		'nonblock-statement-body-position': [
			'error',
			'below',
			{ overrides: { else: 'any' } }
		]
	},
	env: {
		'jest/globals': true
	}
};
