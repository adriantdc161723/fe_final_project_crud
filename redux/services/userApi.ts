import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apibaseurl } from '../../pages/api/apibaseurl'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'



export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apibaseurl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.accessToken;
      if(token){
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User'],

  endpoints: (builder) => ({

    getUserDetailsByUsername: builder.query({
      query: (payload) => ({
            url: `get-user-details-by-username/${payload}`,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
    }),

    signupUser: builder.mutation({
      query: (payload) => ({
            url: `sign-up-user`,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify(payload),
        }),
    }),

  }),
})

export const { useGetUserDetailsByUsernameQuery, useSignupUserMutation } = userApi