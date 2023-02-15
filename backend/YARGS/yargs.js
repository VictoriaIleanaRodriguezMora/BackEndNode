const yargs = require("yargs")(process.argv.slice(2))
const args = yargs.default({ PORT: 7070 }).argv
// node ./YARGS/yargs.js --PORT 5050
console.log(args);