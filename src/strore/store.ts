import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { shapeListSlice } from "./slice/shapeList"
import { setupListeners } from "@reduxjs/toolkit/query"


const rootReducer = combineSlices(  shapeListSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    })
    setupListeners(store.dispatch)
    
    return store
}
export const store = makeStore()
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
// subscribe to store
