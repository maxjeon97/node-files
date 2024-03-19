"use strict";

const isUrl = require('is-url');

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

async function webCat(url) {
  try {
    let response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

const path = argv[2];

isUrl(path)
? webCat(path)
: cat(path);
