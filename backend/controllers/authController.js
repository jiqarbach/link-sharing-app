// controllers/authController.js
const { GraphQLClient, gql } = require('graphql-request');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');

// configure Hasura client using admin secret
const hasura = new GraphQLClient(process.env.HASURA_GRAPHQL_ENDPOINT, {
  headers: { 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET }
});

// GraphQL operations
const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    insert_users_one(object: { email: $email, password: $password }) {
      id
      email
    }
  }
`;
const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      email
      password
    }
  }
`;

exports.signup = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    // hash & insert
    const hashed = await hashPassword(password);
    const data = await hasura.request(CREATE_USER, { email, password: hashed });
    const user = data.insert_users_one;

    const token = generateToken(user);
    return res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Signup error:', err);
    // Detect unique constraint violation
    if (err.response?.errors?.[0]?.message.includes('duplicate key value')) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    return res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    // fetch user
    const data = await hasura.request(GET_USER_BY_EMAIL, { email });
    const user = data.users[0];
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // compare
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // issue token
    const token = generateToken(user);
    return res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};
