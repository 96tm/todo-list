import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './slices/categoriesSlice';
import { tasksSlice } from './slices/tasksSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  categoriesState: categoriesSlice.reducer,
  tasksState: tasksSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
