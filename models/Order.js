// Import the neccesary modules.
const mongoose = require("mongoose");

// The anime schema used by mongoose.
const OrderSchema = new mongoose.Schema({
  partner_tag : String,
  external_id : String,
  platform    : String,
  amount      : Number,
  delegator   : String,
  validator   : String,
  partner     : String,
  order_id    : String,
  tx_id       : String,
  created_at  : Number     
});

// Create the token model.
const schema = mongoose.model("Order", OrderSchema);
mongoose.set('useFindAndModify', false);

/**
 * A model object for Token token.
 * @type {Token}
 */

module.exports = schema;
