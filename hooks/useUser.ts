import { gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import userContext from '../context/userContext';

import { IUser } from '../interfaces/users';

const GET_USER = gql`
  query GetConnectedUser {
    getConnectedUser {
      id
      firstname
      lastname
      email
      job
      role
    }
  }
`;

interface IConnectedUser extends IUser {
  token: string;
}

const useUser = (): [IUser | undefined, LazyQueryExecFunction<IUser, OperationVariables>, boolean] => {
  const [user, setUser] = useContext(userContext);

  const [getUser, { error, loading, data }] = useLazyQuery(GET_USER);

  console.log('useUser', data);

  useEffect(() => {
    const connectedUser: IConnectedUser | undefined = data?.getConnectedUser || undefined;

    if (!user && data && connectedUser) {
      const { token, ...rest } = connectedUser;
      setUser(rest);
    }

  }, [data]);

  return [user, getUser, loading];
};

export default useUser;