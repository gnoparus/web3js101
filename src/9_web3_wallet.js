require('dotenv').config()

async function main() {

    // Network
    const Web3 = require('web3')
    const web3 = new Web3()

    // // Create Account
    acc201 = web3.eth.accounts.create()
    console.log("acc201 ", acc201)
    console.log("privateKey ", acc201.privateKey)

    // // Encrypt PrivateKey
    password = "foobar01234567890123456789012345678901234567890123456789"
    encryptedPK = web3.eth.accounts.encrypt(acc201.privateKey, password)
    console.log("encryptedPK ", encryptedPK)

    // // Decrypt PrivateKey
    decryptedPK = web3.eth.accounts.decrypt(encryptedPK, password)
    console.log("decryptedPK ", decryptedPK)


    // // Create Wallet with 0 accounts
    web3.eth.accounts.wallet.create()
    console.log("wallet ", web3.eth.accounts.wallet)
    // Create 3 accounts into wallet
    web3.eth.accounts.wallet.create(3, "entropy012345678901234567890123456789")
    // web3.eth.accounts.wallet.create(3, web3.utils.randomHex(32))
    console.log("wallet + 3 accounts", web3.eth.accounts.wallet)


    // Encrypt wallet
    encrypted_wallet = web3.eth.accounts.wallet.encrypt(password)
    console.log("encrypted_wallet ", encrypted_wallet)

    // Decrypt wallet
    decrypted_wallet = web3.eth.accounts.wallet.decrypt(encrypted_wallet, password)
    console.log("decrypted_wallet ", decrypted_wallet)



    console.log("hello")


}

main()