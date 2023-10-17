const inputStr = `10110
11010
10110
11010
10000
00011
10000
10010
10000`;

const input = inputStr.split("\n").map(num => parseInt(num, 2));

type CacheRow = {
  validBit: boolean;
  tag: number;
  data: number;
};

class CS21Cache {
  private rows: CacheRow[];

  constructor(
    public readonly indices: number,
  ) {
    this.rows = [...Array(indices)].map(_ => ({
      validBit: false,
      tag: 0,
      data: 0,
    }));
  }

  addToCache(blockAddr: number): 'hit' | 'miss' {
    const index = blockAddr % this.indices;

    const { validBit, tag } = this.rows[index];
    const incomingTag = Math.floor(blockAddr / this.indices);

    if (validBit && tag === incomingTag) {
      return 'hit';
    }

    const newRow = {
      validBit: true,
      tag: incomingTag,
      data: blockAddr,
    };

    this.rows[index] = newRow;

    return 'miss';
  }

}

class CS21MultilevelCache {
  public caches: CS21Cache[];

  constructor(cacheSizes: number[]) {
    this.caches = cacheSizes.map(cacheSize => new CS21Cache(cacheSize))
  }

  addToCache(blockAddr: number): 'hit' | 'miss' {
    
    // NOTE: Not exactly correct

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

for (const blockAddr of input) {
  const result = x.addToCache(blockAddr);
  console.log(`load ${blockAddr} = ${result}`);
}
