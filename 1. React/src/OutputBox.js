import React from 'react';

const OUTPUT_BOX_STYLES = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 250,
  padding: 20,
  backgroundColor: 'lightyellow',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
  fontSize: '13px',
};

export default class OutputBox extends React.Component {
  render() {
    const {boxData} = this.props
    let s = boxData? JSON.stringify(boxData) : "empty"
    s = s.slice(1, -1).replace(/\"/g, ' ')
    return <div style={OUTPUT_BOX_STYLES}>{s}</div>;
  }
}
