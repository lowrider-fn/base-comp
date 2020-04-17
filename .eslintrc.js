module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		es6: true,
	},
	plugins: [
		'@typescript-eslint',
		'compat',
		'import',
		'react',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:compat/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:import/recommended',
		'plugin:react/recommended',
	],
	rules: {
		'react/jsx-one-expression-per-line': 0,
		'react/jsx-max-depth'              : ['warn', {
			max: 5,
		}],

		'react/jsx-curly-spacing': [2, 'always'],	

		'key-spacing': ['error', {
			'singleLine': {
				'beforeColon': false,
				'afterColon' : true,
			},
			'multiLine': {
				'beforeColon': false,
				'afterColon' : true,
				'align'      : 'colon',
			},
		}],

		'space-before-blocks': [2, 'always'],
		
		'arrow-spacing': [2, { 
			'before': true, 
			'after' : true, 
		}],

		'comma-spacing': [2, { 
			'before': false, 
			'after' : true, 
		}],	

		'space-infix-ops': [2, { 'int32Hint': false }],	
		"no-multiple-empty-lines":[ 
			1,
			{ 
				"max":1
			}
		],
		// indent
		'indent': ['error', 'tab', {
			SwitchCase: 1,
		}],
		'@typescript-eslint/indent': ['error', 'tab', {
			SwitchCase: 1,
		}],

		'quotes': ['error', 'single'],
		'object-curly-spacing': ['error', 'always'],
		'semi': ['error', 'never'],
		'comma-dangle': ['error', 'always-multiline'],

		// typescript
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'none',
			},
		}],
		// import
		'import/no-unresolved': ['error', {
			ignore: [
				'\\?module$',
			],
		}],
		'import/order': ['error', {
			'newlines-between': 'always',
		}],

		// jsx
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/no-string-refs': 'off',
		'react/no-unknown-property': ['error', {
			ignore: ['class'],
		}],
		'react/jsx-wrap-multilines': ['error', {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line',
			condition: 'parens-new-line',
			logical: 'parens-new-line',
			prop: 'parens-new-line',
		}],
		'react/jsx-max-props-per-line': ['error', {
			maximum: 2,
		}],
		'react/jsx-first-prop-new-line': ['error', 'multiline'],
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-closing-bracket-location': 'error',
		'react/jsx-one-expression-per-line': ['error', {
			allow: 'literal',
		}],
		'react/jsx-max-depth': ['error', {
			max: 5,
		}],
	},
	overrides: [
		{
			files: [
				'scripts/*',
				'_templates/**',
				'*.js',
			],
			env: {
				node: true,
			},
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'no-console': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			'typescript': {},
		},
		react: {
			pragma: 'h',
			version: '16.0',
		},
	},
	
}
