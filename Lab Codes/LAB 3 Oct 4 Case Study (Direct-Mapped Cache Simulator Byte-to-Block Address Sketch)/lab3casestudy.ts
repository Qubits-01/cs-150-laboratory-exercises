

//function makeMemory(byteAddrWidth: number) {
  //return [...Array(2**byteAddrWidth)].fill(0x00);
//}

//const memory = makeMemory(8);
//memory[0x00] = 0x12;
//memory[0x02] = 0x23;
//memory[0x03] = 0xab;
//console.log(memory);

//function getBlockAddr(byteAddr: number, blockSize: number) {
  //return byteAddr / blockSize;
//}

//function getBlock(blockAddr: number, blockSize: number): number[] {
  //const ret: number[] = [];

  //const startAddr = blockAddr * blockSize;

  //for (let i = startAddr; i < startAddr + blockSize; i++) {
    //ret.push(memory[i]);
  //}

  //return ret;
//}

//const b = getBlock(1, 2);
//console.log(b);
//console.log(b.length);
////console.log(getBlockAddr(52, 2));

const inputStr = `10110
11010
10110
11010
10000
00011
10000
10010
10000`;

const input = inputStr.split('\n').map(line => parseInt(line, 2));

type CacheRow = {
  validBit: boolean,
  tag: number,
  data: number,
};

class CS21Cache {
  private rows: CacheRow[];

  constructor(
    public indices: number
  ) {
    this.rows = [...Array(indices)].map(_ =>
      ({
        validBit: false,
        tag: 0,
        data: 0,
      })
    );
  }

  addToCache(blockAddr: number): 'hit' | 'miss' {
    const index = blockAddr % this.indices;
    const row = this.rows[index];
    const incomingTag = Math.floor(blockAddr / this.indices);

    if (row.validBit && row.tag === incomingTag) {
        return 'hit';
    } else {
      const newRow = {
        validBit: true,
        tag: incomingTag,
        data: blockAddr,
      };

      this.rows[index] = newRow;

      return 'miss';
    }
  }
}

const x = new CS21Cache(8);
const y = new CS21Cache(8);

for (const blockAddr of input) {
  const result = x.addToCache(blockAddr);
  console.log(result);
}

console.log(x.rows);
