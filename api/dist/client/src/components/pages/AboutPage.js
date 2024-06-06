"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Circle_1 = __importDefault(require("../Circle"));
const AboutPage = () => {
    const [divVisibility, setDivVisibility] = (0, react_1.useState)({});
    const toggleDivVisibility = (buttonId) => {
        setDivVisibility((prevVisibility) => (Object.assign(Object.assign({}, prevVisibility), { [buttonId]: !prevVisibility[buttonId] })));
    };
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "antialiased bg-body text-body font-body", children: (0, jsx_runtime_1.jsx)("section", { className: "pt-8 py-12 md:py-24", children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap -m-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full md:w-1/3 p-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-6xl sm:text-9xl xl:text-11xl font-semibold mb-10 font-heading text-neutral-900", children: "FAQ" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xl font-medium max-w-3xl text-neutral-400", children: ["If you have any questions that aren't answered here, please contact us at", " ", (0, jsx_runtime_1.jsx)("a", { href: "mailto: banthisbreed@gmail.com", children: "banthisbreed@gmail.com" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full md:w-2/3 p-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pt-4 pb-8 border-t border-neutral-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl sm:text-3xl font-semibold font-heading text-neutral-700 text-left", children: "What is the purpose of this test?" }), (0, jsx_runtime_1.jsx)(Circle_1.default, { buttonId: "q1", toggle: toggleDivVisibility })] }), divVisibility["q1"] && ((0, jsx_runtime_1.jsx)("div", { className: "mt-5 text-left", children: "This assessment is intended to provide participants with an opportunity to learn more about the limitations of visual breed identification, as well as how individual biases can influence the way that we perceive dogs." }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-4 pb-8 border-t border-neutral-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl sm:text-3xl font-semibold font-heading text-neutral-700 text-left", children: "How does the test work?" }), (0, jsx_runtime_1.jsx)(Circle_1.default, { buttonId: "q2", toggle: toggleDivVisibility })] }), divVisibility["q2"] && ((0, jsx_runtime_1.jsx)("div", { className: "mt-5 text-left", children: "This test is designed to measure how accurately pit bulls can be identified based on observed physical characteristics. The assessment relies on how individual participants classify pit bulls according to breed makeup, as well as the amount of pit bull DNA present in a dog's genetic profile." }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-4 pb-8 border-t border-neutral-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl sm:text-3xl font-semibold font-heading text-neutral-700 text-left", children: "Where do the DNA results come from?" }), (0, jsx_runtime_1.jsx)(Circle_1.default, { buttonId: "q3", toggle: toggleDivVisibility })] }), divVisibility["q3"] && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-5 text-left", children: ["Data used in this assessment were gathered at random from public sources. Some of the companies that provide DNA testing services for dogs include", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://shop.embarkvet.com", target: "_blank", children: "Embark" }), ",", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://www.wisdompanel.com/", target: "_blank", children: "Wisdom Panel" }), ",", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://www.dnamydog.com/", target: "_blank", children: "DNA My Dog" }), ", and", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://www.orivet.com/", target: "_blank", children: "Orivet" }), ". Because Embark is widely considered to be one of the most accurate DNA test kits for dogs, this project will use Embark's results to compare against visual breed identifications."] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-4 pb-8 border-t border-neutral-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl sm:text-3xl font-semibold font-heading text-neutral-700 text-left", children: "What are the limitations of using DNA to identify breeds?" }), (0, jsx_runtime_1.jsx)(Circle_1.default, { buttonId: "q4", toggle: toggleDivVisibility })] }), divVisibility["q4"] && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-5 text-left", children: [(0, jsx_runtime_1.jsx)("p", { children: "DNA testing can only detect breeds that are present in a dog's immediate ancestry, and ancestors more than four generations back may not be detected at all. The accuracy of DNA tests can also vary significantly between different companies and tests." }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2", children: "Additionally, some breeds can be especially difficult to distinguish from one another due to their common ancestry. For example, the genetic profiles of the American Pit Bull Terrier and the American Staffordshire Terrier are very similar, as they are closely related breeds." })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-4 pb-8 border-t border-neutral-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl sm:text-3xl font-semibold font-heading text-neutral-700 text-left", children: "How will the results be used?" }), (0, jsx_runtime_1.jsx)(Circle_1.default, { buttonId: "q5", toggle: toggleDivVisibility })] }), divVisibility["q5"] && ((0, jsx_runtime_1.jsx)("div", { className: "mt-5 text-left", children: "This project was developed for educational and entertainment purposes by a private third party and is not a part of any official government or academic research. It is not affiliated with Embark or any other DNA testing service. The results of this test are not intended to promote any specific breed or type of dog." }))] }), (0, jsx_runtime_1.jsx)("div", { className: "container w-full mt-6", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/1", className: "inline-flex items-center justify-center text-center h-16 p-5 font-semibold text-lg text-white tracking-tight bg-neutral-900 hover:bg-neutral-200 focus:bg-neutral-200 rounded-lg focus:ring-4 focus:ring-neutral-300 transition duration-200", children: "Go Back" }) })] })] }) }) }) }) }));
};
exports.default = AboutPage;
