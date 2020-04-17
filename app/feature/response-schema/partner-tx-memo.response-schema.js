const objectMapper = require('object-mapper');

const destObject = {
  id: 'id',
  platform: 'platform',
  memo: 'memo',
  default_flg: 'default_flg',
  created_by: 'updated_by',
  createdAt: 'updated_at',
  partner_updated_by: 'partner_updated_by'
};

module.exports = srcObject => {
  return objectMapper(srcObject, destObject);
};
