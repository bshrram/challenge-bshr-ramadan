import React from 'react';

let getStyle = (el, styleProp) => {
  let x = el
  if (window.getComputedStyle) {
    var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
  }
  else if (x.currentStyle) {
    var y = x.currentStyle[styleProp];
  }
  return y;
}

let domPath = (el) => {
  if (!(el instanceof Element)) return;
  let path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
      let tagName = el.nodeName.toLowerCase();
      let className = el.className
      className = className.replace(' ', '.')
      if (className)
        tagName += `.${className}`
      if (tagName.slice(0,3) === 'div')
        tagName = tagName.slice(3)
      if (tagName !== 'div')
        path.unshift(tagName);
      if (tagName === '.root')
        break
      el = el.parentNode;
  }
  return path.join(" ");
}

const JsonDom = (props) => {
  const { data, display } = props;
  const { tagName = 'div', className = '', style = null, children = [] } = data;

  return React.createElement(
    tagName,
    {
      className,
      style,
      onMouseOver: (e) => {
        
        const rect = e.target.getBoundingClientRect()
        const boxData = {
          X: rect.x,
          Y: rect.bottom,
          Z: getStyle(e.target, "z-index"),
          Path: domPath(e.target)
        }
        if (display)
          display(boxData)
      }
    },
    _createChildren(children),
  );

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

export default JsonDom