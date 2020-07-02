const objectMapper = require('object-mapper');

const destObject = {
  single: {
    id: 'id',
    address: 'address',
    partner_id: 'partner_id',
    block_from: 'block_from',
    block_to: 'block_to',
    total_vote: 'total_vote',
    contribute_vote: 'contribute_vote',
    amount: 'amount',
    status: 'status',
    distribute_commission_id: 'distribute_commission_id',
    calculate_reward: 'calculate_reward',
    updatedAt: 'updated_at',
    createdAt: 'createdAt',
  },
  array: {
    '[].id': 'id',
    '[].address': 'address',
    '[].partner_id': 'partner_id',
    '[].block_from': 'block_from',
    '[].block_to': 'block_to',
    '[].total_vote': 'total_vote',
    '[].contribute_vote': 'contribute_vote',
    '[].amount': 'amount',
    '[].status': 'status',
    '[].distribute_commission_id': 'distribute_commission_id',
    '[].calculate_reward': 'calculate_reward',
    '[].updatedAt': 'updated_at',
    '[].createdAt': 'createdAt',
  }
};

module.exports = srcObject => {
  if (Array.isArray(srcObject)) {
    return objectMapper(srcObject, destObject.array);
  }
  else {
    return objectMapper(srcObject, destObject.single);
  }
}; 