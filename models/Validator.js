// Import the neccesary modules.
const mongoose = require("mongoose");

// The anime schema used by mongoose.
const ValidatorSchema = new mongoose.Schema({
  name            : String,
  website         : String,
  rank            : Number,
  address         : String,
  public_key      : String,
  platform        : String,
  votes           : Number,
  commission      : String,
  partner         : {
    type          : Boolean,
    default       : false
  },
  jailed          : Boolean,
});

// Create the token model.
const schema = mongoose.model("Validator", ValidatorSchema);
mongoose.set('useFindAndModify', false);

/**
 * A model object for Token token.
 * @type {Token}
 */

module.exports = schema;
