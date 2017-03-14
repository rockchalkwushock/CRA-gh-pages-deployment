import React from 'react';
import { browserHistory } from 'react-router';

const NavBar = () => (
  <nav>
    <ul>
      <li  onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/`)}>
        <a>
          Home
        </a>
      </li>
      <li  onClick={() => browserHistory.push('/one')}>
        <a>
          Page1
        </a>
      </li>
      <li  onClick={() => browserHistory.push('/two')}>
        <a>
          Page2
        </a>
      </li>
            <li  onClick={() => browserHistory.push(`${Math.random()}`)}>
        <a>
          404
        </a>
      </li>
    </ul>
  </nav>
);

export default NavBar;