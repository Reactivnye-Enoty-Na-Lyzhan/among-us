/* eslint-disable import/no-extraneous-dependencies */
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport(),
    postcssNesting(),
    postcssPresetEnv({ stage: 1 }),
    autoprefixer(),
  ],
};
