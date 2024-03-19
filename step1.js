"use strict";

const fsP = require('fs/promises');

const argv = process.argv;

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  }
  catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

cat(argv[2]);