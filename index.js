const fs = require('fs').promises;
const path = require('path');

const WebIDL2 = require('webidl2');

const WEBREF_DIR = path.join(__dirname, 'webref/ed/idl');

class IDLFile {
  constructor(dir, file) {
    this.filename = file;
    this.shortname = path.basename(file, '.idl');
    this.path = path.join(dir, file);
  }

  async text() {
    const text = await fs.readFile(this.path, 'utf8');
    return text;
  }

  async parse() {
    const text = await this.text();
    return WebIDL2.parse(text);
  }
}

async function listAll() {
  const all = {};
  const files = await fs.readdir(WEBREF_DIR);
  for (const f of files) {
    const idlFile = new IDLFile(WEBREF_DIR, f);
    all[idlFile.shortname] = idlFile;
  }
  return all;
}

async function parseAll() {
  const all = await listAll();
  for (const [key, value] of Object.entries(all)) {
    all[key] = await value.parse();
  }
  return all;
}

module.exports = {listAll, parseAll};
