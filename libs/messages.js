
const MESSAGES = {
    EOS_E100001 : {
        code    : 100001,
        msg     : "Failed to get the response from server"
    },

    EOS_E100002 : {
        code    : 100002,
        msg     : "Unknown fullnode server error"
    },

    EOS_E100003 : {
        code    : 100003,
        msg     : "Unexpected response data from server"
    },

    EOS_E100004 : {
        code    : 100004,
        msg     : "Get cpu & net price failed"
    },

    EOS_E100005 : {
        code    : 100005,
        msg     : "Failed to create raw transaction"
    },

    EOS_E100006 : {
        code    : 100006,
        msg     : "This public key already has accounts"
    },

    EOS_E100007 : {
        code    : 100007,
        msg     : "This account name already exists"
    },

    EOS_E100008 : {
        code    : 100008,
        msg     : "Create new account failed"
    },

    EOS_E100009 : {
        code    : 100009,
        msg     : "Create new account campaign has stopped"
    },

    EOS_E100010 : {
        code    : 100010,
        msg     : "Create new account campaign is pending"
    },

    EOS_E100011 : {
        code    : 100011,
        msg     : "Bad request: Account name is required"
    },

    EOS_E100012 : {
        code    : 100012,
        msg     : "Bad request: Account name length must be 12 characters"
    },

    EOS_E100013 : {
        code    : 100013,
        msg     : "Bad request: owner_public_key and active_public_key is required"
    },

    EOS_E100014 : {
        code    : 100014,
        msg     : "Bad request: Block number is required"
    },

    EOS_E100015 : {
        code    : 100015,
        msg     : "Bad request: No raw transaction found"
    },

    EOS_E100016 : {
        code    : 100016,
        msg     : "Bad request: No wif key found"
    },

    EOS_E100017 : {
        code    : 100017,
        msg     : "Bad request: No signed transaction found"
    },

    EOS_E100018 : {
        code    : 100018,
        msg     : "Bad request: Transaction data is invalid"
    },

    EOS_E100019 : {
        code    : 100019,
        msg     : "Bad request: Transaction quantity is invalid"
    },

    EOS_E100020 : {
        code    : 100020,
        msg     : "Bad request: Public key is required"
    },

    EOS_E100021 : {
        code    : 100021,
        msg     : "Bad request: Request Offset is invalid"
    },

    EOS_E100022 : {
        code    : 100022,
        msg     : "Bad request: Request limit is invalid"
    },

    EOS_E100023 : {
        code    : 100023,
        msg     : "Bad request: Trx Id is invalid"
    },

    EOS_E100024 : {
        code    : 100024,
        msg     : "Bad request: Invalid transaction data"
    },

    EOS_E100025 : {
        code    : 100025,
        msg     : "Bad request: This transaction action is unsupported"
    },

    EOS_E100026 : {
        code    : 100026,
        msg     : "Bad request: Invalid delegatebw quantity"
    },

    EOS_E100027 : {
        code    : 100027,
        msg     : "Bad request: Invalid delegatebw net quantity"
    },

    EOS_E100028 : {
        code    : 100028,
        msg     : "Bad request: Invalid delegatebw cpu quantity"
    },

    EOS_E100029 : {
        code    : 100029,
        msg     : "Bad request: Invalid undelegatebw quantity"
    },

    EOS_E100030 : {
        code    : 100030,
        msg     : "Bad request: Invalid undelegatebw net quantity"
    },

    EOS_E100031 : {
        code    : 100031,
        msg     : "Bad request: Invalid undelegatebw cpu quantity"
    },

    EOS_E100032 : {
        code    : 100032,
        msg     : "Bad request: Invalid buyram quantity"
    },

    EOS_E100033 : {
        code    : 100033,
        msg     : "Bad request: transaction is required"
    },

    EOS_E100034 : {
        code    : 100034,
        msg     : "Bad request: available_keys is required"
    },

    EOS_E100035 : {
        code    : 100035,
        msg     : "Bad request: Invalid parameters, 'offset' and 'limit' must be number"
    }
}

module.exports = MESSAGES;
