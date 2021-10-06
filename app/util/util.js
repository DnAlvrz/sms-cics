

module.exports.createObject = (reqBody) => {
  const data = {};
  for(const key of Object.keys(reqBody)) {
    data[key] = reqBody[key];
  }
  return data;
};


