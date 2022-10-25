'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactDom = require('react-dom');

(typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = {
    Component: React.Component,
    createElement: React.createElement,
    render: reactDom.render,
    createRef: React.createRef,
    Fragment: React.Fragment,
    createContext: React.createContext,
    createPortal: reactDom.createPortal,
    flushSync: flushSync,
    unmountComponentAtNode: reactDom.unmountComponentAtNode // never called by FullCalendar's React component
};
function flushSync(callback) {
    // always sync from top-level
    callback();
}

exports.flushSync = flushSync;
