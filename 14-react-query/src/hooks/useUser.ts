import { useEffect, useState } from "react";
export type User = {
    id: string;
    username: string;
    email: string;
};

export const useUser = () => {
    const [user, setUser] = useState<User>({} as User);
    useEffect(() => {
        const fakeLogin = async () => {
            setTimeout(() => {
                setUser({
                  id: '1',
                  username: 'John Doe',
                  email: 'fake@email.com',
                } as User);
              }, 3000);
        }

        fakeLogin()
    }, [])
      return {
      user,
    };
  };