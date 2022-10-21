import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/authApi'
import { cartApi } from '../services/cartApi'
import { userApi } from '../services/userApi'
import { shopApi } from '../services/ShopApi'
import { productApi } from '../services/productApi'
import authReducer from '../slice/authSlice'

export const store = configureStore({
  reducer: {
    //slice
    auth: authReducer,
    //rtk
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware, 
      cartApi.middleware,
      userApi.middleware,
      shopApi.middleware,
      productApi.middleware
    ]),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch