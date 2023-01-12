/* eslint-disable */ // @ts-ignore
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(
    client: GraphQLClient,
    query: string,
    variables?: TVariables,
    requestHeaders?: RequestInit['headers'],
) {
    return async (): Promise<TData> =>
        client.request({
            // @ts-ignore
            document: query,
            variables,
            requestHeaders,
        });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Byte: any;
    Time: any;
    UUID: any;
};

export type Code = Node & {
    __typename?: 'Code';
    access: Scalars['Int'];
    code: Scalars['String'];
    created_at: Scalars['Time'];
    description: Scalars['String'];
    id: Scalars['ID'];
    img: Scalars['Byte'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']>;
    tags: Array<Scalars['String']>;
    updated_at: Scalars['Time'];
    user_id: Scalars['Int'];
    username: Scalars['String'];
};

export type Code_With_CollectionId = Node & {
    __typename?: 'Code_with_CollectionId';
    access: Scalars['Int'];
    code: Scalars['String'];
    collection_id: Scalars['Int'];
    created_at: Scalars['Time'];
    description: Scalars['String'];
    id: Scalars['ID'];
    img: Scalars['Byte'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']>;
    tags: Array<Scalars['String']>;
    updated_at: Scalars['Time'];
    user_id: Scalars['Int'];
    username: Scalars['String'];
};

export type Collection = Node & {
    __typename?: 'Collection';
    code_id: Scalars['Int'];
    id: Scalars['ID'];
    user_id: Scalars['Int'];
};

export type LoginUserResponse = Node & {
    __typename?: 'LoginUserResponse';
    OK: Scalars['Boolean'];
    id: Scalars['ID'];
    user_id: Scalars['Int'];
    username: Scalars['String'];
};

export type Media = Node & {
    __typename?: 'Media';
    contents: Scalars['String'];
    created_at: Scalars['Time'];
    id: Scalars['ID'];
    img: Scalars['Byte'];
    title: Scalars['String'];
    updated_at: Scalars['Time'];
};

export type Mutation = {
    __typename?: 'Mutation';
    adminCreateCode: MutationResponse;
    createAdminCollection: MutationResponse;
    createAdminToken: Scalars['String'];
    createAdminUser: MutationResponse;
    createCode: MutationResponse;
    createCollection: MutationResponse;
    createMedia: MutationResponse;
    createToken: Scalars['String'];
    createUser: MutationResponse;
    deleteCode: MutationResponse;
    deleteCollection: MutationResponse;
    deleteMedia: MutationResponse;
    deleteUser: MutationResponse;
    getAdminUser: AdminUserResponse;
    getCollection: Code_With_CollectionId;
    getMedia: Media;
    loginUser: LoginUserResponse;
    updateAccess: MutationResponse;
    updateCodes: MutationResponse;
    updateMedia: MutationResponse;
    updateStar: MutationResponse;
    updateUser: MutationResponse;
};

export type MutationAdminCreateCodeArgs = {
    access: Scalars['Int'];
    code: Scalars['String'];
    description: Scalars['String'];
    img: Scalars['Byte'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']>;
    tags: Array<Scalars['String']>;
    username: Scalars['String'];
};

export type MutationCreateAdminCollectionArgs = {
    code_id: Scalars['Int'];
    user_id: Scalars['Int'];
};

export type MutationCreateAdminTokenArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationCreateAdminUserArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationCreateCodeArgs = {
    access: Scalars['Int'];
    code: Scalars['String'];
    description: Scalars['String'];
    img: Scalars['Byte'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']>;
    tags: Array<Scalars['String']>;
};

export type MutationCreateCollectionArgs = {
    code_id: Scalars['Int'];
};

export type MutationCreateMediaArgs = {
    contents: Scalars['String'];
    img: Scalars['Byte'];
    title: Scalars['String'];
};

export type MutationCreateTokenArgs = {
    username: Scalars['String'];
};

export type MutationCreateUserArgs = {
    date_of_birth: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
    sex: Scalars['String'];
    username: Scalars['String'];
};

export type MutationDeleteCodeArgs = {
    id: Scalars['Int'];
};

export type MutationDeleteCollectionArgs = {
    id: Scalars['Int'];
};

export type MutationDeleteMediaArgs = {
    id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
    username: Scalars['String'];
};

export type MutationGetAdminUserArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationGetCollectionArgs = {
    id: Scalars['Int'];
};

export type MutationGetMediaArgs = {
    id: Scalars['Int'];
};

export type MutationLoginUserArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type MutationUpdateAccessArgs = {
    access: Scalars['Int'];
    id: Scalars['Int'];
};

export type MutationUpdateCodesArgs = {
    code: Scalars['String'];
    description: Scalars['String'];
    id: Scalars['Int'];
    img: Scalars['Byte'];
    performance: Scalars['String'];
    tags: Array<Scalars['String']>;
};

export type MutationUpdateMediaArgs = {
    contents: Scalars['String'];
    id: Scalars['ID'];
    img: Scalars['Byte'];
    title: Scalars['String'];
};

export type MutationUpdateStarArgs = {
    code_id: Scalars['Int'];
};

export type MutationUpdateUserArgs = {
    email: Scalars['String'];
    updateName: Scalars['String'];
    username: Scalars['String'];
};

export type MutationResponse = Node & {
    __typename?: 'MutationResponse';
    id: Scalars['ID'];
    is_error: Scalars['Boolean'];
    message: Scalars['String'];
};

export type Node = {
    id: Scalars['ID'];
};

export type Query = {
    __typename?: 'Query';
    GetAllCodesByKeyword: Array<Code>;
    GetAllCodesSortedAccess: Array<Code>;
    GetAllCodesSortedStar: Array<Code>;
    getAllCodes: Array<Code>;
    getAllCodesByTag: Array<Code>;
    getAllCollection: Array<Code_With_CollectionId>;
    getAllCollectionBySearch: Array<Code_With_CollectionId>;
    getAllMedia: Array<Maybe<Media>>;
    getAllOwnCodes: Array<Code>;
    getCode: Code;
};

export type QueryGetAllCodesByKeywordArgs = {
    keyword: Scalars['String'];
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllCodesSortedAccessArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllCodesSortedStarArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllCodesArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllCodesByTagArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
    sortBy: SortBy;
    tags: Array<InputMaybe<Scalars['String']>>;
};

export type QueryGetAllCollectionArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllCollectionBySearchArgs = {
    keyword: Scalars['String'];
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllMediaArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetAllOwnCodesArgs = {
    limit: Scalars['Int'];
    skip: Scalars['Int'];
};

export type QueryGetCodeArgs = {
    id: Scalars['Int'];
};

export enum SortBy {
    Asc = 'ASC',
    Desc = 'DESC',
}

export type User = Node & {
    __typename?: 'User';
    created_at: Scalars['Time'];
    date_of_birth: Scalars['String'];
    email: Scalars['String'];
    id: Scalars['ID'];
    password: Scalars['String'];
    sex: Scalars['String'];
    updated_at: Scalars['Time'];
    username: Scalars['String'];
};

export type AdminUser = Node & {
    __typename?: 'adminUser';
    id: Scalars['ID'];
    password: Scalars['String'];
    username: Scalars['String'];
};

export type AdminUserResponse = Node & {
    __typename?: 'adminUserResponse';
    id: Scalars['ID'];
    is_password: Scalars['Boolean'];
    is_username: Scalars['Boolean'];
};

export type CreateAdminUserMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type CreateAdminUserMutation = {
    __typename?: 'Mutation';
    createAdminUser: { __typename?: 'MutationResponse'; is_error: boolean; message: string };
};

export type GetAdminUserMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type GetAdminUserMutation = {
    __typename?: 'Mutation';
    getAdminUser: { __typename?: 'adminUserResponse'; is_username: boolean; is_password: boolean };
};

export type GetAllCodesQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCodesQuery = {
    __typename?: 'Query';
    getAllCodes: Array<{
        __typename?: 'Code';
        id: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type CreateCodeMutationVariables = Exact<{
    code: Scalars['String'];
    img: Scalars['Byte'];
    description: Scalars['String'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']> | Scalars['Int'];
    tags: Array<Scalars['String']> | Scalars['String'];
    access: Scalars['Int'];
}>;

export type CreateCodeMutation = { __typename?: 'Mutation'; createCode: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type GetCodeQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type GetCodeQuery = {
    __typename?: 'Query';
    getCode: {
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    };
};

export type GetAllOwnCodesQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllOwnCodesQuery = {
    __typename?: 'Query';
    getAllOwnCodes: Array<{
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type GetAllCodesByTagsQueryVariables = Exact<{
    tags: Array<Scalars['String']> | Scalars['String'];
    sortBy: SortBy;
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCodesByTagsQuery = {
    __typename?: 'Query';
    getAllCodesByTag: Array<{
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type GetAllCodesByKeywordQueryVariables = Exact<{
    keyword: Scalars['String'];
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCodesByKeywordQuery = {
    __typename?: 'Query';
    GetAllCodesByKeyword: Array<{
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type GetAllCodesSortedStarQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCodesSortedStarQuery = {
    __typename?: 'Query';
    GetAllCodesSortedStar: Array<{
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type GetAllCodesSortedAccessQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCodesSortedAccessQuery = {
    __typename?: 'Query';
    GetAllCodesSortedAccess: Array<{
        __typename?: 'Code';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    }>;
};

export type UpdateCodeMutationVariables = Exact<{
    id: Scalars['Int'];
    code: Scalars['String'];
    img: Scalars['Byte'];
    description: Scalars['String'];
    performance: Scalars['String'];
    tags: Array<Scalars['String']> | Scalars['String'];
}>;

export type UpdateCodeMutation = { __typename?: 'Mutation'; updateCodes: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type UpdateAccessMutationVariables = Exact<{
    id: Scalars['Int'];
    access: Scalars['Int'];
}>;

export type UpdateAccessMutation = { __typename?: 'Mutation'; updateAccess: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type UpdateStarMutationVariables = Exact<{
    code_id: Scalars['Int'];
}>;

export type UpdateStarMutation = { __typename?: 'Mutation'; updateStar: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type DeleteCodeMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteCodeMutation = { __typename?: 'Mutation'; deleteCode: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type GetAllCollectionQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCollectionQuery = {
    __typename?: 'Query';
    getAllCollection: Array<{
        __typename?: 'Code_with_CollectionId';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        collection_id: number;
        user_id: number;
    }>;
};

export type GetAllCollectionBySearchQueryVariables = Exact<{
    keyword: Scalars['String'];
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllCollectionBySearchQuery = {
    __typename?: 'Query';
    getAllCollectionBySearch: Array<{
        __typename?: 'Code_with_CollectionId';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        collection_id: number;
        user_id: number;
    }>;
};

export type CreateAdminCollectionMutationVariables = Exact<{
    user_id: Scalars['Int'];
    code_id: Scalars['Int'];
}>;

export type CreateAdminCollectionMutation = {
    __typename?: 'Mutation';
    createAdminCollection: { __typename?: 'MutationResponse'; is_error: boolean; message: string };
};

export type CreateCollectionMutationVariables = Exact<{
    code_id: Scalars['Int'];
}>;

export type CreateCollectionMutation = {
    __typename?: 'Mutation';
    createCollection: { __typename?: 'MutationResponse'; is_error: boolean; message: string };
};

export type GetCollectionMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type GetCollectionMutation = {
    __typename?: 'Mutation';
    getCollection: {
        __typename?: 'Code_with_CollectionId';
        id: string;
        username: string;
        code: string;
        img: any;
        description: string;
        performance: string;
        star: Array<number>;
        tags: Array<string>;
        created_at: any;
        updated_at: any;
        access: number;
        user_id: number;
    };
};

export type DeleteCollectionMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteCollectionMutation = {
    __typename?: 'Mutation';
    deleteCollection: { __typename?: 'MutationResponse'; is_error: boolean; message: string };
};

export type GetAllMediaQueryVariables = Exact<{
    limit: Scalars['Int'];
    skip: Scalars['Int'];
}>;

export type GetAllMediaQuery = {
    __typename?: 'Query';
    getAllMedia: Array<{ __typename?: 'Media'; id: string; title: string; contents: string; img: any; created_at: any; updated_at: any } | null>;
};

export type CreateMediaMutationVariables = Exact<{
    title: Scalars['String'];
    contents: Scalars['String'];
    img: Scalars['Byte'];
}>;

export type CreateMediaMutation = { __typename?: 'Mutation'; createMedia: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type UpdateMediaMutationVariables = Exact<{
    id: Scalars['ID'];
    title: Scalars['String'];
    contents: Scalars['String'];
    img: Scalars['Byte'];
}>;

export type UpdateMediaMutation = { __typename?: 'Mutation'; updateMedia: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type GetMediaMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type GetMediaMutation = {
    __typename?: 'Mutation';
    getMedia: { __typename?: 'Media'; id: string; title: string; contents: string; img: any; created_at: any; updated_at: any };
};

export type DeleteMediaMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type DeleteMediaMutation = { __typename?: 'Mutation'; deleteMedia: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type CreateTokenMutationVariables = Exact<{
    username: Scalars['String'];
}>;

export type CreateTokenMutation = { __typename?: 'Mutation'; createToken: string };

export type CreateAdminTokenMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type CreateAdminTokenMutation = { __typename?: 'Mutation'; createAdminToken: string };

export type AdminCreateCodeMutationVariables = Exact<{
    username: Scalars['String'];
    code: Scalars['String'];
    img: Scalars['Byte'];
    description: Scalars['String'];
    performance: Scalars['String'];
    star: Array<Scalars['Int']> | Scalars['Int'];
    tags: Array<Scalars['String']> | Scalars['String'];
    access: Scalars['Int'];
}>;

export type AdminCreateCodeMutation = {
    __typename?: 'Mutation';
    adminCreateCode: { __typename?: 'MutationResponse'; is_error: boolean; message: string };
};

export type CreateUserMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
    email: Scalars['String'];
    sex: Scalars['String'];
    date_of_birth: Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'Mutation'; createUser: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export type LoginUserMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginUserMutation = {
    __typename?: 'Mutation';
    loginUser: { __typename?: 'LoginUserResponse'; user_id: number; username: string; OK: boolean };
};

export type DeleteUserMutationVariables = Exact<{
    username: Scalars['String'];
}>;

export type DeleteUserMutation = { __typename?: 'Mutation'; deleteUser: { __typename?: 'MutationResponse'; is_error: boolean; message: string } };

export const CreateAdminUserDocument = `
    mutation createAdminUser($username: String!, $password: String!) {
  createAdminUser(username: $username, password: $password) {
    is_error
    message
  }
}
    `;
export const useCreateAdminUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateAdminUserMutation, TError, CreateAdminUserMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateAdminUserMutation, TError, CreateAdminUserMutationVariables, TContext>(
        ['createAdminUser'],
        (variables?: CreateAdminUserMutationVariables) =>
            fetcher<CreateAdminUserMutation, CreateAdminUserMutationVariables>(client, CreateAdminUserDocument, variables, headers)(),
        options,
    );
export const GetAdminUserDocument = `
    mutation getAdminUser($username: String!, $password: String!) {
  getAdminUser(username: $username, password: $password) {
    is_username
    is_password
  }
}
    `;
export const useGetAdminUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<GetAdminUserMutation, TError, GetAdminUserMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<GetAdminUserMutation, TError, GetAdminUserMutationVariables, TContext>(
        ['getAdminUser'],
        (variables?: GetAdminUserMutationVariables) =>
            fetcher<GetAdminUserMutation, GetAdminUserMutationVariables>(client, GetAdminUserDocument, variables, headers)(),
        options,
    );
export const GetAllCodesDocument = `
    query getAllCodes($limit: Int!, $skip: Int!) {
  getAllCodes(limit: $limit, skip: $skip) {
    id
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllCodesQuery = <TData = GetAllCodesQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCodesQueryVariables,
    options?: UseQueryOptions<GetAllCodesQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCodesQuery, TError, TData>(
        ['getAllCodes', variables],
        fetcher<GetAllCodesQuery, GetAllCodesQueryVariables>(client, GetAllCodesDocument, variables, headers),
        options,
    );

useGetAllCodesQuery.getKey = (variables: GetAllCodesQueryVariables) => ['getAllCodes', variables];
export const useInfiniteGetAllCodesQuery = <TData = GetAllCodesQuery, TError = unknown>(
    pageParamKey: keyof GetAllCodesQueryVariables,
    client: GraphQLClient,
    variables: GetAllCodesQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCodesQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCodesQuery, TError, TData>(
        ['getAllCodes.infinite', variables],
        (metaData) =>
            fetcher<GetAllCodesQuery, GetAllCodesQueryVariables>(
                client,
                GetAllCodesDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCodesQuery.getKey = (variables: GetAllCodesQueryVariables) => ['getAllCodes.infinite', variables];
export const CreateCodeDocument = `
    mutation createCode($code: String!, $img: Byte!, $description: String!, $performance: String!, $star: [Int!]!, $tags: [String!]!, $access: Int!) {
  createCode(
    code: $code
    img: $img
    description: $description
    performance: $performance
    star: $star
    tags: $tags
    access: $access
  ) {
    is_error
    message
  }
}
    `;
export const useCreateCodeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateCodeMutation, TError, CreateCodeMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateCodeMutation, TError, CreateCodeMutationVariables, TContext>(
        ['createCode'],
        (variables?: CreateCodeMutationVariables) =>
            fetcher<CreateCodeMutation, CreateCodeMutationVariables>(client, CreateCodeDocument, variables, headers)(),
        options,
    );
export const GetCodeDocument = `
    query getCode($id: Int!) {
  getCode(id: $id) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetCodeQuery = <TData = GetCodeQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetCodeQueryVariables,
    options?: UseQueryOptions<GetCodeQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetCodeQuery, TError, TData>(
        ['getCode', variables],
        fetcher<GetCodeQuery, GetCodeQueryVariables>(client, GetCodeDocument, variables, headers),
        options,
    );

useGetCodeQuery.getKey = (variables: GetCodeQueryVariables) => ['getCode', variables];
export const useInfiniteGetCodeQuery = <TData = GetCodeQuery, TError = unknown>(
    pageParamKey: keyof GetCodeQueryVariables,
    client: GraphQLClient,
    variables: GetCodeQueryVariables,
    options?: UseInfiniteQueryOptions<GetCodeQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetCodeQuery, TError, TData>(
        ['getCode.infinite', variables],
        (metaData) =>
            fetcher<GetCodeQuery, GetCodeQueryVariables>(
                client,
                GetCodeDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetCodeQuery.getKey = (variables: GetCodeQueryVariables) => ['getCode.infinite', variables];
export const GetAllOwnCodesDocument = `
    query getAllOwnCodes($limit: Int!, $skip: Int!) {
  getAllOwnCodes(limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllOwnCodesQuery = <TData = GetAllOwnCodesQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllOwnCodesQueryVariables,
    options?: UseQueryOptions<GetAllOwnCodesQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllOwnCodesQuery, TError, TData>(
        ['getAllOwnCodes', variables],
        fetcher<GetAllOwnCodesQuery, GetAllOwnCodesQueryVariables>(client, GetAllOwnCodesDocument, variables, headers),
        options,
    );

useGetAllOwnCodesQuery.getKey = (variables: GetAllOwnCodesQueryVariables) => ['getAllOwnCodes', variables];
export const useInfiniteGetAllOwnCodesQuery = <TData = GetAllOwnCodesQuery, TError = unknown>(
    pageParamKey: keyof GetAllOwnCodesQueryVariables,
    client: GraphQLClient,
    variables: GetAllOwnCodesQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllOwnCodesQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllOwnCodesQuery, TError, TData>(
        ['getAllOwnCodes.infinite', variables],
        (metaData) =>
            fetcher<GetAllOwnCodesQuery, GetAllOwnCodesQueryVariables>(
                client,
                GetAllOwnCodesDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllOwnCodesQuery.getKey = (variables: GetAllOwnCodesQueryVariables) => ['getAllOwnCodes.infinite', variables];
export const GetAllCodesByTagsDocument = `
    query getAllCodesByTags($tags: [String!]!, $sortBy: SortBy!, $limit: Int!, $skip: Int!) {
  getAllCodesByTag(tags: $tags, sortBy: $sortBy, limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllCodesByTagsQuery = <TData = GetAllCodesByTagsQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCodesByTagsQueryVariables,
    options?: UseQueryOptions<GetAllCodesByTagsQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCodesByTagsQuery, TError, TData>(
        ['getAllCodesByTags', variables],
        fetcher<GetAllCodesByTagsQuery, GetAllCodesByTagsQueryVariables>(client, GetAllCodesByTagsDocument, variables, headers),
        options,
    );

useGetAllCodesByTagsQuery.getKey = (variables: GetAllCodesByTagsQueryVariables) => ['getAllCodesByTags', variables];
export const useInfiniteGetAllCodesByTagsQuery = <TData = GetAllCodesByTagsQuery, TError = unknown>(
    pageParamKey: keyof GetAllCodesByTagsQueryVariables,
    client: GraphQLClient,
    variables: GetAllCodesByTagsQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCodesByTagsQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCodesByTagsQuery, TError, TData>(
        ['getAllCodesByTags.infinite', variables],
        (metaData) =>
            fetcher<GetAllCodesByTagsQuery, GetAllCodesByTagsQueryVariables>(
                client,
                GetAllCodesByTagsDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCodesByTagsQuery.getKey = (variables: GetAllCodesByTagsQueryVariables) => ['getAllCodesByTags.infinite', variables];
export const GetAllCodesByKeywordDocument = `
    query GetAllCodesByKeyword($keyword: String!, $limit: Int!, $skip: Int!) {
  GetAllCodesByKeyword(keyword: $keyword, limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllCodesByKeywordQuery = <TData = GetAllCodesByKeywordQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCodesByKeywordQueryVariables,
    options?: UseQueryOptions<GetAllCodesByKeywordQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCodesByKeywordQuery, TError, TData>(
        ['GetAllCodesByKeyword', variables],
        fetcher<GetAllCodesByKeywordQuery, GetAllCodesByKeywordQueryVariables>(client, GetAllCodesByKeywordDocument, variables, headers),
        options,
    );

useGetAllCodesByKeywordQuery.getKey = (variables: GetAllCodesByKeywordQueryVariables) => ['GetAllCodesByKeyword', variables];
export const useInfiniteGetAllCodesByKeywordQuery = <TData = GetAllCodesByKeywordQuery, TError = unknown>(
    pageParamKey: keyof GetAllCodesByKeywordQueryVariables,
    client: GraphQLClient,
    variables: GetAllCodesByKeywordQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCodesByKeywordQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCodesByKeywordQuery, TError, TData>(
        ['GetAllCodesByKeyword.infinite', variables],
        (metaData) =>
            fetcher<GetAllCodesByKeywordQuery, GetAllCodesByKeywordQueryVariables>(
                client,
                GetAllCodesByKeywordDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCodesByKeywordQuery.getKey = (variables: GetAllCodesByKeywordQueryVariables) => ['GetAllCodesByKeyword.infinite', variables];
export const GetAllCodesSortedStarDocument = `
    query GetAllCodesSortedStar($limit: Int!, $skip: Int!) {
  GetAllCodesSortedStar(limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllCodesSortedStarQuery = <TData = GetAllCodesSortedStarQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCodesSortedStarQueryVariables,
    options?: UseQueryOptions<GetAllCodesSortedStarQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCodesSortedStarQuery, TError, TData>(
        ['GetAllCodesSortedStar', variables],
        fetcher<GetAllCodesSortedStarQuery, GetAllCodesSortedStarQueryVariables>(client, GetAllCodesSortedStarDocument, variables, headers),
        options,
    );

useGetAllCodesSortedStarQuery.getKey = (variables: GetAllCodesSortedStarQueryVariables) => ['GetAllCodesSortedStar', variables];
export const useInfiniteGetAllCodesSortedStarQuery = <TData = GetAllCodesSortedStarQuery, TError = unknown>(
    pageParamKey: keyof GetAllCodesSortedStarQueryVariables,
    client: GraphQLClient,
    variables: GetAllCodesSortedStarQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCodesSortedStarQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCodesSortedStarQuery, TError, TData>(
        ['GetAllCodesSortedStar.infinite', variables],
        (metaData) =>
            fetcher<GetAllCodesSortedStarQuery, GetAllCodesSortedStarQueryVariables>(
                client,
                GetAllCodesSortedStarDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCodesSortedStarQuery.getKey = (variables: GetAllCodesSortedStarQueryVariables) => ['GetAllCodesSortedStar.infinite', variables];
export const GetAllCodesSortedAccessDocument = `
    query GetAllCodesSortedAccess($limit: Int!, $skip: Int!) {
  GetAllCodesSortedAccess(limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetAllCodesSortedAccessQuery = <TData = GetAllCodesSortedAccessQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCodesSortedAccessQueryVariables,
    options?: UseQueryOptions<GetAllCodesSortedAccessQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCodesSortedAccessQuery, TError, TData>(
        ['GetAllCodesSortedAccess', variables],
        fetcher<GetAllCodesSortedAccessQuery, GetAllCodesSortedAccessQueryVariables>(client, GetAllCodesSortedAccessDocument, variables, headers),
        options,
    );

useGetAllCodesSortedAccessQuery.getKey = (variables: GetAllCodesSortedAccessQueryVariables) => ['GetAllCodesSortedAccess', variables];
export const useInfiniteGetAllCodesSortedAccessQuery = <TData = GetAllCodesSortedAccessQuery, TError = unknown>(
    pageParamKey: keyof GetAllCodesSortedAccessQueryVariables,
    client: GraphQLClient,
    variables: GetAllCodesSortedAccessQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCodesSortedAccessQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCodesSortedAccessQuery, TError, TData>(
        ['GetAllCodesSortedAccess.infinite', variables],
        (metaData) =>
            fetcher<GetAllCodesSortedAccessQuery, GetAllCodesSortedAccessQueryVariables>(
                client,
                GetAllCodesSortedAccessDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCodesSortedAccessQuery.getKey = (variables: GetAllCodesSortedAccessQueryVariables) => [
    'GetAllCodesSortedAccess.infinite',
    variables,
];
export const UpdateCodeDocument = `
    mutation updateCode($id: Int!, $code: String!, $img: Byte!, $description: String!, $performance: String!, $tags: [String!]!) {
  updateCodes(
    id: $id
    code: $code
    img: $img
    description: $description
    performance: $performance
    tags: $tags
  ) {
    is_error
    message
  }
}
    `;
export const useUpdateCodeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<UpdateCodeMutation, TError, UpdateCodeMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<UpdateCodeMutation, TError, UpdateCodeMutationVariables, TContext>(
        ['updateCode'],
        (variables?: UpdateCodeMutationVariables) =>
            fetcher<UpdateCodeMutation, UpdateCodeMutationVariables>(client, UpdateCodeDocument, variables, headers)(),
        options,
    );
export const UpdateAccessDocument = `
    mutation updateAccess($id: Int!, $access: Int!) {
  updateAccess(id: $id, access: $access) {
    is_error
    message
  }
}
    `;
export const useUpdateAccessMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<UpdateAccessMutation, TError, UpdateAccessMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<UpdateAccessMutation, TError, UpdateAccessMutationVariables, TContext>(
        ['updateAccess'],
        (variables?: UpdateAccessMutationVariables) =>
            fetcher<UpdateAccessMutation, UpdateAccessMutationVariables>(client, UpdateAccessDocument, variables, headers)(),
        options,
    );
export const UpdateStarDocument = `
    mutation updateStar($code_id: Int!) {
  updateStar(code_id: $code_id) {
    is_error
    message
  }
}
    `;
export const useUpdateStarMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<UpdateStarMutation, TError, UpdateStarMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<UpdateStarMutation, TError, UpdateStarMutationVariables, TContext>(
        ['updateStar'],
        (variables?: UpdateStarMutationVariables) =>
            fetcher<UpdateStarMutation, UpdateStarMutationVariables>(client, UpdateStarDocument, variables, headers)(),
        options,
    );
export const DeleteCodeDocument = `
    mutation deleteCode($id: Int!) {
  deleteCode(id: $id) {
    is_error
    message
  }
}
    `;
export const useDeleteCodeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<DeleteCodeMutation, TError, DeleteCodeMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<DeleteCodeMutation, TError, DeleteCodeMutationVariables, TContext>(
        ['deleteCode'],
        (variables?: DeleteCodeMutationVariables) =>
            fetcher<DeleteCodeMutation, DeleteCodeMutationVariables>(client, DeleteCodeDocument, variables, headers)(),
        options,
    );
export const GetAllCollectionDocument = `
    query getAllCollection($limit: Int!, $skip: Int!) {
  getAllCollection(limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    collection_id
    user_id
  }
}
    `;
export const useGetAllCollectionQuery = <TData = GetAllCollectionQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCollectionQueryVariables,
    options?: UseQueryOptions<GetAllCollectionQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCollectionQuery, TError, TData>(
        ['getAllCollection', variables],
        fetcher<GetAllCollectionQuery, GetAllCollectionQueryVariables>(client, GetAllCollectionDocument, variables, headers),
        options,
    );

useGetAllCollectionQuery.getKey = (variables: GetAllCollectionQueryVariables) => ['getAllCollection', variables];
export const useInfiniteGetAllCollectionQuery = <TData = GetAllCollectionQuery, TError = unknown>(
    pageParamKey: keyof GetAllCollectionQueryVariables,
    client: GraphQLClient,
    variables: GetAllCollectionQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCollectionQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCollectionQuery, TError, TData>(
        ['getAllCollection.infinite', variables],
        (metaData) =>
            fetcher<GetAllCollectionQuery, GetAllCollectionQueryVariables>(
                client,
                GetAllCollectionDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCollectionQuery.getKey = (variables: GetAllCollectionQueryVariables) => ['getAllCollection.infinite', variables];
export const GetAllCollectionBySearchDocument = `
    query getAllCollectionBySearch($keyword: String!, $limit: Int!, $skip: Int!) {
  getAllCollectionBySearch(keyword: $keyword, limit: $limit, skip: $skip) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    collection_id
    user_id
  }
}
    `;
export const useGetAllCollectionBySearchQuery = <TData = GetAllCollectionBySearchQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllCollectionBySearchQueryVariables,
    options?: UseQueryOptions<GetAllCollectionBySearchQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllCollectionBySearchQuery, TError, TData>(
        ['getAllCollectionBySearch', variables],
        fetcher<GetAllCollectionBySearchQuery, GetAllCollectionBySearchQueryVariables>(client, GetAllCollectionBySearchDocument, variables, headers),
        options,
    );

useGetAllCollectionBySearchQuery.getKey = (variables: GetAllCollectionBySearchQueryVariables) => ['getAllCollectionBySearch', variables];
export const useInfiniteGetAllCollectionBySearchQuery = <TData = GetAllCollectionBySearchQuery, TError = unknown>(
    pageParamKey: keyof GetAllCollectionBySearchQueryVariables,
    client: GraphQLClient,
    variables: GetAllCollectionBySearchQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllCollectionBySearchQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllCollectionBySearchQuery, TError, TData>(
        ['getAllCollectionBySearch.infinite', variables],
        (metaData) =>
            fetcher<GetAllCollectionBySearchQuery, GetAllCollectionBySearchQueryVariables>(
                client,
                GetAllCollectionBySearchDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllCollectionBySearchQuery.getKey = (variables: GetAllCollectionBySearchQueryVariables) => [
    'getAllCollectionBySearch.infinite',
    variables,
];
export const CreateAdminCollectionDocument = `
    mutation createAdminCollection($user_id: Int!, $code_id: Int!) {
  createAdminCollection(user_id: $user_id, code_id: $code_id) {
    is_error
    message
  }
}
    `;
export const useCreateAdminCollectionMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateAdminCollectionMutation, TError, CreateAdminCollectionMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateAdminCollectionMutation, TError, CreateAdminCollectionMutationVariables, TContext>(
        ['createAdminCollection'],
        (variables?: CreateAdminCollectionMutationVariables) =>
            fetcher<CreateAdminCollectionMutation, CreateAdminCollectionMutationVariables>(
                client,
                CreateAdminCollectionDocument,
                variables,
                headers,
            )(),
        options,
    );
export const CreateCollectionDocument = `
    mutation createCollection($code_id: Int!) {
  createCollection(code_id: $code_id) {
    is_error
    message
  }
}
    `;
export const useCreateCollectionMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateCollectionMutation, TError, CreateCollectionMutationVariables, TContext>(
        ['createCollection'],
        (variables?: CreateCollectionMutationVariables) =>
            fetcher<CreateCollectionMutation, CreateCollectionMutationVariables>(client, CreateCollectionDocument, variables, headers)(),
        options,
    );
export const GetCollectionDocument = `
    mutation getCollection($id: Int!) {
  getCollection(id: $id) {
    id
    username
    code
    img
    description
    performance
    star
    tags
    created_at
    updated_at
    access
    user_id
  }
}
    `;
export const useGetCollectionMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<GetCollectionMutation, TError, GetCollectionMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<GetCollectionMutation, TError, GetCollectionMutationVariables, TContext>(
        ['getCollection'],
        (variables?: GetCollectionMutationVariables) =>
            fetcher<GetCollectionMutation, GetCollectionMutationVariables>(client, GetCollectionDocument, variables, headers)(),
        options,
    );
export const DeleteCollectionDocument = `
    mutation deleteCollection($id: Int!) {
  deleteCollection(id: $id) {
    is_error
    message
  }
}
    `;
export const useDeleteCollectionMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<DeleteCollectionMutation, TError, DeleteCollectionMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<DeleteCollectionMutation, TError, DeleteCollectionMutationVariables, TContext>(
        ['deleteCollection'],
        (variables?: DeleteCollectionMutationVariables) =>
            fetcher<DeleteCollectionMutation, DeleteCollectionMutationVariables>(client, DeleteCollectionDocument, variables, headers)(),
        options,
    );
export const GetAllMediaDocument = `
    query getAllMedia($limit: Int!, $skip: Int!) {
  getAllMedia(limit: $limit, skip: $skip) {
    id
    title
    contents
    img
    created_at
    updated_at
  }
}
    `;
export const useGetAllMediaQuery = <TData = GetAllMediaQuery, TError = unknown>(
    client: GraphQLClient,
    variables: GetAllMediaQueryVariables,
    options?: UseQueryOptions<GetAllMediaQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useQuery<GetAllMediaQuery, TError, TData>(
        ['getAllMedia', variables],
        fetcher<GetAllMediaQuery, GetAllMediaQueryVariables>(client, GetAllMediaDocument, variables, headers),
        options,
    );

useGetAllMediaQuery.getKey = (variables: GetAllMediaQueryVariables) => ['getAllMedia', variables];
export const useInfiniteGetAllMediaQuery = <TData = GetAllMediaQuery, TError = unknown>(
    pageParamKey: keyof GetAllMediaQueryVariables,
    client: GraphQLClient,
    variables: GetAllMediaQueryVariables,
    options?: UseInfiniteQueryOptions<GetAllMediaQuery, TError, TData>,
    headers?: RequestInit['headers'],
) =>
    useInfiniteQuery<GetAllMediaQuery, TError, TData>(
        ['getAllMedia.infinite', variables],
        (metaData) =>
            fetcher<GetAllMediaQuery, GetAllMediaQueryVariables>(
                client,
                GetAllMediaDocument,
                { ...variables, ...(metaData.pageParam ? { [pageParamKey]: metaData.pageParam } : {}) },
                headers,
            )(),
        options,
    );

useInfiniteGetAllMediaQuery.getKey = (variables: GetAllMediaQueryVariables) => ['getAllMedia.infinite', variables];
export const CreateMediaDocument = `
    mutation createMedia($title: String!, $contents: String!, $img: Byte!) {
  createMedia(title: $title, contents: $contents, img: $img) {
    is_error
    message
  }
}
    `;
export const useCreateMediaMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateMediaMutation, TError, CreateMediaMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateMediaMutation, TError, CreateMediaMutationVariables, TContext>(
        ['createMedia'],
        (variables?: CreateMediaMutationVariables) =>
            fetcher<CreateMediaMutation, CreateMediaMutationVariables>(client, CreateMediaDocument, variables, headers)(),
        options,
    );
export const UpdateMediaDocument = `
    mutation updateMedia($id: ID!, $title: String!, $contents: String!, $img: Byte!) {
  updateMedia(id: $id, title: $title, contents: $contents, img: $img) {
    is_error
    message
  }
}
    `;
export const useUpdateMediaMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<UpdateMediaMutation, TError, UpdateMediaMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<UpdateMediaMutation, TError, UpdateMediaMutationVariables, TContext>(
        ['updateMedia'],
        (variables?: UpdateMediaMutationVariables) =>
            fetcher<UpdateMediaMutation, UpdateMediaMutationVariables>(client, UpdateMediaDocument, variables, headers)(),
        options,
    );
export const GetMediaDocument = `
    mutation getMedia($id: Int!) {
  getMedia(id: $id) {
    id
    title
    contents
    img
    created_at
    updated_at
  }
}
    `;
export const useGetMediaMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<GetMediaMutation, TError, GetMediaMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<GetMediaMutation, TError, GetMediaMutationVariables, TContext>(
        ['getMedia'],
        (variables?: GetMediaMutationVariables) =>
            fetcher<GetMediaMutation, GetMediaMutationVariables>(client, GetMediaDocument, variables, headers)(),
        options,
    );
export const DeleteMediaDocument = `
    mutation deleteMedia($id: Int!) {
  deleteMedia(id: $id) {
    is_error
    message
  }
}
    `;
export const useDeleteMediaMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<DeleteMediaMutation, TError, DeleteMediaMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<DeleteMediaMutation, TError, DeleteMediaMutationVariables, TContext>(
        ['deleteMedia'],
        (variables?: DeleteMediaMutationVariables) =>
            fetcher<DeleteMediaMutation, DeleteMediaMutationVariables>(client, DeleteMediaDocument, variables, headers)(),
        options,
    );
export const CreateTokenDocument = `
    mutation createToken($username: String!) {
  createToken(username: $username)
}
    `;
export const useCreateTokenMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateTokenMutation, TError, CreateTokenMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateTokenMutation, TError, CreateTokenMutationVariables, TContext>(
        ['createToken'],
        (variables?: CreateTokenMutationVariables) =>
            fetcher<CreateTokenMutation, CreateTokenMutationVariables>(client, CreateTokenDocument, variables, headers)(),
        options,
    );
export const CreateAdminTokenDocument = `
    mutation createAdminToken($username: String!, $password: String!) {
  createAdminToken(username: $username, password: $password)
}
    `;
export const useCreateAdminTokenMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateAdminTokenMutation, TError, CreateAdminTokenMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateAdminTokenMutation, TError, CreateAdminTokenMutationVariables, TContext>(
        ['createAdminToken'],
        (variables?: CreateAdminTokenMutationVariables) =>
            fetcher<CreateAdminTokenMutation, CreateAdminTokenMutationVariables>(client, CreateAdminTokenDocument, variables, headers)(),
        options,
    );
export const AdminCreateCodeDocument = `
    mutation adminCreateCode($username: String!, $code: String!, $img: Byte!, $description: String!, $performance: String!, $star: [Int!]!, $tags: [String!]!, $access: Int!) {
  adminCreateCode(
    username: $username
    code: $code
    img: $img
    description: $description
    performance: $performance
    star: $star
    tags: $tags
    access: $access
  ) {
    is_error
    message
  }
}
    `;
export const useAdminCreateCodeMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<AdminCreateCodeMutation, TError, AdminCreateCodeMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<AdminCreateCodeMutation, TError, AdminCreateCodeMutationVariables, TContext>(
        ['adminCreateCode'],
        (variables?: AdminCreateCodeMutationVariables) =>
            fetcher<AdminCreateCodeMutation, AdminCreateCodeMutationVariables>(client, AdminCreateCodeDocument, variables, headers)(),
        options,
    );
export const CreateUserDocument = `
    mutation createUser($username: String!, $password: String!, $email: String!, $sex: String!, $date_of_birth: String!) {
  createUser(
    username: $username
    password: $password
    email: $email
    sex: $sex
    date_of_birth: $date_of_birth
  ) {
    is_error
    message
  }
}
    `;
export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
        ['createUser'],
        (variables?: CreateUserMutationVariables) =>
            fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
        options,
    );
export const LoginUserDocument = `
    mutation loginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    user_id
    username
    OK
  }
}
    `;
export const useLoginUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
        ['loginUser'],
        (variables?: LoginUserMutationVariables) =>
            fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
        options,
    );
export const DeleteUserDocument = `
    mutation deleteUser($username: String!) {
  deleteUser(username: $username) {
    is_error
    message
  }
}
    `;
export const useDeleteUserMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>,
    headers?: RequestInit['headers'],
) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
        ['deleteUser'],
        (variables?: DeleteUserMutationVariables) =>
            fetcher<DeleteUserMutation, DeleteUserMutationVariables>(client, DeleteUserDocument, variables, headers)(),
        options,
    );
