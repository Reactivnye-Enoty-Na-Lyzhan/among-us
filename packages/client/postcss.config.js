/* eslint-disable import/no-extraneous-dependencies */
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';

const cssnanoPlugin = cssnano({
  preset: ['default', { discardComments: { removeAll: true } }],
});

export default {
  plugins: [
    postcssImport(),
    postcssNesting(),
    postcssPresetEnv({ stage: 1 }),
    cssnanoPlugin,
  ],
};
