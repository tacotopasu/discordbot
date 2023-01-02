const Balance = require("../../Models/balance");

module.exports = (client) => {
  client.getBalance = async (UserId) => {
    const storedBalance = await Balance.findOne({ userId: UserId });
    if (!storedBalance) return false;
    else return storedBalance;
  };
};
