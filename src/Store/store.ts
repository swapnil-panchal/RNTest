import {legacy_createStore as createStore} from 'redux';
import reducer from './Reducers';

export const store = createStore(reducer);




export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;



