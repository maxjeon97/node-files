"use strict";

const fsP = require('fs/promises');

const argv = process.argv;

let path;
let outputPath;

if (argv[2] === "--out") {
  outputPath = argv[3];
  path = argv[4];
} else {
  path = argv[2];
}


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

  return contents;
}

/**Given a url, attempts to read text content at url. If successful, prints text
 * to the console, else, prints error message to console
 */
async function webCat(url) {
  let response;

  try {
    response = await fetch(url);
  }
  catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }

  return await response.text();
}

/** Given an output path and text content, attempt to output given content to the
 * file at the output path, if it fails, print error message */

async function write(outputPath, content) {
  try {
    await fsP.writeFile(outputPath, content, "utf8");
  } catch (err) {
    console.error(`Couldn't write ${outputPath}: ${err}`);
    process.exit(1);
  }
}

/** Handles either reading/logging or writing functionality based on if the output
 * tag is given in the command line */

async function catOrWebCat(path, outputPath) {
  const content = URL.canParse(path) ? await webCat(path) : await cat(path);
  if (outputPath) {
    write(outputPath, content);
  } else {
    console.log(content);
  }
}

catOrWebCat(path, outputPath);