const Model = require("app/model").partner_tx_memos;


(async () => {
  let count = await Model.count();
  if (count == 0) {
    await Model.bulkCreate([{
      id: "5cbe2366-1a55-11ea-978f-2e728ce88125",
      partner_id: "ea47be76-1038-11ea-8d71-362b9e155667",
      platform: "ATOM",
      memo: "Infinito:ATOM"
    },
    {
      id: "7c663902-1afe-11ea-978f-2e728ce88125",
      partner_id: "ea47be76-1038-11ea-8d71-362b9e155667",
      platform: "IRIS",
      memo: "Infinito:IRIS"
    },
    {
      id: "4c9ee254-2d15-11ea-978f-2e728ce88125",
      partner_id: "13172d8e-2d15-11ea-978f-2e728ce88125",
      platform: "IRIS",
      memo: "Salary13"
    },
    {
      id: "63848550-2d15-11ea-978f-2e728ce88125",
      partner_id: "ed483de6-2d14-11ea-978f-2e728ce88125",
      platform: "IRIS",
      memo: "Binary"
    }], {
        returning: true
      });
  }
})();