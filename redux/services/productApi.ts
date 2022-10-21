import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apibaseurl } from '../../pages/api/apibaseurl'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'



export const productApi = createApi({
  reducerPath: 'productApi',
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
  tagTypes: ['Products'],

  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: () => ({
            url: `get-all-products`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        providesTags: ['Products']
    }),


    addProduct: builder.mutation({
      query: (payload) => ({
            url: `add-product`,
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Products']
    }),

    updateProduct: builder.mutation({
      query: (payload) => ({
            url: `update-product`,
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Products']
    }),


    toggleProductActivation: builder.mutation({
      query: (payload) => ({
            url: `modify-product-activation/${payload}`,
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Products']
    }),

    invalidatesProduct: builder.mutation({
      query: () => ({
            url: `get-all-products`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }),
        invalidatesTags: ['Products']
    }),

  }),
})

export const { 
  useGetAllProductsQuery, 
  useAddProductMutation, 
  useUpdateProductMutation, 
  useInvalidatesProductMutation,
  useToggleProductActivationMutation } =  productApi