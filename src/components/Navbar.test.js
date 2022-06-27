import { render, screen} from '@testing-library/react';
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {createMemoryHistory} from 'history';
import App from '../App';
import ReactDOM from 'react-dom';

//The most basic of basic tests
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });