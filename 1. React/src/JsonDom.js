import React from 'react';

export default class JsonDom extends React.Component {
  render() {
    const {data} = this.props;
    const {tagName = 'div', className = '', style = null, children = []} = data;

    return React.createElement(
      tagName,
      {
        className,
        style,
      },
      _createChildren(children),
    );
  }
}

function _createChildren(children) {
  if (Array.isArray(children)) {
    return children.map((childData, i) => <JsonDom data={childData} key={i} />);
  } else if (typeof children === 'string') {
    return children;
  } else {
    return null;
  }
}
