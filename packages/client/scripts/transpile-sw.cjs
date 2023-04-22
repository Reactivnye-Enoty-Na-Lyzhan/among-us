const { exec } = require('child_process');
const path = require('path');
const parseArgs = require('minimist');

const inputFilePath = path.resolve(
  __dirname,
  '../src/service-worker/worker/service-worker.ts'
);
const outFilePath = path.resolve(__dirname, '../public/', 'service-worker.js');

const cliArgs = parseArgs(process.argv.slice(2));
const { mode = 'production' } = cliArgs;

const defaultOptions = [`--outfile='${outFilePath}'`, '--bundle'];
// -------------------------
let modeDependentOptions = [];
if (mode === 'development') {
  modeDependentOptions = ['--sourcemap=inline'];
} else if (mode === 'production') {
  modeDependentOptions = ['--minify'];
}
// -------------------------
const cliFlags = Object.keys(cliArgs)
  .filter(option => cliArgs[option] === true)
  .map(flagName => `${flagName.length > 1 ? '--' : '-'}${flagName}`);
// -------------------------
const options = [...defaultOptions, ...modeDependentOptions, ...cliFlags];
const optionsString = options.join(' ');

const command = `esbuild ${inputFilePath}`;
const commandString = `${command} ${optionsString}`;
console.info(commandString);

exec(commandString, error => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});
