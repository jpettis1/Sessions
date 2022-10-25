import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactDomClient from 'react-dom/client';
/*
For internal FullCalendar testing.
The vdom.ts file is always used for built usage.
*/
var rootMap = new WeakMap();
function render(vdomNode, el) {
    var existingRoot = rootMap.get(el);
    if (existingRoot) {
        existingRoot.render(vdomNode);
    }
    else {
        var root = reactDomClient.createRoot(el);
        root.render(vdomNode);
        rootMap.set(el, root);
    }
}
function unmountComponentAtNode(el) {
    var root = rootMap.get(el);
    if (root) {
        root.unmount();
        rootMap.delete(el);
    }
}
(typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = {
    Component: react.Component,
    createElement: react.createElement,
    render: render,
    createRef: react.createRef,
    Fragment: react.Fragment,
    createContext: react.createContext,
    createPortal: reactDom.createPortal,
    flushSync: reactDom.flushSync,
    unmountComponentAtNode: unmountComponentAtNode
};
//# sourceMappingURL=vdom-test-react18.js.map