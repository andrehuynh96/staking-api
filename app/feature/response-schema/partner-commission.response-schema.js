const objectMapper = require('object-mapper');

const destObject = {
  id: 'id',
  platform: 'platform',
  commission: 'commission',
  reward_address: 'reward_address',
  staking_platform_id: 'staking_platform_id',
  updated_by: 'updated_by',
  updatedAt: 'updated_at',
  partner_updated_by: 'partner_updated_by'
};

module.exports = srcObject => {
  return objectMapper(srcObject, destObject);
};
