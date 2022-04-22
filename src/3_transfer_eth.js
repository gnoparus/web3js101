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

    // // Gas
    var acc5_balance;
    web3.eth.getBalance(acc5_address, (err, result) => { acc5_balance = web3.utils.fromWei(result, "ether"); console.log("acc5_balance ", acc5_balance) })
    var acc6_balance;
    web3.eth.getBalance(acc6_address, (err, result) => { acc6_balance = web3.utils.fromWei(result, "ether"); console.log("acc6_balance ", acc6_balance) })


    // // Transfer gas
    var amount = '0.01';
    // Build Transaction
    const txObject = {
        to: acc6_address,
        value: web3.utils.toWei(amount, 'ether'),
        gas: '55000',
        gasPrice: web3.utils.toWei('10', 'gwei')
    }

    // Sign and Send Transaction
    const signedTransaction = web3.eth.accounts.signTransaction(txObject, acc5_privatekey);
    signedTransaction.then(signedTx => {
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        sentTx.on("receipt", receipt => {
            console.log("receipt: ", receipt);
            web3.eth.getBalance(acc5_address, (err, result) => { acc5_balance = web3.utils.fromWei(result, "ether"); console.log("acc5_balance ", acc5_balance) })
            web3.eth.getBalance(acc6_address, (err, result) => { acc6_balance = web3.utils.fromWei(result, "ether"); console.log("acc6_balance ", acc6_balance) })
        });

        sentTx.on("error", err => {
            console.log(err.message)
        });

    })


    console.log("hello")


}

main()