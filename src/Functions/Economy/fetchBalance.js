const Balance = require("../../Models/balance");
const { Types } = require("mongoose");

module.exports = (client) => {
  client.fetchBalance = async (UserId) => {
    let storedBalance = await Balance.findOne({ userId: UserId });
    if (!storedBalance) {
      storedBalance = await new Balance({
        _id: Types.ObjectId(),
        userId: UserId,
      });

      await storedBalance
        .save()
        .then(async (balance) => {
          console.log(`26 // [Balance] : Balance created for User ID ${balance.userId}`);
        })
        .catch(console.error);
      return storedBalance;
    } else return storedBalance;
  };
};
