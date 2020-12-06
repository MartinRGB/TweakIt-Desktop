import React ,{memo,useContext, useEffect,useState,useRef} from 'react';

import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import Icons from '@Assets/icons'
import Solver from '@Helpers/Solver'
import { GraphUpdateContext } from '@Context/GraphUpdateContext'
import WebWorker from "react-webworker"
//import SpringFactorEvaluator from './SpringFactorEvaluator'
//import SpringFactorEvaluator from './SpringFactorEvaluator.js'
import SpringFactorEvaluatorWorker from "./SpringFactorEvaluator.worker.js";
import CodeTexts from '@Components/CodeTexts'

export interface ICodeSnippet{
  name?:string;
  isActive?:boolean;
  style?:any;
}


const CodeTemplate: React.FC<ICodeSnippet> = memo(({name,isActive,style}) => {

  const {selectTransition,durationData,currentSolverData,currentAnimCalculator,currentAnimPlatform,currentAnimName,interpolatorName,iOSName,webName,flutterName,smartisanName} = useContext(
    AnimatorTypeContext
  );


  // Or useRef() Performance Optim Here
  const {triggredIndex,bezierTriggeredIndex} = useContext(
    GraphUpdateContext
  );

  const calculator = currentAnimCalculator.replace("Calculator","");
  const [factorValue,setFactorValue] = useState<number>(0)
  const [canWokerWork,setWorkerWork] = useState<boolean>(true)


  const Comment = CodeTexts.Grey;
  const Class = CodeTexts.Red;
  const Number = CodeTexts.Green;
  const Keyword = CodeTexts.Purple;
  const Property = CodeTexts.Orange;
  const Link = CodeTexts.Link;
  const Break = CodeTexts.Break;


  const AndroidSpringAnimationComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);


    // TODO WorkerPerformance
    if(triggredIndex === -1){
        var worker = new SpringFactorEvaluatorWorker();
        worker.postMessage([cIF(mSolver['stiffness']),cIF(mSolver['dampingratio'])]);
        worker.onmessage = function (e:any) {
          setFactorValue(e.data[1]);
          worker.terminate()
        };
    }


    return(
      <CodeDiv>
      <Comment>// Android Spring Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html">[API]</Link><Break/>
      <Class>SpringAnimation</Class> springAnimation = <Keyword>new</Keyword> <Class>SpringAnimation</Class>.([<Property>view</Property>],[<Property>property</Property>],[<Property>finalValue</Property>]);<Break/>
      <Class>SpringAnimation</Class>.getSpring().setStiffness(<Number>{cIF(mSolver['stiffness'])}</Number>);<Break/>
      <Class>SpringAnimation</Class>.getSpring().setDampingRatio(<Number>{cIF(mSolver['dampingratio'])}</Number>);<Break/>
      <Class>SpringAnimation</Class>.setStartVelocity(<Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number>);<Break/>
      <Break/>
      <Comment>// Facebook Rebound Animation</Comment> <Link target="_blank" href="https://github.com/facebook/rebound">[API]</Link><Break/>
      <Class>SpringSystem</Class> mSpringSystem = <Class>SpringSystem</Class>.create();<Break/>
      <Class>Spring</Class> mSpring = <Class>SpringSystem</Class>.createSpring();<Break/>
      <Class>SpringConfig</Class> mConfig = <Class>SpringConfig</Class>.fromBouncinessAndSpeed(<Number>{cIF(mSolver['bounciness'])}</Number>,<Number>{cIF(mSolver['speed'])}</Number>);<Break/>
      mSpring.setSpringConfig(mConfig);<Break/>
      <Break/>
      <Comment>// Custom Android Spring Interpolator</Comment> <Link target="_blank" href="https://github.com/MartinRGB/Animer_Web/blob/master/CustomInterpolator/CustomSpringInterpolator.java">[API]</Link><Break/>
    <Class>CustomSpringInterpolator</Class> customSpringInterpolator = <Keyword>new</Keyword> <Class>CustomSpringInterpolator</Class>(<Number>{factorValue}</Number>);<Break/>
      <Class>[ObjectAnimator]</Class>.setInterpolator(customSpringInterpolator)<Break/>
      <Class>[ObjectAnimator]</Class>.setDuration(<Number>{cIF(mSolver['duration'])*1000}</Number>);<Break/>
      <Break/>
      <Comment>// Custom RK4 Framer Physics Animator in Android</Comment> <Link target="_blank" href="https://github.com/unixzii/android-SpringAnimator">[API]</Link><Break/>
      <Class>Rk4SpringAnimator</Class> animator = <Keyword>new</Keyword> <Class>Rk4SpringAnimator</Class>();<Break/>
      animator.setTension(<Number>{cIF(mSolver['tension'])}</Number>);<Break/>
      animator.setFriction(<Number>{cIF(mSolver['friction'])}</Number>);<Break/>
      animator.setVelocity(<Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number>);<Break/>
      <Break/>
      <Comment>// Custom DHO Framer Physics Animator in Android</Comment> <Link target="_blank" href="https://github.com/unixzii/android-SpringAnimator">[API]</Link><Break/>
      <Class>DhoSpringAnimator</Class> animator = <Keyword>new</Keyword> <Class>DhoSpringAnimator</Class>();<Break/>
  animator.setStiffness(<Number>{cIF(mSolver['tension'])}</Number>);<Break/>
      animator.setDamping(<Number>{cIF(mSolver['friction'])}</Number>);<Break/>
      animator.setMass(<Number>{cIF(mSolver['mass'])}</Number>);<Break/>
      animator.setVelocity(<Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number>);
    </CodeDiv>
    )
  }

  const iOSSpringAnimationComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    return (
      <CodeDiv>
        <Comment>// iOS UIViewAnimate</Comment>  <Link target="_blank" href="https://developer.apple.com/documentation/uikit/uiview/1622594-animate">[API]</Link><Break/>
        <Class>UIView</Class>.animate(<Break/>
        {`  `}withDuration: <Number>{cIF(mSolver['duration'])}</Number>,<Break/>
        {`  `}delay: <Number>0</Number>,<Break/>
        {`  `}usingSpringWithDamping: <Number>{cIF(mSolver['dampingratio'])}</Number>,<Break/>
        {`  `}initialSpringVelocity: <Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number>,<Break/>
        {`  `}options: [],<Break/>
        {`  `}animations:<Break/>
        {`  `}{`{`}<Break/>
        {`    `}<Comment>// code here</Comment><Break/>
        {`  `}{`}`},<Break/>
        {`  `}completion: nil<Break/>
        )<Break/>
        <Break/>
        <Comment>// iOS CASpringAnimation</Comment>  <Link target="_blank" href="https://developer.apple.com/documentation/quartzcore/caspringanimation">[API]</Link><Break/>
        <Keyword>let</Keyword> spring = <Class>CASpringAnimation</Class>(keyPath:[<Property>property</Property>])<Break/>
        spring.stiffness = <Number>{cIF(mSolver['tension'])}</Number><Break/>
        spring.damping = <Number>{cIF(mSolver['friction'])}</Number><Break/>
        spring.mass = <Number>{cIF(mSolver['mass'])}</Number><Break/>
        spring.initialVelocity = <Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number><Break/>
        <Break/>
        <Comment>// Facebook POP Spring Animation</Comment>  <Link target="_blank" href="https://github.com/facebookarchive/pop">[Repo]</Link><Break/>
        <Keyword>let</Keyword> spring = <Class>POPSpringAnimation</Class>(propertyNamed:[<Property>property</Property>])<Break/>
        spring.springBounciness = <Number>{cIF(mSolver['bounciness'])}</Number><Break/>
        spring.springSpeed = <Number>{cIF(mSolver['speed'])}</Number>
      </CodeDiv>)

  }

  const WebSpringAnimationComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    return (
      <CodeDiv>
        <Comment>// Facebook ReboundJS Spring Animation</Comment>  <Link target="_blank" href="https://github.com/facebook/rebound-js">[Repo]</Link><Break/>
        <Keyword>var</Keyword> springSystem = <Keyword>new</Keyword> <Class>rebound.SpringSystem</Class>();<Break/>
        <Keyword>var</Keyword> spring = <Class>springSystem.rebound.createSpringWithBouncinessAndSpeed</Class>(<Number>{cIF(mSolver['bounciness'])}</Number>,<Number>{cIF(mSolver['speed'])}</Number>);<Break/>
        <Break/>
        <Comment>// (Legacy) Framer Classic RK4 Animation</Comment>  <Link target="_blank" href="https://classic.framer.com/docs/#layer.animate">[API]</Link><Break/>
        layerA = <Keyword>new</Keyword> Layer<Break/>
        animationA = <Keyword>new</Keyword> Animation layerA<Break/>
        {`  `}x:[<Property>parameter</Property>]<Break/>
        {`  `}options:<Break/>
        {`      `}curve: <Class>Spring</Class>(tension:<Number>{cIF(mSolver['tension'])}</Number>,friction:<Number>{cIF(mSolver['friction'])}</Number>)<Break/>
        <Break/>
        <Comment>// PopMotion | FramerMotion</Comment>  <Link target="_blank" href="https://popmotion.io/api/spring/">[PopMotion API]</Link>  <Link target="_blank" href="https://www.framer.com/api/animation/#spring">[FramerMotion API]</Link><Break/>
        spring({`{`}<Break/>
        {`  `}from: [<Property>parameter</Property>],<Break/>
        {`  `}to: [<Property>parameter</Property>],<Break/>
        {`  `}stiffness: <Number>{cIF(mSolver['tension'])}</Number>,<Break/>
        {`  `}damping: <Number>{cIF(mSolver['friction'])}</Number>,<Break/>
        {`  `}mass: <Number>{cIF(mSolver['mass'])}</Number>,<Break/>
        {`  `}velocity: <Number>{cIF(mSolver['velocity'])?cIF(mSolver['velocity']):0}</Number><Break/>
        {`}`})
      </CodeDiv>)
  
  }

  const FlutterSpringAnimationComponents = () =>{
    return (WorkInProgressBlock())
  }

  const SmartisanSpringAnimationComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    //var evaluator = new SpringFactorEvaluator(cIF(mSolver['stiffness']),cIF(mSolver['damping']));
    //console.log(evaluator)
    return(
      (smartisanName)?
      <CodeDiv>
        <Comment>// Android Spring Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html">[API]</Link><Break/>
        <Class>SpringAnimation</Class> springAnimation = <Keyword>new</Keyword> <Class>SpringAnimation</Class>.([<Property>view</Property>],[<Property>property</Property>],[<Property>finalValue</Property>]);<Break/>
        <Class>SpringAnimation</Class>.getSpring().setStiffness(<Number>{smartisanName}.SPRING_ANIMATION_STIFFNESS</Number>);<Break/>
        <Class>SpringAnimation</Class>.getSpring().setDampingRatio(<Number>{smartisanName}.SPRING_ANIMATION_DAMPING_RATIO</Number>);<Break/>
        <Class>SpringAnimation</Class>.setStartVelocity(<Number>{smartisanName}.SPRING_ANIMATION_START_VELOCITY</Number>);<Break/>
        <Break/>
        <Comment>// Custom Spring Interpolator</Comment><Break/>
        animator.setInterpolator(<Keyword>new</Keyword> <Class>SpringInterpolator</Class>(<Number>{smartisanName}.PROPERTY_ANIMATION_INTERPOLATOR_FACTOR</Number>))<Break/>
        animator.setDuration(<Number>{smartisanName}.PROPERTY_ANIMATION_DURATION</Number>)
      </CodeDiv>
      :
      CheckAndroidBlock()
    )
  }

  const AndroidFlingAnimationComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    return (
      <CodeDiv>
        <Comment>// Android Fling Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/androidx/dynamicanimation/animation/FlingAnimation.html">[API]</Link><Break/>
        <Class>FlingAnimation</Class> flingAnimation = <Keyword>new</Keyword>  <Class>FlingAnimation</Class>.([<Property>view</Property>],[<Property>property</Property>]);<Break/>
        flingAnimation.setStartVelocity(<Number>{cIF(mSolver['velocity'])}</Number>);<Break/>
        flingAnimation.setFriction(<Number>{cIF(mSolver['friction'])}</Number>);
      </CodeDiv>
    )
  }
  
  const WebFlingAnimationComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const iOSFlingAnimationComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const FlutterFlingAnimationComponents = () =>{
    return (WorkInProgressBlock())
  }

  const SmartisanFlingAnimationComponents = () =>{
    return (CheckAndroidBlock())
  }
  

  const AndroidInterpolatorComponents = () =>{

    var paraStr = ``;
    currentSolverData.map(function (data:any,index:number) {
      if(index != currentSolverData.length - 1)
      paraStr += (index === 0)?`${data}`:`,${data}`
    })
    var duration = currentSolverData[currentSolverData.length-1]*1000
    return (
      (currentAnimPlatform === 'Android')?
        <CodeDiv>
          <Comment>// Android Interpolator Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/android/view/animation/Interpolator">[API]</Link><Break/>
          [<Class>Animator</Class>].setInterpolator(new <Class>{currentAnimName}Interpolator</Class>(<Number>{paraStr}</Number>));<Break/>
          [<Class>Animator</Class>].setDuration(<Number>{duration}</Number>);
        </CodeDiv>
        :
        NoReferenceBlock()
    )
  }
  
  const WebInterpolatorComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const iOSInterpolatorComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const FlutterInterpolatorComponents = () =>{
    return (
      (flutterName)?
        <CodeDiv>
          <Comment>// Flutter Curves</Comment> <Link target="_blank" href="https://api.flutter.dev/flutter/animation/Curves-class.html">[API]</Link><Break/>
          <Keyword>const</Keyword> <Class>Curve</Class> curve = <Class>Curves</Class>.<Number>{firstLetterLower(flutterName)}</Number><Break/>
          <Break/>
        </CodeDiv>
        :
        NoReferenceBlock()
      )
  }

  const SmartisanInterpolatorComponents = () =>{
    return (CheckAndroidBlock())
  }
  
  const AndroidCubicBezierComponents = () =>{

    // Android 3 Interpolator
    var p1x = currentSolverData[0][0];
    var p1y = currentSolverData[0][1];
    var p2x = currentSolverData[0][2];
    var p2y = currentSolverData[0][3];
    var duration = currentSolverData[currentSolverData.length-1]*1000

    return (
      (interpolatorName)?
      <CodeDiv>
        <Comment>// Android {interpolatorName}Interpolator Animation (In Mateiral Components)</Comment><Break/>
        [<Class>Animator</Class>].setInterpolator(new <Class>{interpolatorName}Interpolator</Class>();<Break/>
        [<Class>Animator</Class>].setDuration(<Number>{duration}</Number>);<Break/>
        <Break/>
        <Comment>// Android PathInterpolator(Cubic Bezier) Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/android/view/animation/PathInterpolator">[API]</Link><Break/>
        [<Class>Animator</Class>].setInterpolator(new <Class>PathInterpolator</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>));<Break/>
        [<Class>Animator</Class>].setDuration(<Number>{duration}</Number>);
      </CodeDiv>
      :
      <CodeDiv>
        <Comment>// Android PathInterpolator(Cubic Bezier) Animation</Comment> <Link target="_blank" href="https://developer.android.com/reference/android/view/animation/PathInterpolator">[API]</Link><Break/>
        [<Class>Animator</Class>].setInterpolator(new <Class>PathInterpolator</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>));<Break/>
        [<Class>Animator</Class>].setDuration(<Number>{duration}</Number>);
      </CodeDiv>
    )
  }
  
  const iOSCubicBezierComponents = () =>{
    var p1x = currentSolverData[0][0];
    var p1y = currentSolverData[0][1];
    var p2x = currentSolverData[0][2];
    var p2y = currentSolverData[0][3];
    var duration = currentSolverData[currentSolverData.length-1]
    return (
      (iOSName)?
      <CodeDiv>
        <Comment>// iOS UIView Animation with UICubicTimingParameters</Comment> <Link target="_blank" href="https://developer.apple.com/documentation/uikit/uicubictimingparameters">[API]</Link><Break/>
        <Keyword>let</Keyword> cubicTimingParameters = <Class>UICubicTimingParameters</Class>(<Break/>
        {`  `}controlPoint1: <Class>CGPoint</Class>(x: <Number>{p1x}</Number>,y: <Number>{p1y}</Number>),<Break/>
        {`  `}controlPoint2: <Class>CGPoint</Class>(x: <Number>{p2x}</Number>,y: <Number>{p2y}</Number>)<Break/>
        )<Break/>
        <Keyword>let</Keyword> animator = <Class>UIViewPropertyAnimator</Class>(<Break/>
        {`  `}duration: [<Number>{duration}</Number>],<Break/>
        {`  `}timingParameters: cubicTimingParameters<Break/>
        )<Break/>
        <Break/>
        <Comment>// iOS Core Animation with CAMediaTimingFunction</Comment> <Link target="_blank" href="https://developer.apple.com/documentation/quartzcore/camediatimingfunction">[API]</Link><Break/>
        <Keyword>let</Keyword> animation = <Class>CABasicAnimation</Class>(keyPath: [<Property>keyPath</Property>])<Break/>
        animation.timingFunction = <Class>CAMediaTimingFunction</Class>(controlPoints: <Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>)<Break/>
        animation.duration = <Number>{duration}</Number><Break/>
        <Break/>
        <Comment>// iOS UIView Animation with default presets</Comment>  <Link target="_blank" href="https://developer.apple.com/documentation/uikit/uiview/animationcurve">[API]</Link><Break/>
        <Keyword>let</Keyword> animator = <Class>UIViewPropertyAnimator</Class>(<Break/>
        {`  `}duration: [<Number>{duration}</Number>],<Break/>
        {`  `}curve: .<Number>{firstLetterLower(iOSName)}</Number><Break/>
        ){`{`}<Comment>// code here</Comment>{`}`}
      </CodeDiv>
      :
      <CodeDiv>
        <Comment>// iOS UIView Animation with UICubicTimingParameters</Comment> <Link target="_blank" href="https://developer.apple.com/documentation/uikit/uicubictimingparameters">[API]</Link><Break/>
        <Keyword>let</Keyword> cubicTimingParameters = <Class>UICubicTimingParameters</Class>(<Break/>
        {`  `}controlPoint1: <Class>CGPoint</Class>(x: <Number>{p1x}</Number>,y: <Number>{p1y}</Number>),<Break/>
        {`  `}controlPoint2: <Class>CGPoint</Class>(x: <Number>{p2x}</Number>,y: <Number>{p2y}</Number>)<Break/>
        )<Break/>
        <Keyword>let</Keyword> animator = <Class>UIViewPropertyAnimator</Class>(<Break/>
        {`  `}duration: [<Number>{duration}</Number>],<Break/>
        {`  `}timingParameters: cubicTimingParameters<Break/>
        )<Break/>
        <Break/>
        <Comment>// iOS Core Animation with CAMediaTimingFunction</Comment> <Link target="_blank" href="https://developer.apple.com/documentation/quartzcore/camediatimingfunction">[API]</Link><Break/>
        <Keyword>let</Keyword> animation = <Class>CABasicAnimation</Class>(keyPath: [<Property>keyPath</Property>])<Break/>
        animation.timingFunction = <Class>CAMediaTimingFunction</Class>(controlPoints: <Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>)<Break/>
        animation.duration = <Number>{duration}</Number>
      </CodeDiv>
    )
  }
  
  const WebCubicBezierComponents = () =>{
    var p1x = currentSolverData[0][0];
    var p1y = currentSolverData[0][1];
    var p2x = currentSolverData[0][2];
    var p2y = currentSolverData[0][3];
    var duration = currentSolverData[currentSolverData.length-1]

    return (
      (webName)?
      <CodeDiv>
        <Comment>// CSS TimingFunctions</Comment> <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function">[API]</Link><Break/>
        <Keyword>transition-timing-function</Keyword>: <Class>{firstLetterLower(webName)}</Class> or <Class>cubic-bezier</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>);<Break/>
        <Keyword>transition-duration</Keyword>: <Number>{duration}s</Number>;
    </CodeDiv>
      :
      <CodeDiv>
        <Comment>// CSS TimingFunctions</Comment> <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function">[API]</Link><Break/>
        <Keyword>transition-timing-function</Keyword>: <Class>cubic-bezier</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>);<Break/>
        <Keyword>transition-duration</Keyword>: <Number>{duration}s</Number>;
      </CodeDiv>
    )
  }
  
  const FlutterCubicBezierComponents = () =>{
    var p1x = currentSolverData[0][0];
    var p1y = currentSolverData[0][1];
    var p2x = currentSolverData[0][2];
    var p2y = currentSolverData[0][3];
    return (
      (flutterName)?
      <CodeDiv>
        <Comment>// Flutter Curves</Comment> <Link target="_blank" href="https://api.flutter.dev/flutter/animation/Curves-class.html">[API]</Link><Break/>
        <Keyword>const</Keyword> <Class>Curve</Class> curve = <Class>Curves</Class>.<Number>{firstLetterLower(flutterName)}</Number><Break/>
        <Break/>
        <Comment>// Flutter Cubic</Comment> <Link target="_blank" href="https://api.flutter.dev/flutter/animation/Cubic-class.html">[API]</Link><Break/>
        <Keyword>const</Keyword> <Class>Curve</Class> curve = <Class>Cubic</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>)
      </CodeDiv>
      :
      <CodeDiv>
        <Comment>// Flutter Cubic</Comment> <Link target="_blank" href="https://api.flutter.dev/flutter/animation/Cubic-class.html">[API]</Link><Break/>
        <Keyword>const</Keyword> <Class>Curve</Class> curve = <Class>Cubic</Class>(<Number>{p1x}</Number>,<Number>{p1y}</Number>,<Number>{p2x}</Number>,<Number>{p2y}</Number>)
      </CodeDiv>
    )
  }

  const SmartisanCubicBezierComponents = () =>{
    var duration = currentSolverData[currentSolverData.length-1]*1000
    return (
      (smartisanName)?
      <CodeDiv>
        <Comment>// Universal Easing Presets</Comment><Break/>
        <Class>Interpolator</Class> interpolator = <Class>CubicBezierPreset</Class>.getBezierInterpolator(<Number>CubicBezierPreset.CurveType.{smartisanName}</Number>);<Break/>
        animator.setInterpolator(interpolator)<Break/>
        animator.setDuration(<Number>{duration}</Number>)
      </CodeDiv>
      :
      CheckAndroidBlock()
      )
  }
  
  const AndroidDoubleCubicBezierComponents = () =>{

    var duration = currentSolverData[currentSolverData.length-1]*1000;

    return (
      (interpolatorName)?
      <CodeDiv>
        <Comment>// Android {interpolatorName}Interpolator Animation (In Mateiral Components)</Comment><Break/>
        [<Class>Animator</Class>].setInterpolator(new <Class>{interpolatorName}Interpolator</Class>();<Break/>
        [<Class>Animator</Class>].setDuration(<Number>{duration}</Number>);
      </CodeDiv>
      :
      NoReferenceBlock()
    )
  }
  
  const iOSDoubleCubicBezierComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const WebDoubleCubicBezierComponents = () =>{
    return (NoReferenceBlock())
  }
  
  const FlutterDoubleCubicBezierComponents = () =>{
    return (NoReferenceBlock())
  }

  const SmartisanDoubleCubicBezierComponents = () =>{
    return (NoReferenceBlock())
  }

  const UniversalDataComponents = () =>{
    var mSolver = Solver.CreateSolverByString(currentAnimCalculator,currentAnimPlatform,currentAnimName,currentSolverData);
    return (
      <CodeDiv>
        <Comment>// Data Length is </Comment><Keyword>{mSolver.getValueArray().length}</Keyword>
        <Number>{mSolver.getValueArray().toString()}</Number>
      </CodeDiv>
    )
  }

  const NoReferenceBlock = () =>{
    return (
      <CodeDiv>
        <Comment>🍸🍸🍸 <Trans>No reference</Trans> 🍸🍸🍸</Comment>
      </CodeDiv>)
  }

  const WorkInProgressBlock = () =>{
    return (
      <CodeDiv>
        <Comment>🥃🥃🥃 <Trans>Work In Progress</Trans> 🥃🥃🥃</Comment>
      </CodeDiv>)
  }

  const CheckAndroidBlock = () =>{
    return (
    <CodeDiv>
      <Comment>🍷🍷🍷 <Trans>Check Android Sections</Trans> 🍷🍷🍷</Comment>
    </CodeDiv>)
  }

  const DataLoadingBlock = () =>{
    return (
    <CodeDiv>
      <Comment>⌛⌛⌛ <Trans>Loading...</Trans> ⌛⌛⌛</Comment>
    </CodeDiv>)
  }

  const finalResult = () => {

    if(name && calculator && isActive){
      if((triggredIndex === -1 && bezierTriggeredIndex === -1)){
        ((name != "Data")?eval(`${name}${calculator}Components()`):UniversalDataComponents())
      }
      else{
        DataLoadingBlock()
      }
    }
    else{
      NoReferenceBlock();
    }
  }

  return (<div style={{...style}}>
    {
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


      (name && calculator && isActive)?
          //(triggredIndex === -1 && bezierTriggeredIndex === -1)?
              ((name != "Data")?
                  eval(`${name}${calculator}Components()`)
                  :
                  UniversalDataComponents())
              // :
              // DataLoadingBlock()
          :
          NoReferenceBlock()
      
    }
    </div>
  )
})

export default CodeTemplate


// chekcIfExsit
const cIF = (val:any) =>{
  return val?val.toFixed(2):'';
}

const firstLetterLower = (str:string) => {
  return str.charAt(0).toLowerCase()+str.slice(1);
};

const CodeDiv = styled.div`
  white-space:pre-wrap;
  overflow-wrap: break-word;
  padding-right: 12px;
  
  ::selection {
    background: ${p => p.theme.colors.selection};
  }
  margin-bottom: 14px;
`
