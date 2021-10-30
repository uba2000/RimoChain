const crypto = require("crypto");

const SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
  constructor(timestamp = " ", data = []) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = " ";
    this.nonce = 0;
  }

  getHash() {
    return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
  }

  mine(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }
}

class BlockChain {
  constructor() {
    // set genesis block
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1;
  }

  // Get last block on blockchain
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Add new block to chain
  addBlock(block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
  }

  // Validation
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
        return false;
      }
    }
    return true;
  }
}

module.exports.Block = Block;
module.exports.BlockChain = BlockChain;
