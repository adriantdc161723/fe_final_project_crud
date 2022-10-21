import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apibaseurl } from '../../pages/api/apibaseurl'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'



export const shopApi = createApi({
  reducerPath: 'shopApi',
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
  tagTypes: ['Shop'],

  endpoints: (builder) => ({

    getAllShops: builder.query({
      query: () => ({
            url: `get-all-shop`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        providesTags: ['Shop']
    }),

    createShop: builder.mutation({
      query: (payload) => ({
            url: `create-shop`,
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Shop']
    }),

    updateShop: builder.mutation({
      query: (payload) => ({
            url: `update-shop`,
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Shop']
    }),

    
    toggleShopActivation: builder.mutation({
      query: (payload) => ({
            url: `modify-shop-activation/${payload}`,
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Shop']
    }),

  }),
})

export const { useGetAllShopsQuery, useCreateShopMutation, useUpdateShopMutation,  useToggleShopActivationMutation } =  shopApi 