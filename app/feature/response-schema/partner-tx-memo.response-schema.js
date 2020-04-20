const objectMapper = require('object-mapper');

const destObject = {
  single: {
    id: 'id',
    platform: 'platform',
    memo: 'memo',
    default_flg: 'default_flg',
    updated_by: 'updated_by',
    updatedAt: 'updated_at',
  },
  array: {
    '[].id': '[].id',
    '[].platform': '[].platform',
    '[].memo': '[].memo',
    '[].default_flg': '[].default_flg',
    '[].updated_by': '[].updated_by',
    '[].updatedAt': '[].updated_at',
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