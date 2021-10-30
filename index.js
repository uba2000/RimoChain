const { Block, BlockChain } = require("./BlockChain");

const rimoChain = new BlockChain();

rimoChain.addBlock(new Block(Date.now().toString(), { from: "Noel", to: "Rhema", amount: 500 }));

console.log(rimoChain.chain);

