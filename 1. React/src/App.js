import React, {useState} from 'react';
import { hot } from 'react-hot-loader';

import JsonDom from './JsonDom';
import OutputBox from './OutputBox';
import DOM_DATA from '../data/dom.json';

const App = () => {
  const [boxData, setBoxData] = useState({})
  const display = (data) => {
    return setBoxData(data)
  }
  return (
    <div>
      <JsonDom data={DOM_DATA} display={display}/>
      <OutputBox boxData={boxData}/>
    </div>

  )
};

export default hot(module)(App);
