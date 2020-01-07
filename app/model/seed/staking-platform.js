const Model = require("app/model").staking_platforms;


(async () => {
  let count = await Model.count();
  if (count == 0) {
    await Model.bulkCreate([{
      id: "36b7f440-1a3b-11ea-978f-2e728ce88125",
      name: "COSMOS",
      symbol: "ATOM",
      icon: "https://static.chainservices.info/staking/platforms/cosmos.png",
      order_index: 1,
      estimate_earn_per_year: 10,
      lockup_unvote: 21,
      lockup_unvote_unit: "DAY",
      payout_reward: 0,
      payout_reward_unit: "DAY",
      confirmation_block: 5,
      staking_type: "NATIVE"
    },
    {
      id: "482a12ce-1a3d-11ea-978f-2e728ce88125",
      name: "IRISnet",
      symbol: "IRIS",
      icon: "https://static.chainservices.info/staking/platforms/iris.png",
      order_index: 0,
      estimate_earn_per_year: 12,
      lockup_unvote: 21,
      lockup_unvote_unit: "DAY",
      payout_reward: 0,
      payout_reward_unit: "DAY",
      confirmation_block: 5,
      staking_type: "NATIVE"
    }
    ], {
        returning: true
      });
  }
})();