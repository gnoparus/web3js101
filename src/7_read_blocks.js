require('dotenv').config()

async function main() {

    // Network
    const Web3 = require('web3')
    const rpcURL = process.env.RPC_URL
    const web3 = new Web3(rpcURL)

    // Get Latest Block
    web3.eth.getBlock('latest').then((result) => { console.log("Latest Block ", result, result.number, result.hash) })
    web3.eth.getBlockNumber().then((result) => { console.log("Latest Block Number ", result) })

    // Get Specific Block
    web3.eth.getBlock('0x330d17f87dcfbe932d771f8bf8c1c55f2af6f373ed98d4944f320f5604259409').then((result) => { console.log("Block 0x330d17f8.. ", result, result.number, result.hash) })
    web3.eth.getBlock(10552254).then((result) => { console.log("Get Block #10552254 ", result) })
    web3.eth.getBlockTransactionCount(10552254).then((result) => { console.log("No. of Tx in Block #10552254 ", result) })

    // Get Specific Tx from Specific Block
    web3.eth.getTransactionFromBlock(10552254, 8).then((result) => { console.log("Tx #8 in Block #10552254 ", result) })



    console.log("hello")


}

main()