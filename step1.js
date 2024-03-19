"use strict";

const fsP = require('fs/promises');

const argv = process.argv;

/**Given a path, attempts to read file at path. If successful, prints contents
 * to the console, else, prints error message to console
 */
async function cat(path) {
  let contents;

  try {
    contents = await fsP.readFile(path, "utf8");
  }
  catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }

  console.log(contents);
}

cat(argv[2]);