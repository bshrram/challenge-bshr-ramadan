import React from 'react';
import {hot} from 'react-hot-loader';

import JsonDom from './JsonDom';
import OutputBox from './OutputBox';
import DOM_DATA from '../data/dom.json';

const App = () => (
  <div>
    <JsonDom data={DOM_DATA} />
    <OutputBox />
  </div>
);

export default hot(module)(App);
