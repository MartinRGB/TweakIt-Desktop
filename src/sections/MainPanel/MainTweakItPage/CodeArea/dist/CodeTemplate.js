"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("@emotion/styled");
var react_i18next_1 = require("react-i18next");
require("@Context/i18nContext");
var AnimatorTypeContext_1 = require("@Context/AnimatorTypeContext");
var Solver_1 = require("@Components/Solver");
var GraphUpdateContext_1 = require("@Context/GraphUpdateContext");
//import SpringFactorEvaluator from './SpringFactorEvaluator'
//import SpringFactorEvaluator from './SpringFactorEvaluator.js'
var SpringFactorEvaluator_worker_js_1 = require("./SpringFactorEvaluator.worker.js");
var CodeTemplate = react_1.memo(function (_a) {
    var name = _a.name, isActive = _a.isActive, style = _a.style;
    var _b = react_1.useContext(AnimatorTypeContext_1.AnimatorTypeContext), selectTransition = _b.selectTransition, durationData = _b.durationData, currentSolverData = _b.currentSolverData, currentAnimCalculator = _b.currentAnimCalculator, currentAnimPlatform = _b.currentAnimPlatform, currentAnimName = _b.currentAnimName, interpolatorName = _b.interpolatorName, iOSName = _b.iOSName, webName = _b.webName, flutterName = _b.flutterName, smartisanName = _b.smartisanName;
    // Or useRef() Performance Optim Here
    var _c = react_1.useContext(GraphUpdateContext_1.GraphUpdateContext), triggredIndex = _c.triggredIndex, bezierTriggeredIndex = _c.bezierTriggeredIndex;
    var calculator = currentAnimCalculator.replace("Calculator", "");
    var _d = react_1.useState(0), factorValue = _d[0], setFactorValue = _d[1];
    var _e = react_1.useState(true), canWokerWork = _e[0], setWorkerWork = _e[1];
    var AndroidSpringAnimationComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        // TODO in Worker Or By State
        //var evaluator = new SpringFactorEvaluator(cIF(mSolver['stiffness']),cIF(mSolver['damping']));
        //console.log(evaluator)
        // console.log(new SpringFactorEvaluator(cIF(mSolver['stiffness']),cIF(mSolver['dampingratio']),cIF(mSolver['damping']),cIF(mSolver['duration']),0,1))
        if (triggredIndex === -1) {
            var worker_1 = new SpringFactorEvaluator_worker_js_1["default"]();
            worker_1.postMessage([cIF(mSolver['stiffness']), cIF(mSolver['dampingratio'])]);
            worker_1.onmessage = function (e) {
                setFactorValue(e.data[1]);
                worker_1.terminate();
            };
        }
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null, "// Android Spring Animation"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringAnimation"),
            " springAnimation = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " ",
            react_1["default"].createElement(Class, null, "SpringAnimation"),
            ".([",
            react_1["default"].createElement(Property, null, "view"),
            "],[",
            react_1["default"].createElement(Property, null, "property"),
            "],[",
            react_1["default"].createElement(Property, null, "finalValue"),
            "]);",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringAnimation"),
            ".getSpring().setStiffness(",
            react_1["default"].createElement(Number, null, cIF(mSolver['stiffness'])),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringAnimation"),
            ".getSpring().setDampingRatio(",
            react_1["default"].createElement(Number, null, cIF(mSolver['dampingratio'])),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringAnimation"),
            ".setStartVelocity(",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// Facebook Rebound Animation"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/facebook/rebound" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringSystem"),
            " mSpringSystem = ",
            react_1["default"].createElement(Class, null, "SpringSystem"),
            ".create();",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "Spring"),
            " mSpring = ",
            react_1["default"].createElement(Class, null, "SpringSystem"),
            ".createSpring();",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "SpringConfig"),
            " mConfig = ",
            react_1["default"].createElement(Class, null, "SpringConfig"),
            ".fromBouncinessAndSpeed(",
            react_1["default"].createElement(Number, null, cIF(mSolver['bounciness'])),
            ",",
            react_1["default"].createElement(Number, null, cIF(mSolver['speed'])),
            ");",
            react_1["default"].createElement(Break, null),
            "mSpring.setSpringConfig(mConfig);",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// Custom Android Spring Interpolator"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/MartinRGB/Animer_Web/blob/master/CustomInterpolator/CustomSpringInterpolator.java" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "CustomSpringInterpolator"),
            " customSpringInterpolator = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " ",
            react_1["default"].createElement(Class, null, "CustomSpringInterpolator"),
            "(",
            react_1["default"].createElement(Number, null, factorValue),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "[ObjectAnimator]"),
            ".setInterpolator(customSpringInterpolator)",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "[ObjectAnimator]"),
            ".setDuration(",
            react_1["default"].createElement(Number, null, cIF(mSolver['duration']) * 1000),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// Custom RK4 Framer Physics Animator in Android"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/unixzii/android-SpringAnimator" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "Rk4SpringAnimator"),
            " animator = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " ",
            react_1["default"].createElement(Class, null, "Rk4SpringAnimator"),
            "();",
            react_1["default"].createElement(Break, null),
            "animator.setTension(",
            react_1["default"].createElement(Number, null, cIF(mSolver['tension'])),
            ");",
            react_1["default"].createElement(Break, null),
            "animator.setFriction(",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            ");",
            react_1["default"].createElement(Break, null),
            "animator.setVelocity(",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// Custom DHO Framer Physics Animator in Android"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/unixzii/android-SpringAnimator" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "DhoSpringAnimator"),
            " animator = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " ",
            react_1["default"].createElement(Class, null, "DhoSpringAnimator"),
            "();",
            react_1["default"].createElement(Break, null),
            "animator.setStiffness(",
            react_1["default"].createElement(Number, null, cIF(mSolver['tension'])),
            ");",
            react_1["default"].createElement(Break, null),
            "animator.setDamping(",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            ");",
            react_1["default"].createElement(Break, null),
            "animator.setMass(",
            react_1["default"].createElement(Number, null, cIF(mSolver['mass'])),
            ");",
            react_1["default"].createElement(Break, null),
            "animator.setVelocity(",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            ");"));
    };
    var iOSSpringAnimationComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null, "// iOS UIViewAnimate"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/uikit/uiview/1622594-animate" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "UIView"),
            ".animate(",
            react_1["default"].createElement(Break, null), "  ",
            "withDuration: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['duration'])),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "delay: ",
            react_1["default"].createElement(Number, null, "0"),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "usingSpringWithDamping: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['dampingratio'])),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "initialSpringVelocity: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "options: [],",
            react_1["default"].createElement(Break, null), "  ",
            "animations:",
            react_1["default"].createElement(Break, null), "  ", "{",
            react_1["default"].createElement(Break, null), "    ",
            react_1["default"].createElement(Comment, null, "// code here"),
            react_1["default"].createElement(Break, null), "  ", "}",
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "completion: nil",
            react_1["default"].createElement(Break, null),
            ")",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// iOS CASpringAnimation"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/quartzcore/caspringanimation" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Keyword, null, "let"),
            " spring = ",
            react_1["default"].createElement(Class, null, "CASpringAnimation"),
            "(keyPath:[",
            react_1["default"].createElement(Property, null, "property"),
            "])",
            react_1["default"].createElement(Break, null),
            "spring.stiffness = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['tension'])),
            react_1["default"].createElement(Break, null),
            "spring.damping = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            react_1["default"].createElement(Break, null),
            "spring.mass = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['mass'])),
            react_1["default"].createElement(Break, null),
            "spring.initialVelocity = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// Facebook POP Spring Animation"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/facebookarchive/pop" }, "[Repo]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Keyword, null, "let"),
            " spring = ",
            react_1["default"].createElement(Class, null, "POPSpringAnimation"),
            "(propertyNamed:[",
            react_1["default"].createElement(Property, null, "property"),
            "])",
            react_1["default"].createElement(Break, null),
            "spring.springBounciness = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['bounciness'])),
            react_1["default"].createElement(Break, null),
            "spring.springSpeed = ",
            react_1["default"].createElement(Number, null, cIF(mSolver['speed']))));
    };
    var WebSpringAnimationComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null, "// Facebook ReboundJS Spring Animation"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://github.com/facebook/rebound-js" }, "[Repo]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Keyword, null, "var"),
            " springSystem = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " ",
            react_1["default"].createElement(Class, null, "rebound.SpringSystem"),
            "();",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Keyword, null, "var"),
            " spring = ",
            react_1["default"].createElement(Class, null, "springSystem.rebound.createSpringWithBouncinessAndSpeed"),
            "(",
            react_1["default"].createElement(Number, null, cIF(mSolver['bounciness'])),
            ",",
            react_1["default"].createElement(Number, null, cIF(mSolver['speed'])),
            ");",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// (Legacy) Framer Classic RK4 Animation"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://classic.framer.com/docs/#layer.animate" }, "[API]"),
            react_1["default"].createElement(Break, null),
            "layerA = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " Layer",
            react_1["default"].createElement(Break, null),
            "animationA = ",
            react_1["default"].createElement(Keyword, null, "new"),
            " Animation layerA",
            react_1["default"].createElement(Break, null), "  ",
            "x:[",
            react_1["default"].createElement(Property, null, "parameter"),
            "]",
            react_1["default"].createElement(Break, null), "  ",
            "options:",
            react_1["default"].createElement(Break, null), "      ",
            "curve: ",
            react_1["default"].createElement(Class, null, "Spring"),
            "(tension:",
            react_1["default"].createElement(Number, null, cIF(mSolver['tension'])),
            ",friction:",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            ")",
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Comment, null, "// PopMotion | FramerMotion"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://popmotion.io/api/spring/" }, "[PopMotion API]"),
            "  ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://www.framer.com/api/animation/#spring" }, "[FramerMotion API]"),
            react_1["default"].createElement(Break, null),
            "spring(", "{",
            react_1["default"].createElement(Break, null), "  ",
            "from: [",
            react_1["default"].createElement(Property, null, "parameter"),
            "],",
            react_1["default"].createElement(Break, null), "  ",
            "to: [",
            react_1["default"].createElement(Property, null, "parameter"),
            "],",
            react_1["default"].createElement(Break, null), "  ",
            "stiffness: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['tension'])),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "damping: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "mass: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['mass'])),
            ",",
            react_1["default"].createElement(Break, null), "  ",
            "velocity: ",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity']) ? cIF(mSolver['velocity']) : 0),
            react_1["default"].createElement(Break, null), "}",
            ")"));
    };
    var FlutterSpringAnimationComponents = function () {
        return (WorkInProgressBlock());
    };
    var SmartisanSpringAnimationComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        //var evaluator = new SpringFactorEvaluator(cIF(mSolver['stiffness']),cIF(mSolver['damping']));
        //console.log(evaluator)
        return ((smartisanName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// Android Spring Animation"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Class, null, "SpringAnimation"),
                " springAnimation = ",
                react_1["default"].createElement(Keyword, null, "new"),
                " ",
                react_1["default"].createElement(Class, null, "SpringAnimation"),
                ".([",
                react_1["default"].createElement(Property, null, "view"),
                "],[",
                react_1["default"].createElement(Property, null, "property"),
                "],[",
                react_1["default"].createElement(Property, null, "finalValue"),
                "]);",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Class, null, "SpringAnimation"),
                ".getSpring().setStiffness(",
                react_1["default"].createElement(Number, null,
                    smartisanName,
                    ".SPRING_ANIMATION_STIFFNESS"),
                ");",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Class, null, "SpringAnimation"),
                ".getSpring().setDampingRatio(",
                react_1["default"].createElement(Number, null,
                    smartisanName,
                    ".SPRING_ANIMATION_DAMPING_RATIO"),
                ");",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Class, null, "SpringAnimation"),
                ".setStartVelocity(",
                react_1["default"].createElement(Number, null,
                    smartisanName,
                    ".SPRING_ANIMATION_START_VELOCITY"),
                ");",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Comment, null, "// Custom Spring Interpolator"),
                react_1["default"].createElement(Break, null),
                "animator.setInterpolator(",
                react_1["default"].createElement(Keyword, null, "new"),
                " ",
                react_1["default"].createElement(Class, null, "SpringInterpolator"),
                "(",
                react_1["default"].createElement(Number, null,
                    smartisanName,
                    ".PROPERTY_ANIMATION_INTERPOLATOR_FACTOR"),
                "))",
                react_1["default"].createElement(Break, null),
                "animator.setDuration(",
                react_1["default"].createElement(Number, null,
                    smartisanName,
                    ".PROPERTY_ANIMATION_DURATION"),
                ")")
            :
                CheckAndroidBlock());
    };
    var AndroidFlingAnimationComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null, "// Android Fling Animation"),
            " ",
            react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/androidx/dynamicanimation/animation/FlingAnimation.html" }, "[API]"),
            react_1["default"].createElement(Break, null),
            react_1["default"].createElement(Class, null, "FlingAnimation"),
            " flingAnimation = ",
            react_1["default"].createElement(Keyword, null, "new"),
            "  ",
            react_1["default"].createElement(Class, null, "FlingAnimation"),
            ".([",
            react_1["default"].createElement(Property, null, "view"),
            "],[",
            react_1["default"].createElement(Property, null, "property"),
            "]);",
            react_1["default"].createElement(Break, null),
            "flingAnimation.setStartVelocity(",
            react_1["default"].createElement(Number, null, cIF(mSolver['velocity'])),
            ");",
            react_1["default"].createElement(Break, null),
            "flingAnimation.setFriction(",
            react_1["default"].createElement(Number, null, cIF(mSolver['friction'])),
            ");"));
    };
    var WebFlingAnimationComponents = function () {
        return (NoReferenceBlock());
    };
    var iOSFlingAnimationComponents = function () {
        return (NoReferenceBlock());
    };
    var FlutterFlingAnimationComponents = function () {
        return (WorkInProgressBlock());
    };
    var SmartisanFlingAnimationComponents = function () {
        return (CheckAndroidBlock());
    };
    var AndroidInterpolatorComponents = function () {
        var paraStr = "";
        currentSolverData.map(function (data, index) {
            if (index != currentSolverData.length - 1)
                paraStr += (index === 0) ? "" + data : "," + data;
        });
        var duration = currentSolverData[currentSolverData.length - 1] * 1000;
        return ((currentAnimPlatform === 'Android') ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// Android Interpolator Animation"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/android/view/animation/Interpolator" }, "[API]"),
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setInterpolator(new ",
                react_1["default"].createElement(Class, null,
                    currentAnimName,
                    "Interpolator"),
                "(",
                react_1["default"].createElement(Number, null, paraStr),
                "));",
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setDuration(",
                react_1["default"].createElement(Number, null, duration),
                ");")
            :
                NoReferenceBlock());
    };
    var WebInterpolatorComponents = function () {
        return (NoReferenceBlock());
    };
    var iOSInterpolatorComponents = function () {
        return (NoReferenceBlock());
    };
    var FlutterInterpolatorComponents = function () {
        return ((flutterName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// Flutter Curves"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://api.flutter.dev/flutter/animation/Curves-class.html" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "const"),
                " ",
                react_1["default"].createElement(Class, null, "Curve"),
                " curve = ",
                react_1["default"].createElement(Class, null, "Curves"),
                ".",
                react_1["default"].createElement(Number, null, firstLetterLower(flutterName)),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null))
            :
                NoReferenceBlock());
    };
    var SmartisanInterpolatorComponents = function () {
        return (CheckAndroidBlock());
    };
    var AndroidCubicBezierComponents = function () {
        // Android 3 Interpolator
        var p1x = currentSolverData[0][0];
        var p1y = currentSolverData[0][1];
        var p2x = currentSolverData[0][2];
        var p2y = currentSolverData[0][3];
        var duration = currentSolverData[currentSolverData.length - 1] * 1000;
        return ((interpolatorName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null,
                    "// Android ",
                    interpolatorName,
                    "Interpolator Animation (In Mateiral Components)"),
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setInterpolator(new ",
                react_1["default"].createElement(Class, null,
                    interpolatorName,
                    "Interpolator"),
                "();",
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setDuration(",
                react_1["default"].createElement(Number, null, duration),
                ");",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Comment, null, "// Android PathInterpolator(Cubic Bezier) Animation"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/android/view/animation/PathInterpolator" }, "[API]"),
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setInterpolator(new ",
                react_1["default"].createElement(Class, null, "PathInterpolator"),
                "(",
                react_1["default"].createElement(Number, null, p1x),
                ",",
                react_1["default"].createElement(Number, null, p1y),
                ",",
                react_1["default"].createElement(Number, null, p2x),
                ",",
                react_1["default"].createElement(Number, null, p2y),
                "));",
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setDuration(",
                react_1["default"].createElement(Number, null, duration),
                ");")
            :
                react_1["default"].createElement(CodeDiv, null,
                    react_1["default"].createElement(Comment, null, "// Android PathInterpolator(Cubic Bezier) Animation"),
                    " ",
                    react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.android.com/reference/android/view/animation/PathInterpolator" }, "[API]"),
                    react_1["default"].createElement(Break, null),
                    "[",
                    react_1["default"].createElement(Class, null, "Animator"),
                    "].setInterpolator(new ",
                    react_1["default"].createElement(Class, null, "PathInterpolator"),
                    "(",
                    react_1["default"].createElement(Number, null, p1x),
                    ",",
                    react_1["default"].createElement(Number, null, p1y),
                    ",",
                    react_1["default"].createElement(Number, null, p2x),
                    ",",
                    react_1["default"].createElement(Number, null, p2y),
                    "));",
                    react_1["default"].createElement(Break, null),
                    "[",
                    react_1["default"].createElement(Class, null, "Animator"),
                    "].setDuration(",
                    react_1["default"].createElement(Number, null, duration),
                    ");"));
    };
    var iOSCubicBezierComponents = function () {
        var p1x = currentSolverData[0][0];
        var p1y = currentSolverData[0][1];
        var p2x = currentSolverData[0][2];
        var p2y = currentSolverData[0][3];
        var duration = currentSolverData[currentSolverData.length - 1];
        return ((iOSName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// iOS UIView Animation with UICubicTimingParameters"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/uikit/uicubictimingparameters" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "let"),
                " cubicTimingParameters = ",
                react_1["default"].createElement(Class, null, "UICubicTimingParameters"),
                "(",
                react_1["default"].createElement(Break, null), "  ",
                "controlPoint1: ",
                react_1["default"].createElement(Class, null, "CGPoint"),
                "(x: ",
                react_1["default"].createElement(Number, null, p1x),
                ",y: ",
                react_1["default"].createElement(Number, null, p1y),
                "),",
                react_1["default"].createElement(Break, null), "  ",
                "controlPoint2: ",
                react_1["default"].createElement(Class, null, "CGPoint"),
                "(x: ",
                react_1["default"].createElement(Number, null, p2x),
                ",y: ",
                react_1["default"].createElement(Number, null, p2y),
                ")",
                react_1["default"].createElement(Break, null),
                ")",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "let"),
                " animator = ",
                react_1["default"].createElement(Class, null, "UIViewPropertyAnimator"),
                "(",
                react_1["default"].createElement(Break, null), "  ",
                "duration: [",
                react_1["default"].createElement(Number, null, duration),
                "],",
                react_1["default"].createElement(Break, null), "  ",
                "timingParameters: cubicTimingParameters",
                react_1["default"].createElement(Break, null),
                ")",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Comment, null, "// iOS Core Animation with CAMediaTimingFunction"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/quartzcore/camediatimingfunction" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "let"),
                " animation = ",
                react_1["default"].createElement(Class, null, "CABasicAnimation"),
                "(keyPath: [",
                react_1["default"].createElement(Property, null, "keyPath"),
                "])",
                react_1["default"].createElement(Break, null),
                "animation.timingFunction = ",
                react_1["default"].createElement(Class, null, "CAMediaTimingFunction"),
                "(controlPoints: ",
                react_1["default"].createElement(Number, null, p1x),
                ",",
                react_1["default"].createElement(Number, null, p1y),
                ",",
                react_1["default"].createElement(Number, null, p2x),
                ",",
                react_1["default"].createElement(Number, null, p2y),
                ")",
                react_1["default"].createElement(Break, null),
                "animation.duration = ",
                react_1["default"].createElement(Number, null, duration),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Comment, null, "// iOS UIView Animation with default presets"),
                "  ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/uikit/uiview/animationcurve" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "let"),
                " animator = ",
                react_1["default"].createElement(Class, null, "UIViewPropertyAnimator"),
                "(",
                react_1["default"].createElement(Break, null), "  ",
                "duration: [",
                react_1["default"].createElement(Number, null, duration),
                "],",
                react_1["default"].createElement(Break, null), "  ",
                "curve: .",
                react_1["default"].createElement(Number, null, firstLetterLower(iOSName)),
                react_1["default"].createElement(Break, null),
                ")", "{",
                react_1["default"].createElement(Comment, null, "// code here"), "}")
            :
                react_1["default"].createElement(CodeDiv, null,
                    react_1["default"].createElement(Comment, null, "// iOS UIView Animation with UICubicTimingParameters"),
                    " ",
                    react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/uikit/uicubictimingparameters" }, "[API]"),
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "let"),
                    " cubicTimingParameters = ",
                    react_1["default"].createElement(Class, null, "UICubicTimingParameters"),
                    "(",
                    react_1["default"].createElement(Break, null), "  ",
                    "controlPoint1: ",
                    react_1["default"].createElement(Class, null, "CGPoint"),
                    "(x: ",
                    react_1["default"].createElement(Number, null, p1x),
                    ",y: ",
                    react_1["default"].createElement(Number, null, p1y),
                    "),",
                    react_1["default"].createElement(Break, null), "  ",
                    "controlPoint2: ",
                    react_1["default"].createElement(Class, null, "CGPoint"),
                    "(x: ",
                    react_1["default"].createElement(Number, null, p2x),
                    ",y: ",
                    react_1["default"].createElement(Number, null, p2y),
                    ")",
                    react_1["default"].createElement(Break, null),
                    ")",
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "let"),
                    " animator = ",
                    react_1["default"].createElement(Class, null, "UIViewPropertyAnimator"),
                    "(",
                    react_1["default"].createElement(Break, null), "  ",
                    "duration: [",
                    react_1["default"].createElement(Number, null, duration),
                    "],",
                    react_1["default"].createElement(Break, null), "  ",
                    "timingParameters: cubicTimingParameters",
                    react_1["default"].createElement(Break, null),
                    ")",
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Comment, null, "// iOS Core Animation with CAMediaTimingFunction"),
                    " ",
                    react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.apple.com/documentation/quartzcore/camediatimingfunction" }, "[API]"),
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "let"),
                    " animation = ",
                    react_1["default"].createElement(Class, null, "CABasicAnimation"),
                    "(keyPath: [",
                    react_1["default"].createElement(Property, null, "keyPath"),
                    "])",
                    react_1["default"].createElement(Break, null),
                    "animation.timingFunction = ",
                    react_1["default"].createElement(Class, null, "CAMediaTimingFunction"),
                    "(controlPoints: ",
                    react_1["default"].createElement(Number, null, p1x),
                    ",",
                    react_1["default"].createElement(Number, null, p1y),
                    ",",
                    react_1["default"].createElement(Number, null, p2x),
                    ",",
                    react_1["default"].createElement(Number, null, p2y),
                    ")",
                    react_1["default"].createElement(Break, null),
                    "animation.duration = ",
                    react_1["default"].createElement(Number, null, duration)));
    };
    var WebCubicBezierComponents = function () {
        var p1x = currentSolverData[0][0];
        var p1y = currentSolverData[0][1];
        var p2x = currentSolverData[0][2];
        var p2y = currentSolverData[0][3];
        var duration = currentSolverData[currentSolverData.length - 1];
        return ((webName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// CSS TimingFunctions"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "transition-timing-function"),
                ": ",
                react_1["default"].createElement(Class, null, firstLetterLower(webName)),
                " or ",
                react_1["default"].createElement(Class, null, "cubic-bezier"),
                "(",
                react_1["default"].createElement(Number, null, p1x),
                ",",
                react_1["default"].createElement(Number, null, p1y),
                ",",
                react_1["default"].createElement(Number, null, p2x),
                ",",
                react_1["default"].createElement(Number, null, p2y),
                ");",
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "transition-duration"),
                ": ",
                react_1["default"].createElement(Number, null,
                    duration,
                    "s"),
                ";")
            :
                react_1["default"].createElement(CodeDiv, null,
                    react_1["default"].createElement(Comment, null, "// CSS TimingFunctions"),
                    " ",
                    react_1["default"].createElement(Link, { target: "_blank", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function" }, "[API]"),
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "transition-timing-function"),
                    ": ",
                    react_1["default"].createElement(Class, null, "cubic-bezier"),
                    "(",
                    react_1["default"].createElement(Number, null, p1x),
                    ",",
                    react_1["default"].createElement(Number, null, p1y),
                    ",",
                    react_1["default"].createElement(Number, null, p2x),
                    ",",
                    react_1["default"].createElement(Number, null, p2y),
                    ");",
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "transition-duration"),
                    ": ",
                    react_1["default"].createElement(Number, null,
                        duration,
                        "s"),
                    ";"));
    };
    var FlutterCubicBezierComponents = function () {
        var p1x = currentSolverData[0][0];
        var p1y = currentSolverData[0][1];
        var p2x = currentSolverData[0][2];
        var p2y = currentSolverData[0][3];
        return ((flutterName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// Flutter Curves"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://api.flutter.dev/flutter/animation/Curves-class.html" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "const"),
                " ",
                react_1["default"].createElement(Class, null, "Curve"),
                " curve = ",
                react_1["default"].createElement(Class, null, "Curves"),
                ".",
                react_1["default"].createElement(Number, null, firstLetterLower(flutterName)),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Comment, null, "// Flutter Cubic"),
                " ",
                react_1["default"].createElement(Link, { target: "_blank", href: "https://api.flutter.dev/flutter/animation/Cubic-class.html" }, "[API]"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Keyword, null, "const"),
                " ",
                react_1["default"].createElement(Class, null, "Curve"),
                " curve = ",
                react_1["default"].createElement(Class, null, "Cubic"),
                "(",
                react_1["default"].createElement(Number, null, p1x),
                ",",
                react_1["default"].createElement(Number, null, p1y),
                ",",
                react_1["default"].createElement(Number, null, p2x),
                ",",
                react_1["default"].createElement(Number, null, p2y),
                ")")
            :
                react_1["default"].createElement(CodeDiv, null,
                    react_1["default"].createElement(Comment, null, "// Flutter Cubic"),
                    " ",
                    react_1["default"].createElement(Link, { target: "_blank", href: "https://api.flutter.dev/flutter/animation/Cubic-class.html" }, "[API]"),
                    react_1["default"].createElement(Break, null),
                    react_1["default"].createElement(Keyword, null, "const"),
                    " ",
                    react_1["default"].createElement(Class, null, "Curve"),
                    " curve = ",
                    react_1["default"].createElement(Class, null, "Cubic"),
                    "(",
                    react_1["default"].createElement(Number, null, p1x),
                    ",",
                    react_1["default"].createElement(Number, null, p1y),
                    ",",
                    react_1["default"].createElement(Number, null, p2x),
                    ",",
                    react_1["default"].createElement(Number, null, p2y),
                    ")"));
    };
    var SmartisanCubicBezierComponents = function () {
        var duration = currentSolverData[currentSolverData.length - 1] * 1000;
        return ((smartisanName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null, "// Universal Easing Presets"),
                react_1["default"].createElement(Break, null),
                react_1["default"].createElement(Class, null, "Interpolator"),
                " interpolator = ",
                react_1["default"].createElement(Class, null, "CubicBezierPreset"),
                ".getBezierInterpolator(",
                react_1["default"].createElement(Number, null,
                    "CubicBezierPreset.CurveType.",
                    smartisanName),
                ");",
                react_1["default"].createElement(Break, null),
                "animator.setInterpolator(interpolator)",
                react_1["default"].createElement(Break, null),
                "animator.setDuration(",
                react_1["default"].createElement(Number, null, duration),
                ")")
            :
                CheckAndroidBlock());
    };
    var AndroidDoubleCubicBezierComponents = function () {
        var duration = currentSolverData[currentSolverData.length - 1] * 1000;
        return ((interpolatorName) ?
            react_1["default"].createElement(CodeDiv, null,
                react_1["default"].createElement(Comment, null,
                    "// Android ",
                    interpolatorName,
                    "Interpolator Animation (In Mateiral Components)"),
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setInterpolator(new ",
                react_1["default"].createElement(Class, null,
                    interpolatorName,
                    "Interpolator"),
                "();",
                react_1["default"].createElement(Break, null),
                "[",
                react_1["default"].createElement(Class, null, "Animator"),
                "].setDuration(",
                react_1["default"].createElement(Number, null, duration),
                ");")
            :
                NoReferenceBlock());
    };
    var iOSDoubleCubicBezierComponents = function () {
        return (NoReferenceBlock());
    };
    var WebDoubleCubicBezierComponents = function () {
        return (NoReferenceBlock());
    };
    var FlutterDoubleCubicBezierComponents = function () {
        return (NoReferenceBlock());
    };
    var SmartisanDoubleCubicBezierComponents = function () {
        return (NoReferenceBlock());
    };
    var UniversalDataComponents = function () {
        var mSolver = Solver_1["default"].CreateSolverByString(currentAnimCalculator, currentAnimPlatform, currentAnimName, currentSolverData);
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null, "// Data Length is "),
            react_1["default"].createElement(Keyword, null, mSolver.getValueArray().length),
            react_1["default"].createElement(Number, null, mSolver.getValueArray().toString())));
    };
    var NoReferenceBlock = function () {
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null,
                "\uD83C\uDF78\uD83C\uDF78\uD83C\uDF78 ",
                react_1["default"].createElement(react_i18next_1.Trans, null, "No reference"),
                " \uD83C\uDF78\uD83C\uDF78\uD83C\uDF78")));
    };
    var WorkInProgressBlock = function () {
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null,
                "\uD83E\uDD43\uD83E\uDD43\uD83E\uDD43 ",
                react_1["default"].createElement(react_i18next_1.Trans, null, "Work In Progress"),
                " \uD83E\uDD43\uD83E\uDD43\uD83E\uDD43")));
    };
    var CheckAndroidBlock = function () {
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null,
                "\uD83C\uDF77\uD83C\uDF77\uD83C\uDF77 ",
                react_1["default"].createElement(react_i18next_1.Trans, null, "Check Android Sections"),
                " \uD83C\uDF77\uD83C\uDF77\uD83C\uDF77")));
    };
    var DataLoadingBlock = function () {
        return (react_1["default"].createElement(CodeDiv, null,
            react_1["default"].createElement(Comment, null,
                "\u231B\u231B\u231B ",
                react_1["default"].createElement(react_i18next_1.Trans, null, "Loading..."),
                " \u231B\u231B\u231B")));
    };
    var finalResult = function () {
        if (name && calculator && isActive) {
            if ((triggredIndex === -1 && bezierTriggeredIndex === -1)) {
                ((name != "Data") ? eval("" + name + calculator + "Components()") : UniversalDataComponents());
            }
            else {
                DataLoadingBlock();
            }
        }
        else {
            NoReferenceBlock();
        }
    };
    return (react_1["default"].createElement("div", { style: __assign({}, style) }, 
    // (name && calculator && isActive && (triggredIndex === -1 && bezierTriggeredIndex === -1))?((name != "Data")?
    //   eval(`${name}${calculator}Components()`)
    //   :
    //   UniversalDataComponents())
    // :
    // NoReferenceBlock()
    // <WebWorker url={new Worker("./SpringFactorEvaluator.js")}>
    //   {({ data, error, postMessage }) => {
    //     return(
    //     <div>
    //       <div>
    //           <strong>Received some data:</strong>
    //           <pre>{data}</pre>
    //       </div>
    //       <button onClick={() => postMessage([1500,0.5,21,0.33,0,1])}>Hello</button>
    //     </div>)
    //   }}
    // </WebWorker>
    (name && calculator && isActive) ?
        //(triggredIndex === -1 && bezierTriggeredIndex === -1)?
        ((name != "Data") ?
            eval("" + name + calculator + "Components()")
            :
                UniversalDataComponents())
        // :
        // DataLoadingBlock()
        :
            NoReferenceBlock()));
});
exports["default"] = CodeTemplate;
// chekcIfExsit
var cIF = function (val) {
    return val ? val.toFixed(2) : '';
};
var firstLetterLower = function (str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
var CodeDiv = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  white-space:pre-wrap;\n  overflow-wrap: break-word;\n  padding-right: 12px;\n  \n  ::selection {\n    background: ", ";\n  }\n  margin-bottom: 14px;\n"], ["\n  white-space:pre-wrap;\n  overflow-wrap: break-word;\n  padding-right: 12px;\n  \n  ::selection {\n    background: ", ";\n  }\n  margin-bottom: 14px;\n"])), function (p) { return p.theme.colors.selection; });
var Comment = styled_1["default"].p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color:#9D9DB2; //grey\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#9D9DB2; //grey\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Link = styled_1["default"].a(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color:#0DB5FF; //blue\n  display: inline-block;\n  text-decoration: none;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#0DB5FF; //blue\n  display: inline-block;\n  text-decoration: none;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Class = styled_1["default"].p(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color:#F50579; //blue\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#F50579; //blue\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Number = styled_1["default"].p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  color:#0adf07; //green\n  display: inline-block;\n  word-break: break-all;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#0adf07; //green\n  display: inline-block;\n  word-break: break-all;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Keyword = styled_1["default"].p(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color:#6e41d1; //purple\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#6e41d1; //purple\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Property = styled_1["default"].p(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color:#ff9f0f; //orange\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  color:#ff9f0f; //orange\n  display: inline-block;\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var Break = styled_1["default"].br(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  ::selection {\n    background: ", ";\n  }\n"], ["\n  ::selection {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.colors.selection; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
