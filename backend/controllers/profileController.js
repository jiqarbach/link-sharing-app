// controllers/profileController.js
const { GraphQLClient, gql } = require('graphql-request');

// Helper to get a Hasura client per request
function createHasuraClient(token) {
  return new GraphQLClient(process.env.HASURA_GRAPHQL_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// GraphQL operations
const GET_PROFILE = gql`
  query GetProfile($user_id: uuid!) {
    profiles_by_pk(user_id: $user_id) {
      user_id
      first_name
      last_name
      email
      avatar
    }
  }
`;

const UPSERT_PROFILE = gql`
  mutation UpsertProfile($object: profiles_insert_input!) {
    insert_profiles_one(
      object: $object
      on_conflict: {
        constraint: profiles_pkey
        update_columns: [first_name, last_name, email, avatar]
      }
    ) {
      user_id
      first_name
      last_name
      email
      avatar
    }
  }
`;

exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const client = createHasuraClient(token);
    const { profiles_by_pk: profile } = await client.request(GET_PROFILE, {
      user_id: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.upsertProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    let { first_name, last_name, email, avatar } = req.body;

    // Basic validation & normalization
    first_name = String(first_name || '').trim();
    last_name  = String(last_name  || '').trim();
    email      = String(email      || '').trim().toLowerCase();

    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: 'First name and last name are required' });
    }

    const client = createHasuraClient(token);
    const object = {
      user_id:  req.user.id,
      first_name,
      last_name,
      email: email || null,
      avatar: avatar?.trim() || null,
    };

    const { insert_profiles_one: profile } = await client.request(
      UPSERT_PROFILE,
      { object }
    );

    return res.status(200).json(profile);
  } catch (err) {
    console.error('upsertProfile error', err);
    return res.status(500).json({ error: 'Failed to save profile' });
  }
};
