import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

function createSagaCore({ reducer, reducers, sagas, initializer }) {
  const sagaMiddleware = createSagaMiddleware()
  const reduxMiddleware = applyMiddleware(sagaMiddleware)
  let storeReducer = (state = {}) => state
  storeReducer = reducers ? combineReducers(reducers) : storeReducer
  storeReducer = reducer || storeReducer
  const store = createStore(storeReducer, reduxMiddleware)
  const externalSagas = sagas || {}
  store.api = createApi(sagaMiddleware.run, externalSagas)
  const initializerSaga = initializer || function*() {}
  const initialize = sagaMiddleware.run(initializerSaga).toPromise()
  return initialize.then(() => store)
}

function createApi(runSaga, sagas) {
  const sagaToPromise = bindSaga.bind(null, runSaga)
  const sagaKeys = Object.keys(sagas)
  return sagaKeys.reduce((api, key) => {
    const saga = sagas[key]
    api[key] = sagaToPromise(saga)
    return api
  }, {})
}

function bindSaga(runSaga, saga) {
  const boundSaga = runSaga.bind(null, saga)
  return (...args) => boundSaga(...args).done
}

export default createSagaCore
