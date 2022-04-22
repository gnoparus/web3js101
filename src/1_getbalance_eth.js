require('dotenv').config()

async function main() {

    // Network
    const Web3 = require('web3')
    const rpcURL = process.env.RPC_URL
    const web3 = new Web3(rpcURL)

    // // Account
    const acc5_address = process.env.ACC5_ADDRESS
    const acc5_privatekey = process.env.ACC5_PRIVATEKEY
    const acc6_address = process.env.ACC6_ADDRESS
    const acc6_privatekey = process.env.ACC6_PRIVATEKEY

    // // Generate New Account
    // var acc701_account = web3.eth.accounts.create()
    // console.log(acc701_account)
    acc701_privatekey = process.env.ACC701_PRIVATEKEY
    acc701_address = process.env.ACC701_ADDRESS

    // // Gas
    var acc5_balance;
    web3.eth.getBalance(acc5_address, (err, result) => { acc5_balance = web3.utils.fromWei(result, "ether"); console.log("acc5_balance ", acc5_balance) })
    var acc6_balance;
    web3.eth.getBalance(acc6_address, (err, result) => { acc6_balance = web3.utils.fromWei(result, "ether"); console.log("acc6_balance ", acc6_balance) })
    var acc701_balance;
    web3.eth.getBalance(acc701_address, (err, result) => { acc701_balance = web3.utils.fromWei(result, "ether"); console.log("acc701_balance ", acc701_balance) })

    console.log("hello")


}

main()