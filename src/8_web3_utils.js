require('dotenv').config()

async function main() {

    // Network
    const Web3 = require('web3')
    const rpcURL = process.env.RPC_URL
    const web3 = new Web3(rpcURL)

    // Get Gas Price
    web3.eth.getGasPrice().then(result => {
        console.log("Gas Price ", web3.utils.fromWei(result, "ether"))
    })

    // // SHA3
    const sha3_text = web3.utils.sha3("One Two Three Four Moment Teapot")
    console.log("sha3_text      ", sha3_text)

    // // keccak256
    const keccak256_text = web3.utils.keccak256("One Two Three Four Moment Teapot")
    console.log("keccak256_text ", keccak256_text)

    // // keccak256
    const soliditySha3_text = web3.utils.soliditySha3("One Two Three Four Moment Teapot")
    console.log("soliditySha3_text ", soliditySha3_text)

    // // keccak256
    const randomHex_text = web3.utils.randomHex(32)
    console.log("randomHex_text ", randomHex_text)

    // // // Underscore.js
    // console.log("Underscore.js ", web3.utils._())


    console.log("hello")


}

main()