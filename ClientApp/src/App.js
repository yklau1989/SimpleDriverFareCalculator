"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var TaxiDriver_1 = require("./components/TaxiDriver");
var Calculator_1 = require("./components/Calculator");
require("./custom.css");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.default }),
    React.createElement(react_router_1.Route, { path: '/taxiDriver', component: TaxiDriver_1.default }),
    React.createElement(react_router_1.Route, { path: '/calculator', component: Calculator_1.default }))); });
//# sourceMappingURL=App.js.map