import SHA256 from 'sha256'

  const createBlock = (index,timestamp,data,previusHash) => {
    return {
        index,
        timestamp,
        data,
        previusHash,
        hash: calculateHash(index, timestamp, data, previusHash)
      };
    }
 const calculateHash = (index,timestamp,data,previusHash) =>{
    return SHA256(index + timestamp + data,previusHash).toString();
}

 const createGenesisBlock = () => {
    return createBlock(0,new Date().toString(),'GenesisBlock','0')
}

 const getLatestBlock = (chain) => {
    return chain[chain.length -1 ];
}

 const addBlock = (chain, newBlock) => {
    const latestBlock = getLatestBlock(chain);
    newBlock.previousHash = latestBlock.hash
    newBlock.hash = calculateHash(
        newBlock.index,
        newBlock.timestamp,
        newBlock.data,
        newBlock.previousHash
        );
        chain.push(newBlock)
}
  const isChainValid = (chain) => {
    for (let i = 0; i < chain.length; i++){
        const currentBlock = chain[i];
        const prevBlock = chain[i - 1];

        if (currentBlock.hash !== calculateHash(
            currentBlock.index,
            currentBlock.timestamp,
            currentBlock.data,
            currentBlock.previousHash
          )) {
            return false;
          }
          if(currentBlock.previousHash !== prevBlock.hash) return false

    }
    return true 

}
export default {
    createBlock,
    calculateHash,
    createGenesisBlock,
    getLatestBlock,
    addBlock,
    isChainValid
  };
