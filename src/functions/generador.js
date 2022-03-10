const generator = () => {
  let code = "";
  const possible =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 5; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
};

module.exports = generator;
