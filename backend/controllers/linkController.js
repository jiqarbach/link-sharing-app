// controllers/linkController.js
const { GraphQLClient, gql } = require('graphql-request');

// Helper to build a Hasura client per request
function createHasuraClient(token) {
  return new GraphQLClient(process.env.HASURA_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// GraphQL operations
const CREATE_LINK = gql`
  mutation CreateLink($object: links_insert_input!) {
    insert_links_one(object: $object) {
      id
      title
      url
      platform
      order
    }
  }
`;
const GET_LINKS = gql`
  query GetLinks($user_id: uuid!) {
    links(where: { user_id: { _eq: $user_id } }, order_by: { order: asc }) {
      id
      title
      url
      platform
      order
    }
  }
`;
const UPDATE_LINK = gql`
  mutation UpdateLink($id: uuid!, $changes: links_set_input!) {
    update_links_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      title
      url
      platform
      order
    }
  }
`;
const DELETE_LINK = gql`
  mutation DeleteLink($id: uuid!) {
    delete_links_by_pk(id: $id) {
      id
    }
  }
`;

exports.getLinks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const client = createHasuraClient(token);
    const variables = { user_id: req.user.id };
    const { links } = await client.request(GET_LINKS, variables);
    return res.status(200).json(links);
  } catch (err) {
    console.error('getLinks error', err);
    return res.status(500).json({ error: 'Failed to fetch links' });
  }
};

exports.createLink = async (req, res) => {
  try {
    let { title, url, platform, order } = req.body;

    // Basic normalization
    title = String(title).trim();
    url = String(url).trim();
    platform = String(platform).trim();
    order = parseInt(order, 10) || 0;

    const token = req.headers.authorization.split(' ')[1];
    const client = createHasuraClient(token);

    const object = {
      user_id: req.user.id,
      title,
      url,
      platform,
      order,
    };

    const { insert_links_one } = await client.request(CREATE_LINK, { object });
    return res.status(201).json(insert_links_one);
  } catch (err) {
    console.error('createLink error', err);
    return res.status(500).json({ error: 'Failed to create link' });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, url, platform, order } = req.body;

    title = String(title).trim();
    url = String(url).trim();
    platform = String(platform).trim();
    order = parseInt(order, 10) || 0;

    const token = req.headers.authorization.split(' ')[1];
    const client = createHasuraClient(token);

    const changes = { title, url, platform, order };
    const { update_links_by_pk } = await client.request(UPDATE_LINK, { id, changes });
    return res.status(200).json(update_links_by_pk);
  } catch (err) {
    console.error('updateLink error', err);
    return res.status(500).json({ error: 'Failed to update link' });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const client = createHasuraClient(token);

    await client.request(DELETE_LINK, { id });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('deleteLink error', err);
    return res.status(500).json({ error: 'Failed to delete link' });
  }
};

exports.reorderLinks = async (req, res) => {
  try {
    const { links } = req.body; // expected: [{ id: '...', order: 1 }, ...]

    if (!Array.isArray(links)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const client = createHasuraClient(token);

    // Batch update orders
    await Promise.all(
      links.map(({ id, order }) => {
        const changes = { order: parseInt(order, 10) || 0 };
        return client.request(UPDATE_LINK, { id, changes });
      })
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('reorderLinks error', err);
    return res.status(500).json({ error: 'Failed to reorder links' });
  }
};
