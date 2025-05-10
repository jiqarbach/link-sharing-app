const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log("ENV key length:", process.env.JWT_SECRET.length);
console.log("Expected:", "@N2Twg^#URQ$Ja%tpfmMj%sm@N2Twg^#URQ$Ja%tpfmMj%sm".length);
console.log("Equal:", process.env.JWT_SECRET === "@N2Twg^#URQ$Ja%tpfmMj%sm@N2Twg^#URQ$Ja%tpfmMj%sm");

function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.id.toString()
    },
  };
  return jwt.sign(
    payload,
    "supersecret123supersecret123supersecret123",
    { algorithm: 'HS256', expiresIn: '7d' }
  );
}

module.exports = generateToken;
