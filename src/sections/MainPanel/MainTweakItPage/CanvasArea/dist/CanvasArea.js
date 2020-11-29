"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var CanvasTitle_1 = require("./CanvasTitle");
var CanvasInput_1 = require("./CanvasInput");
var CanvasSVG_1 = require("./CanvasSVG");
var init_state_json_1 = require("@Config/init_state.json");
var CanvasArea = function (_a) {
    var children = _a.children;
    var svgWidth = init_state_json_1["default"].svgWidth;
    var svgHeight = init_state_json_1["default"].svgHeight;
    var svgScale = init_state_json_1["default"].svgScale;
    var svgStrokeWidth = init_state_json_1["default"].svgStrokeWidth;
    var svgPointNumber = init_state_json_1["default"].svgPointNumber;
    var svgPointScale = init_state_json_1["default"].svgPointScale;
    var viewBoxHFixed = svgHeight * init_state_json_1["default"].viewBoxFixedScale;
    var viewBoxWFixed = svgWidth * init_state_json_1["default"].viewBoxFixedScale;
    var extendLineScale = init_state_json_1["default"].extendLineScale;
    // ############ Reszie ############
    var sizeRef = react_1.useRef(null);
    var _b = react_1.useState(false), isLayoutRow = _b[0], setIsLayoutRow = _b[1];
    function updateSize() {
        var height = sizeRef.current.offsetHeight;
        var width = sizeRef.current.offsetWidth;
        if (width >= 680) {
            setIsLayoutRow(true);
        }
        else {
            setIsLayoutRow(false);
        }
    }
    react_1.useLayoutEffect(function () {
        updateSize();
        window.addEventListener("resize", updateSize);
        return function () {
            return window.removeEventListener("resize", updateSize);
        };
    }, []);
    react_1.useEffect(function () {
        if (sizeRef.current) {
            updateSize();
        }
    }, [sizeRef]);
    return (react_1["default"].createElement(Container, { ref: sizeRef, isLayoutRow: isLayoutRow },
        react_1["default"].createElement(GraphContainer, { isLayoutRow: isLayoutRow },
            react_1["default"].createElement(CanvasTitle_1["default"], null),
            react_1["default"].createElement(CanvasSVG_1["default"], { isLayoutRow: isLayoutRow, svgWidth: svgWidth, svgHeight: svgHeight, svgScale: svgScale, svgStrokeWidth: svgStrokeWidth, svgPointNumber: svgPointNumber, svgPointScale: svgPointScale, viewBoxHFixed: viewBoxHFixed, viewBoxWFixed: viewBoxWFixed, extendLineScale: extendLineScale })),
        react_1["default"].createElement(InputContainer, { isLayoutRow: isLayoutRow },
            react_1["default"].createElement(CanvasInput_1["default"], null))));
};
exports["default"] = CanvasArea;
var GraphContainer = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 2;\n  height:100%;\n  position:relative;\n  box-shadow: ", "\n  \n"], ["\n  flex: 2;\n  height:100%;\n  position:relative;\n  box-shadow: ", "\n  \n"])), function (p) { return p.isLayoutRow ? "1px 0px 0px " + p.theme.colors.adb_border + ",-1px 0px 0px " + p.theme.colors.adb_border : 'none'; });
var Container = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 100%;\n    background:", ";\n    display: flex;\n    //padding:24px 0px;\n    position: relative;\n    flex-direction: ", ";\n    align-items:", ";\n    flex:2;\n    min-width:250px;\n    // max-width:680px;\n    z-index:1;\n    box-shadow: 1px 0px 0px ", ",-1px 0px 0px ", ";\n"], ["\n    height: 100%;\n    background:", ";\n    display: flex;\n    //padding:24px 0px;\n    position: relative;\n    flex-direction: ", ";\n    align-items:", ";\n    flex:2;\n    min-width:250px;\n    // max-width:680px;\n    z-index:1;\n    box-shadow: 1px 0px 0px ", ",-1px 0px 0px ", ";\n"
    // const SVGContainer = styled.div<{
    //   isLayoutRow:boolean
    //   svgHeight:number;
    // }>`
    //   display:block;
    //   height: ${p => p.svgHeight}px;
    //   position: ${p => p.isLayoutRow?'absolute':'relative'};
    //   left: ${p => p.isLayoutRow?'50%':'0'};
    //   top: ${p => p.isLayoutRow?'50%':'0'};
    //   transform: ${p => p.isLayoutRow?'translate3d(-50%, -50%, 0px)':'translate3d(0, 0, 0px)'};
    // `
])), function (p) { return p.theme.colors.main_top_bg; }, function (p) { return p.isLayoutRow ? 'row' : 'column'; }, function (p) { return p.isLayoutRow ? 'center' : 'initial'; }, function (p) { return p.theme.colors.adb_border; }, function (p) { return p.theme.colors.adb_border; });
// const SVGContainer = styled.div<{
//   isLayoutRow:boolean
//   svgHeight:number;
// }>`
//   display:block;
//   height: ${p => p.svgHeight}px;
//   position: ${p => p.isLayoutRow?'absolute':'relative'};
//   left: ${p => p.isLayoutRow?'50%':'0'};
//   top: ${p => p.isLayoutRow?'50%':'0'};
//   transform: ${p => p.isLayoutRow?'translate3d(-50%, -50%, 0px)':'translate3d(0, 0, 0px)'};
// `
var InputContainer = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  z-index:10;\n  flex: 3;\n  padding: 0 ", ";\n"], ["\n  z-index:10;\n  flex: 3;\n  padding: 0 ", ";\n"])), function (p) { return p.isLayoutRow ? '24px' : '0'; });
var templateObject_1, templateObject_2, templateObject_3;
