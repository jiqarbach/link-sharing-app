import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { getHasuraClient } from '../lib/graphqlClient'
import { useAuth } from '../contexts/AuthContext'

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
`

const CREATE_LINK = gql`
  mutation($object: links_insert_input!) {
    insert_links_one(object: $object) {
      id
      title
      url
      platform
      order
    }
  }
`

const UPDATE_LINK = gql`
  mutation($id: uuid!, $changes: links_set_input!) {
    update_links_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      title
      url
      platform
      order
    }
  }
`

const DELETE_LINK = gql`
  mutation($id: uuid!) {
    delete_links_by_pk(id: $id) {
      id
    }
  }
`

export function useLinks() {
  const { token, logout } = useAuth()
  const client = getHasuraClient(token)
  const qc = useQueryClient()
  const userId = JSON.parse(atob(token.split('.')[1])).sub

  const {
    data,
    isError,
    error,
    ...info
  } = useQuery({
    queryKey: ['links'],
    queryFn: () => client.request(GET_LINKS, { user_id: userId }),
    onError: err => {
      console.error("GraphQL error:", err.response?.errors || err.message);
      if (err.response?.status === 401) logout();
    },
  });
  
  const links = data?.links || [];
  

  const createLink = useMutation({
    mutationFn: (newLink) =>
      client.request(CREATE_LINK, {
        object: { ...newLink, user_id: userId },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['links'] }),
  })

  const updateLink = useMutation({
    mutationFn: ({ id, ...changes }) =>
      client.request(UPDATE_LINK, { id, changes }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['links'] }),
  })

  const deleteLink = useMutation({
    mutationFn: (id) => client.request(DELETE_LINK, { id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['links'] }),
  })

  return { links, createLink, updateLink, deleteLink, ...info }
}
