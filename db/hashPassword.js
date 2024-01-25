const bcrypt = require('bcrypt');

bcrypt.hash('password123', 10, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash);
});
