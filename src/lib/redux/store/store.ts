import { configureStore } from '@reduxjs/toolkit'
import experienceData from '../slices/experience'
import user from '../slices/user'
import currencyReducer from '../slices/currencySlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        experienceData: experienceData,
        user: user,
        currency: currencyReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']