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


    // // Instantiate Contract
    const contract_address = "0xA26AD57a9a92a4af2920Eec8b61C06bb2692EA58"
    const contract_abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

    var contract = new web3.eth.Contract(contract_abi, contract_address)

    var acc5_contract_balance = contract.methods.balanceOf(acc5_address).call();
    var acc6_contract_balance = contract.methods.balanceOf(acc6_address).call();
    console.log("acc5_contract_balance, acc6_contract_balance ", web3.utils.fromWei(await acc5_contract_balance, "ether"), web3.utils.fromWei(await acc6_contract_balance, "ether"));

    // // Contract functions

    const data = contract.methods.transfer(acc6_address, web3.utils.toWei("50000", "ether")).encodeABI();
    console.log("data ", data);

    // Build Transaction
    const txObject = {
        gas: '80000',
        gasPrice: web3.utils.toWei('10', 'gwei'),
        to: contract_address,
        data: data
    }
    console.log("txObject ", txObject);

    // Sign and Send Transaction
    const signedTransaction = web3.eth.accounts.signTransaction(txObject, acc5_privatekey);
    signedTransaction.then(signedTx => {
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
        sentTx.on("receipt", receipt => {
            console.log("receipt: ", receipt);
            contract.methods.balanceOf(acc5_address).call().then((result) => { acc5_contract_balance = web3.utils.fromWei(result, "ether"); console.log("acc5_contract_balance ", acc5_contract_balance) })
            contract.methods.balanceOf(acc6_address).call().then((result) => { acc6_contract_balance = web3.utils.fromWei(result, "ether"); console.log("acc6_contract_balance ", acc6_contract_balance) })
        });

        sentTx.on("error", err => {
            console.log(err.message)
        });

    })



    console.log("hello")


}

main()