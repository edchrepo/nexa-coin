import { configureStore } from '@reduxjs/toolkit'
import marketDataReducer from './slices/marketDataSlice'
import chartDataReducer from './slices/chartDataSlice'
import coinsDataReducer from './slices/coinsDataSlice'
import timeReducer from './slices/timeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        marketData: marketDataReducer,
        chartData: chartDataReducer,
        coinsData: coinsDataReducer,
        time: timeReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']