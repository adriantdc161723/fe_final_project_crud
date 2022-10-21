import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apibaseurl } from '../../pages/api/apibaseurl'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: apibaseurl }),
  endpoints: (builder) => ({

    userLogin: builder.mutation({
      query: (payload) => ({
            url: 'login-user',
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
    }),

  }),
})

export const { useUserLoginMutation } = authApi