import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      "quotes": ["error", "single"],
    }
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
   
  {
    vue: {
      "vue/multi-word-component-names": ["error", {
        "ignores": []
      }],
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
];
