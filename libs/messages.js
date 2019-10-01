
const MESSAGES = {
    TRX_E100001 : {
        code    : 100001,
        msg     : "Bad request: No signed transaction found"
    },

    TRX_E100002 : {
        code    : 100002,
        msg     : "Transaction expired"
    },

    TRX_E100003 : {
        code    : 100003,
        msg     : "Failed to get the response from server"
    },

    TRX_E100004 : {
        code    : 100004,
        msg     : "Unknown fullnode server error"
    },

    ONT_E100001 : {
        code    : 200001,
        msg     : "Failed to get the response from server"
    },

    COSMOS_E100001 : {
		code    : 300001,
		msg     : "Bad request: No signed transaction found"
	},
}

module.exports = MESSAGES;
