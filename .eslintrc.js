module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/vue3-recommended'
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        'vue/html-self-closing': 'off',
        'vue/v-on-style': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': ['warn', {
            singleline: 1,
            multiline: {
                max: 1,
                allowFirstLine: true
            }
        }]
    }
}  