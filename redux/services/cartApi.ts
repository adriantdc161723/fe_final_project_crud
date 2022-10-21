import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apibaseurl } from '../../pages/api/apibaseurl'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'



export const cartApi = createApi({
  reducerPath: 'cartApi',
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
  tagTypes: ['Cart'],

  endpoints: (builder) => ({

    getAllCartByUserId: builder.query({
      query: (payload) => ({
            url: `get-all-carts-by-user-id/${payload}`,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        providesTags: ['Cart']
    }),

    addTocart: builder.mutation({
      query: (payload) => ({
            url: `add-to-cart`,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify(payload)
        }),
        invalidatesTags: ['Cart']
    }),

    deleteCartItem: builder.mutation({
      query: (payload) => ({
            url: `modify-cart-activation/${payload}`,
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }),
        invalidatesTags: ['Cart']
    }),

    invalidateCart: builder.mutation({
      query: () => ({
            url: `get-all-carts`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }),
        invalidatesTags: ['Cart']
    }),

  }),
})

export const { 
  useGetAllCartByUserIdQuery, 
  useAddTocartMutation, 
  useInvalidateCartMutation,
  useDeleteCartItemMutation } = cartApi