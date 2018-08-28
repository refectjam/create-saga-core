# create-saga-core

- convenience initializer for [_**redux-saga**_](https://github.com/redux-saga/redux-saga) apps

## get started

#### install

```
yarn add redux redux-saga

yarn add create-saga-core
```

#### basic template

```js
import createSagaCore from 'create-saga-core'

createSagaCore({ initializer }).then(store => {
  /* insert code */
})

function* initializer() {
  /* insert code */
}
```

## api

- **_`createSagaCore({ reducer, reducers, sagas, initializer })`_**

  - **_`reducer`_** **-** _Reducer_
  - **_`reducers`_** **-** _{Reducer}_
  - **_`sagas`_** **-** _{Saga}_
  - **_`initializer`_** **-** _Saga_

  **notes:**

  - all arguments are optional, though it doesn't make since to provide nothing
  - provide either **_`reducer`_** or **_`reducers`_** to participate in state management
  - resolves with store after **_`initializer`_** completes
  - **_`sagas`_** will be promisified and attached at **_`<Store>.api`_**

## caveats

- only works in the context of _ES modules_
- may need to run through transpiler depending on target environment
