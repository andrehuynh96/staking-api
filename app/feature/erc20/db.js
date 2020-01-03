const db = require("app/model").sequelize;

async function getDepositByDepositorAddr(depositorAddr, offset, limit) {
    var q = `
        SELECT 
            d.block_number,
            d.block_hash,
            d.transaction_index,
            d.deposit_id,
            d.deposit_id,
            d.token_addr,
            d.depositor_addr,
            d.amount,
            d.duration,
            d.memo,
            w.block_number as "withdrawData_block_number",
            w.block_hash as "withdrawData_blockHash",
            w.transaction_index as "withdrawData_transactionIndex",
            w.transaction_hash as "withdrawData_transactionHash",
            w.log_index as "withdrawData_logIndex",
            w.deposit_id as "withdrawData_depositId",
            w."token_addr" as "withdrawData_token_addr",
            w.depositor_addr as "withdrawData_depositor_addr",
            w.recipient_addr as "withdrawData_recipient_addr",
            w."amount" as "withdrawData_amount"               
        FROM deposits as d
        LEFT JOIN withdraws as w
            ON d.deposit_id = w.deposit_id
        WHERE d.depositor_addr = '${depositorAddr}'
        ORDER BY d.block_number DESC,
                d.transaction_index DESC,
                d.log_index DESC
        OFFSET ${offset}
        LIMIT ${limit}
    `;
    var rs = await db.query(q, { type: db.QueryTypes.SELECT });
    if (rs) {
        
        rs = _formatWithdrawData(rs);
    }
    return rs;
}

function _formatWithdrawData(data) {
    var prefix = 'withdrawData_'
    var transformed = data.map((row) => {
        var withdraw = {}
        for (var k in row) {
            if (k.startsWith("withdrawData_")) {
                withdraw[k.substr(prefix.length)] = row[k];
                delete row[k];
            }
        }
        row.withdraw = withdraw;
        if (!row.withdraw.block_number) {
            row.withdraw = null
        }
        return row;
    });

    return transformed;
}

module.exports = {
    getDepositByDepositorAddr: getDepositByDepositorAddr
}