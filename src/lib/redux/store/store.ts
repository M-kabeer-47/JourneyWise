import { configureStore } from '@reduxjs/toolkit'
import navbar from '../slices/navbar'
export const makeStore = () => {
  return configureStore({
    reducer: {
        navbar: navbar
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']