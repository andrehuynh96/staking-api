const Partner = require("app/model").partners;


(async () => {
  let count = await Partner.count();
  if (count == 0) {
    await Partner.bulkCreate([{
      id: "ea47be76-1038-11ea-8d71-362b9e155667",
      email: "client@infinito.io",
      name: "Infinito",
      partner_type: "CHILD"
    },
    {
      id: "ed483de6-2d14-11ea-978f-2e728ce88125",
      email: "client@binary.io",
      name: "Binary",
      partner_type: "CHILD"
    },
    {
      id: "13172d8e-2d15-11ea-978f-2e728ce88125",
      email: "salary13@ibl.com",
      name: "Salary13",
      partner_type: "CHILD"
    }], {
        returning: true
      });
  }
})();