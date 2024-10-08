/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * サンプル API
 * OpenAPI spec version: 0.0.1
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  DefaultErrorResponse,
  User
} from '.././'



export type getUserResponse = {
  data: User;
  status: number;
}

export const getGetUserUrl = () => {


  return `http://localhost:8080/users`
}

export const getUser = async ( options?: RequestInit): Promise<getUserResponse> => {
  
  const res = await fetch(getGetUserUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}



export const getGetUserQueryKey = () => {
    return [`http://localhost:8080/users`] as const;
    }

    
export const getGetUserQueryOptions = <TData = Awaited<ReturnType<typeof getUser>>, TError = DefaultErrorResponse>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUser>>> = ({ signal }) => getUser({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUserQueryResult = NonNullable<Awaited<ReturnType<typeof getUser>>>
export type GetUserQueryError = DefaultErrorResponse


export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = DefaultErrorResponse>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUser>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = DefaultErrorResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUser>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }
export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = DefaultErrorResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey }

export function useGetUser<TData = Awaited<ReturnType<typeof getUser>>, TError = DefaultErrorResponse>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetUserQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export type postUserResponse = {
  data: void;
  status: number;
}

export const getPostUserUrl = () => {


  return `http://localhost:8080/users`
}

export const postUser = async (user: User, options?: RequestInit): Promise<postUserResponse> => {
  
  const res = await fetch(getPostUserUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      user,)
  }

  )
  const data = await res.json()

  return { status: res.status, data }
}




export const getPostUserMutationOptions = <TError = DefaultErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUser>>, TError,{data: User}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof postUser>>, TError,{data: User}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postUser>>, {data: User}> = (props) => {
          const {data} = props ?? {};

          return  postUser(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostUserMutationResult = NonNullable<Awaited<ReturnType<typeof postUser>>>
    export type PostUserMutationBody = User
    export type PostUserMutationError = DefaultErrorResponse

    export const usePostUser = <TError = DefaultErrorResponse,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postUser>>, TError,{data: User}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof postUser>>,
        TError,
        {data: User},
        TContext
      > => {

      const mutationOptions = getPostUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    