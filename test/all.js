const assert = require('assert');

const dfns = require('..');

describe('webidl-dfns', () => {
  it('listAll', async () => {
    const files = await dfns.listAll();
    assert.strictEqual(Object.keys(files).length, 198);
    for (const [shortname, file] of Object.entries(files)) {
      assert.strictEqual(shortname, file.shortname);
      assert(/^[a-z0-9-]+$/i.exec(shortname),
          `invalid shortname: ${shortname}`);
    }
  });

  it('parseAll', async () => {
    const all = await dfns.parseAll();
    assert.strictEqual(Object.keys(all).length, 198);
    for (const ast of Object.values(all)) {
      assert(Array.isArray(ast));
      assert(ast.length);
    }
  });
});
