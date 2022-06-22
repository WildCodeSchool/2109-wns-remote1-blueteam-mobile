import { createContext, Dispatch, SetStateAction } from 'react';

interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    job: string;
    role: string;
}

const userContext = createContext<
  [IUser | undefined, Dispatch<SetStateAction<IUser | undefined>>]
>([undefined, () => undefined]);

export default userContext;