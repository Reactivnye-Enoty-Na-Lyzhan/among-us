/* eslint-disable import/no-extraneous-dependencies */
import cssnano from 'cssnano';
import postcssColorMod from 'postcss-color-mod-function';
import postcssPresetEnv from 'postcss-preset-env';

const cssnanoPlugin = cssnano({
  preset: ['default', { discardComments: { removeAll: true } }],
});
const postcssPresetEnvPlugin = postcssPresetEnv({ stage: 1 });

const plugins = [postcssColorMod, postcssPresetEnvPlugin];
if (process.env.BUILD_MODE !== 'development') {
  plugins.push(cssnanoPlugin);
}

export default {
  plugins,
};
