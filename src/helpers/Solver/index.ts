// Social

import {
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    LookupTableCalculator,
    HorizontalLineCalculator} from '@Helpers/Solver/Calculator/BaseCalculator'
    
import {
    CreateSolverByString
} from '@Helpers/Solver/CreateSolverByString'

import Android from'@Helpers/Solver/Calculator/platform/Android'
import iOS from'@Helpers/Solver/Calculator/platform/iOS'
import Fluent from'@Helpers/Solver/Calculator/platform/Fluent'
import Flutter from'@Helpers/Solver/Calculator/platform/Flutter'
import Web from'@Helpers/Solver/Calculator/platform/Web'
import BezierCurve from'@Helpers/Solver/Calculator/platform/BezierCurve'
import DesignTools from'@Helpers/Solver/Calculator/platform/DesignTools'
import Default from'@Helpers/Solver/Calculator/platform/Default'

const Solver = {
    Android,
    iOS,
    Fluent,
    Flutter,
    Web,
    BezierCurve,
    DesignTools,
    Default,
    setCalculatorSamplePointNumber,
    setCalculatorSampleScale,
    CreateSolverByString,
    LookupTableCalculator,
    HorizontalLineCalculator,
}

export default Solver
