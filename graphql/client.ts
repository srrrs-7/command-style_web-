import { GraphQLClient } from 'graphql-request';
import { GetAdminCookie, GetCookie } from 'utils/cookie';

// react_query parameter  -> api middleware branch
// users client
export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_END_POINT}`, {
    // cookie
    credentials: 'include',
    mode: 'cors',
});
// admin client
export const adminClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_ADMIN_END_POINT}`, {
    // cookie
    credentials: 'include',
    mode: 'cors',
});

export const option = {
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    // onSettled: () => {
    //     queryClient?.invalidateQueries(["RepositoryNameQuery"]);
    // },
};

type Headers = {
    authorization: string;
};

export function NewAdminHeader(): Headers {
    const token = GetAdminCookie();
    const headers: Headers = {
        authorization: `Bearer ${token}`,
    };
    return headers;
}

export function NewHeader(): Headers {
    const token = GetCookie();
    const headers: Headers = {
        authorization: `Bearer ${token}`,
    };
    return headers;
}
