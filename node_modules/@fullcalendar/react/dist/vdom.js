import * as react from 'react';
import * as reactDom from 'react-dom';
(typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = {
    Component: react.Component,
    createElement: react.createElement,
    render: reactDom.render,
    createRef: react.createRef,
    Fragment: react.Fragment,
    createContext: react.createContext,
    createPortal: reactDom.createPortal,
    flushSync: flushSync,
    unmountComponentAtNode: reactDom.unmountComponentAtNode // never called by FullCalendar's React component
};
export function flushSync(callback) {
    // always sync from top-level
    callback();
}
//# sourceMappingURL=vdom.js.map