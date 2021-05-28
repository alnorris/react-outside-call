# 📞 React Outside Call

Use react hooks/context outside of React. Useful if you're using react packages that don't have this functionality, or you want access context hooks `useContext` outside of React.

## Install

```
npm install react-outside-call
```

## Quickstart

### Step 1

Create outside caller object with the hooks you want to use like this...
```jsx
import OutsideCallConsumer, { createCaller } from 'react-outside-call';

const callConfig = createCaller({
  myUserContext: () => useContext(myUserContext),
  useToasts: () => useToasts(),
  apolloClient: () => useApolloClient(),
});
```


### Step 2

Add the `<OutsideCallConsumer config={callConfig} />` component just after all the Provider components.

*Note*: 

- Always put `<OutsideCallConsumer>` after all the Provider components
- This will not rerender `<App />` if any context's get updated, so you don't need to worry about unnecessary rerenders!


Example:

```jsx
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ToastProvider } from 'react-toast-notifications';
import myUserContext, MyUserContextProvider from './myUserContext';
import OutsideCallConsumer, { createCaller } from 'react-outside-call';
import apolloClient from './apolloClient';

export const callConfig = createCaller({
  myUserContext: () => useContext(myUserContext),
  useToasts: () => useToasts(),
  apolloClient: () => useApolloClient(),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ToastProvider>
      <MyUserContextProvider>
        <OutsideCallConsumer config={callConfig}> 
          <App />
        </OutsideCallConsumer>
      </MyUserContextProvider>
    </ToastProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
```



### Step 3
Now call `callConfig` using the `call` object wherever you like in your project - like inside a normal javascript function, redux sagas, etc..
```jsx
import { callConfig } from './index';

export const logHttpFailure = () => {
  callConfig.call.useToasts.addToast({ message: 'Network error' });
  console.log(`User failure ${callConfig.call.myContext}.`);
};
```


<!-- ## Events

We can also do event handling. if any return values of the hooks change value we 
can register an event. For example, lets register when the myUserContext context value changes.


```jsx
const callConfig = createCaller({
  myUserContext: () => useContext(myUserContext)
});


callConfig.on('myUserContext', (value) => {
  console.log(`User context value changed to ${value}.`)
})



``` -->
