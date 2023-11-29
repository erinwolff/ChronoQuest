import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from "../src/client/store"
import Home from "../src/client/features/games/Home"

describe('<Home>', () => {
  test('renders Home component', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
});