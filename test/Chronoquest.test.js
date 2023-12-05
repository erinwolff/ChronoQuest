import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../src/client/store"
import Home from "../src/client/features/games/Home"
import Details from "../src/client/features/games/Details"
import Profile from "../src/client/features/games/Profile"
import Forum from "../src/client/features/forum/Forum"
import PostDetails from "../src/client/features/forum/PostDetails"

describe('<Home>', () => {
  test('renders Home component', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
});

describe('<Details>', () => {
  test('renders Details component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Details />
        </Router>
      </Provider>
    );
  });
});

describe('<Profile>', () => {
  test('renders Profile component', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });
});

describe('<Forum>', () => {
  test('renders Forum component', () => {
    render(
      <Provider store={store}>
        <Forum />
      </Provider>
    );
  });
});

describe('<PostDetails>', () => {
  test('renders PostDetails component', () => {
    render(
      <Provider store={store}>
        <Router>
          <PostDetails />
        </Router>
      </Provider>
    );
  });
});