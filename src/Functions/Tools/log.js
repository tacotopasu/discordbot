const fs = require("fs");

module.exports = (client) => {
  client.log = async (con, log) => {
    content = `26 // ${con} at ${Date()}`;
    if (log == true) console.log(`${content}`);
    fs.writeFile("./logs.txt", `${content}\n`, { flag: 'a+' }, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return 0;
  };
};
