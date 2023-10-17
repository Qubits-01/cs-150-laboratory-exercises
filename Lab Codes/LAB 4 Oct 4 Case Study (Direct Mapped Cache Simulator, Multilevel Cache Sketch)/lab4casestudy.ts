const inputStr = `10110
11010
10110
11010
10000
00011
10000
10010
10000`;

const input = inputStr.split("\n").map(line => parseInt(line, 2));

class CacheRow {
  constructor(
    public validBit: boolean,
    public tag: number,
    public data: number,
  ) {
  }

  copy() {
    return new CacheRow(this.validBit, this.tag, this.data);
  }
};

class CS21Cache {
  private _rows: CacheRow[];

  constructor(
    public indices: number,
  ) {
    this._rows = [...Array(indices)].map(_ =>
      new CacheRow(false, 0, 0));
  }

  get rows() {
    return this._rows.map(row => row.copy());
  }

  addToCache(blockAddr: number): 'hit' | 'miss' {
    const index = blockAddr % this.indices;

    const { tag, validBit } = this.rows[index];
    const incomingTag = Math.floor(blockAddr / this.indices);

    if (validBit && tag === incomingTag) {
      return 'hit';
    } else {
      const newRow = new CacheRow(true, incomingTag, blockAddr);
      this._rows[index] = newRow;

      return 'miss';
    }
  }
}

class MultilevelCache {
  public caches: CS21Cache[];

  constructor(indices: number[]) {
    this.caches = indices.map(num => new CS21Cache(num));
  }

  addToCache(blockAddr: number): 'hit' | 'miss' {
    for (const cache of this.caches) {
      const result = cache.addToCache(blockAddr);

      if (result === 'hit') {
        return 'hit';
      }
    }

    return 'miss';
  }
}

const x = new CS21Cache(8);

//console.log(new CS21Cache(8));
//const m = new MultilevelCache([8, 16, 32]);

//console.log(m.caches);

for (const blockAddr of input) {
  const result = x.addToCache(blockAddr);
  console.log(result);
  console.log(x.rows);
}
