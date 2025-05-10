import { GraphQLClient } from 'graphql-request';
export function getHasuraClient(token) {
  return new GraphQLClient(import.meta.env.VITE_HASURA_URL, {
    headers:{Authorization:`Bearer ${token}`},
  });
}
