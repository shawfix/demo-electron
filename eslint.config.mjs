import { defineConfig } from 'eslint/config';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

const prettier = {
  ...eslintConfigPrettier,
  rules: {
    ...eslintConfigPrettier.rules,
    semi: 'off',
    'no-console': 'off',
    'no-unused-vars': 'off'
  }
};

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { perfectionist: eslintPluginPerfectionist },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          sortBy: 'path',
          newlinesBetween: 1,
          newlinesInside: 0,
          sortSideEffects: true,
          internalPattern: ['^@renderer/.+'],
          partitionByComment: 'sort-partition',
          groups: [
            ['side-effect', 'side-effect-style'],
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown'
          ]
        }
      ]
    }
  },
  {
    ...prettier
  }
);
