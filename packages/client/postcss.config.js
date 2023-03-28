/* eslint-disable import/no-extraneous-dependencies */
import cssnano from 'cssnano';
import postcssNesting from 'postcss-nesting';
import postcssPresetEnv from 'postcss-preset-env';

const cssnanoPlugin = cssnano({
  preset: ['default', { discardComments: { removeAll: true } }],
});

const postcssPresetEnvPlugin = postcssPresetEnv({ stage: 1 });

export default {
  plugins: [postcssNesting(), postcssPresetEnvPlugin, cssnanoPlugin],
};
