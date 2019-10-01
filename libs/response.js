class Response {
    /**
     * Success response
     *
     * @param {any} data
     * @returns
     * @memberof BaseApiController
     */
    static ok(data, msg) {
        var result = {
            "cd": 0
        };

        if ( msg ) {
            result.msg = msg;
        }

        if ( data != null) {
            result.data = data;
        }

        return result;
    }

    /**
     * Fail response
     *
     * @param {any} data
     * @param {any} param
     * @returns
     * @memberof BaseApiController
     */
    static fail(data) {
        console.log("data = ", data)
        // check to see if this error is from fullnode
        if (data && data.message) {
            let result = {
                cd   : 1,
                msg  : "",
                data : data.message
            }

            return result
        }

        // check to see if the error is from our defined messages
        if (data && data.code && data.msg) {
            let result = {
                cd  : data.code,
                msg : data.msg,
                data: {}
            }

            return result
        }

        let result = {
            cd      : 1,
            msg     : "",
            data    : {}
        }

        return result
    }

}

module.exports = Response;
