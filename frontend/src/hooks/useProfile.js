import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getHasuraClient } from '../lib/graphqlClient';
import { useAuth } from '../contexts/AuthContext';

const GET_PROFILE = gql`
  query($user_id:uuid!){profiles_by_pk(user_id:$user_id){user_id first_name last_name email avatar}}
`;
const UPSERT_PROFILE = gql`
  mutation($object:profiles_insert_input!){insert_profiles_one(object:$object,on_conflict:{constraint:profiles_pkey,update_columns:[first_name,last_name,email,avatar]}){user_id first_name last_name email avatar}}
`;

export function useProfile() {
  const { token, logout } = useAuth();
  const client = getHasuraClient(token);
  const qc = useQueryClient();
  const userId = JSON.parse(atob(token.split('.')[1])).sub;

  const { data, ...info } = useQuery({
    queryKey: ['profile'],
    queryFn: () => client.request(GET_PROFILE, { user_id: userId }),
    onError: (err) => {
      if (err.response?.status === 401) logout();
    },
  });

  const profile = data?.profiles_by_pk || null;

  const upsertProfile = useMutation({
    mutationFn: (dt) => client.request(UPSERT_PROFILE, {
      object: { ...dt, user_id: userId },
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });

  return { profile, upsertProfile, ...info };
}
