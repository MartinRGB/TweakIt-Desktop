import React ,{ useContext, useEffect, useState} from 'react';
import { useSpring, animated, interpolate } from 'react-spring'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import {css} from "@emotion/core";

import { useTranslation, Trans, Translation } from 'react-i18next'
import '@Context/i18nContext'
import {ListSelectStateContext} from '@Context/ListSelectContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import InputTree from './InputTree'

import animationConfig from '@Config/animation.json'
import Solver from '@Components/Solver';

const CanvasArea: React.FC = ({children}) => {
  
  const { t ,i18n} = useTranslation()
  const [colorMode] = useColorMode();
  const { currentAnimationItem, selectAnimationItem} = useContext(
    ListSelectStateContext
  );

  const currentAnimationName = currentAnimationItem.split("_").pop();

  const { currentAnimName, currentAnimCalculator, currentAnimData} = useContext(
    AnimatorTypeContext
  );

  // DataUtil

  

  const calc = new Solver.CubicBezierCalculator(0.55,0.09,0.79,0.00,100);
  // need new arr
  const calc2 = new Solver.SpringAnimationCalculator(200,0.15,0);

  //exp
  console.log(calc2.getStepArray())
  console.log(calc2.getValueArray())

  // const calc = new Solver.CubicBezierCalculator(0.00,0.85,0.31,1.00,100);
  // const calc2 = new Solver.CubicBezierCalculator( 0.50,0.00,0.95,0.39,100);
 
  const calc3 = new Solver.LookupTableCalculator(calc2.getStepArray(),100);
  const calc4 = new Solver.LookupTableCalculator(calc2.getValueArray(),100);


  //exp
  var stepArray = calc3.getAnimationArray();
  var valueArray = calc4.getAnimationArray()
  var maxStep = Math.max(...stepArray);

  console.log(stepArray)
  console.log(valueArray)

  stepArray.map(function (val:any,index:number) {
    stepArray[index] /= maxStep;
  })

  console.log(stepArray)
  console.log(valueArray)
  console.log(calc.getMergedDataArray())
// expected output: 3

  var newArr:any[] = [];

  for(let i=0;i<stepArray.length;i++){
    newArr.push(stepArray[i])
    newArr.push(valueArray[i])
  }

  // 校准之后
  console.log('==========newArr==========')
  console.log(newArr)

  const svgWidth:number = 420;
  const svgHeight:number = 420;

  var newSVGData = SVGConvertTemplate(calc.getMergedDataArray(),calc2.getMergedDataArray(),svgWidth,svgHeight,0.);

  // console.log(calc.getMergedDataArray())
  // console.log(calc2.getMergedDataArray())
  
  //var newSVGData = SVGConvertFromMergedData(calc2.getMergedDataArray(),svgWidth,svgHeight);


  const [isTriggered,setIsTriggered] = useState<boolean>(false);

  const { revealProgress } = useSpring({
    from:{revealProgress:0},
    to:{revealProgress:isTriggered?1:0},
    config: animationConfig.graph_trasition,
    onFrame: () => {
      var progress:number = revealProgress.value.toFixed(2);
      newSVGData = SVGConvertTemplate(calc.getMergedDataArray(),newArr,svgWidth,svgHeight,progress);
      document.getElementById('pathEl').setAttribute('d', newSVGData);
      //console.log(newSVGData)
    },
    onRest: () => {
      setIsTriggered(false)
    }
  })

  //M0 0C280 50 320 50 420 420
  const triggerChange = () =>{
    setIsTriggered(true)
  }

  const triggerSlide = (e) =>{
    newSVGData = SVGConvertTemplate(calc.getMergedDataArray(),newArr,svgWidth,svgHeight,e.target.value);
    document.getElementById('pathEl').setAttribute('d', newSVGData);
  }

  // var mStr = "";
  // for(let i=0;i<200;i++){
  //   console.log()
  //   if(i%2 ==0){
  //     mStr += "` L${(Number(olD["+i+"]) + Number((neD["+i+"] - olD["+i+"])*progress))*width},"
  //   }
  //   else{
  //     mStr += "${(Number(olD["+i+"]) + Number((neD["+i+"] - olD["+i+"])*progress))*height}`+"
  //   }
  // }
  // console.log(mStr)

  return (
    <Container>

      <svg 
        width={svgWidth} 
        height={svgHeight} 
        key={'svg_test'} 
        viewBox ={`0 0 ${svgWidth} ${svgHeight}`}
        style={
        {
        }
      }>
        <g 
          style={{
            transform:`translate(0,${svgHeight}px) scale(0.5,-0.5)`,
          }}
        >
        <path id="pathEl"
          fill="none" 
          stroke={"#3F403b"} 
          strokeWidth="4" 
          strokeLinecap="round" 
          d={newSVGData}/>
      </g>
      </svg>

      <button onClick={triggerChange}></button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0.5"
          onChange={e => triggerSlide(e)}
        />
      
      <AnimationTitle><Trans>{currentAnimName}</Trans></AnimationTitle>
      {
          Object.entries(currentAnimData).map(function (data:any,index:number) {
            return (
              <InputTree 
                  name={data[0]}
                  defaultVal={data[1].default}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName+index}
                >
              </InputTree>
            )
          })
      }
    </Container>
  )
}

export default CanvasArea

const SVGConvertFromData = function (data:any,width:any,height:any) {
  let svgData = "M0,0";

  data.map(function (val:any,index:any){
    svgData += " L"+val[0]*width+","+val[1]*height
  })

  return svgData;
}

const SVGConvertFromMergedData = function (data:number[],width:any,height:any) {
  let svgData = "M0,0";

  data.map(function (val:any,index:any){
    if(index%2==0){
      svgData += " L"+val*width;
    }
    else{
      svgData += ","+val*height;
    }
  })


  return svgData;
}

const SVGConvertTemplate = function (olD:any,neD:any,width:number,height:number,progress:number){

  // ========= Generator =========
  // var mStr = "";
  // for(let i=0;i<200;i++){
  //   console.log()
  //   if(i%2 ==0){
  //     mStr += "` L${(olD["+i+"] + (neD["+i+"] - olD["+i+"])*progress)*width},"
  //   }
  //   else{
  //     mStr += "${(olD["+i+"] + (neD["+i+"] - olD["+i+"])*progress)*height}`+"
  //   }
  // }
  // console.log(mStr)

  return  `M0,0`+
          ` L${(olD[0] + (neD[0] - olD[0])*progress)*width},${(olD[1] + (neD[1] - olD[1])*progress)*height}`+
          ` L${(olD[2] + (neD[2] - olD[2])*progress)*width},${(olD[3] + (neD[3] - olD[3])*progress)*height}`+
          ` L${(olD[4] + (neD[4] - olD[4])*progress)*width},${(olD[5] + (neD[5] - olD[5])*progress)*height}`+
          ` L${(olD[6] + (neD[6] - olD[6])*progress)*width},${(olD[7] + (neD[7] - olD[7])*progress)*height}`+
          ` L${(olD[8] + (neD[8] - olD[8])*progress)*width},${(olD[9] + (neD[9] - olD[9])*progress)*height}`+
          ` L${(olD[10] + (neD[10] - olD[10])*progress)*width},${(olD[11] + (neD[11] - olD[11])*progress)*height}`+
          ` L${(olD[12] + (neD[12] - olD[12])*progress)*width},${(olD[13] + (neD[13] - olD[13])*progress)*height}`+
          ` L${(olD[14] + (neD[14] - olD[14])*progress)*width},${(olD[15] + (neD[15] - olD[15])*progress)*height}`+
          ` L${(olD[16] + (neD[16] - olD[16])*progress)*width},${(olD[17] + (neD[17] - olD[17])*progress)*height}`+
          ` L${(olD[18] + (neD[18] - olD[18])*progress)*width},${(olD[19] + (neD[19] - olD[19])*progress)*height}`+
          ` L${(olD[20] + (neD[20] - olD[20])*progress)*width},${(olD[21] + (neD[21] - olD[21])*progress)*height}`+
          ` L${(olD[22] + (neD[22] - olD[22])*progress)*width},${(olD[23] + (neD[23] - olD[23])*progress)*height}`+
          ` L${(olD[24] + (neD[24] - olD[24])*progress)*width},${(olD[25] + (neD[25] - olD[25])*progress)*height}`+
          ` L${(olD[26] + (neD[26] - olD[26])*progress)*width},${(olD[27] + (neD[27] - olD[27])*progress)*height}`+
          ` L${(olD[28] + (neD[28] - olD[28])*progress)*width},${(olD[29] + (neD[29] - olD[29])*progress)*height}`+
          ` L${(olD[30] + (neD[30] - olD[30])*progress)*width},${(olD[31] + (neD[31] - olD[31])*progress)*height}`+
          ` L${(olD[32] + (neD[32] - olD[32])*progress)*width},${(olD[33] + (neD[33] - olD[33])*progress)*height}`+
          ` L${(olD[34] + (neD[34] - olD[34])*progress)*width},${(olD[35] + (neD[35] - olD[35])*progress)*height}`+
          ` L${(olD[36] + (neD[36] - olD[36])*progress)*width},${(olD[37] + (neD[37] - olD[37])*progress)*height}`+
          ` L${(olD[38] + (neD[38] - olD[38])*progress)*width},${(olD[39] + (neD[39] - olD[39])*progress)*height}`+
          ` L${(olD[40] + (neD[40] - olD[40])*progress)*width},${(olD[41] + (neD[41] - olD[41])*progress)*height}`+
          ` L${(olD[42] + (neD[42] - olD[42])*progress)*width},${(olD[43] + (neD[43] - olD[43])*progress)*height}`+
          ` L${(olD[44] + (neD[44] - olD[44])*progress)*width},${(olD[45] + (neD[45] - olD[45])*progress)*height}`+
          ` L${(olD[46] + (neD[46] - olD[46])*progress)*width},${(olD[47] + (neD[47] - olD[47])*progress)*height}`+
          ` L${(olD[48] + (neD[48] - olD[48])*progress)*width},${(olD[49] + (neD[49] - olD[49])*progress)*height}`+
          ` L${(olD[50] + (neD[50] - olD[50])*progress)*width},${(olD[51] + (neD[51] - olD[51])*progress)*height}`+
          ` L${(olD[52] + (neD[52] - olD[52])*progress)*width},${(olD[53] + (neD[53] - olD[53])*progress)*height}`+
          ` L${(olD[54] + (neD[54] - olD[54])*progress)*width},${(olD[55] + (neD[55] - olD[55])*progress)*height}`+
          ` L${(olD[56] + (neD[56] - olD[56])*progress)*width},${(olD[57] + (neD[57] - olD[57])*progress)*height}`+
          ` L${(olD[58] + (neD[58] - olD[58])*progress)*width},${(olD[59] + (neD[59] - olD[59])*progress)*height}`+
          ` L${(olD[60] + (neD[60] - olD[60])*progress)*width},${(olD[61] + (neD[61] - olD[61])*progress)*height}`+
          ` L${(olD[62] + (neD[62] - olD[62])*progress)*width},${(olD[63] + (neD[63] - olD[63])*progress)*height}`+
          ` L${(olD[64] + (neD[64] - olD[64])*progress)*width},${(olD[65] + (neD[65] - olD[65])*progress)*height}`+
          ` L${(olD[66] + (neD[66] - olD[66])*progress)*width},${(olD[67] + (neD[67] - olD[67])*progress)*height}`+
          ` L${(olD[68] + (neD[68] - olD[68])*progress)*width},${(olD[69] + (neD[69] - olD[69])*progress)*height}`+
          ` L${(olD[70] + (neD[70] - olD[70])*progress)*width},${(olD[71] + (neD[71] - olD[71])*progress)*height}`+
          ` L${(olD[72] + (neD[72] - olD[72])*progress)*width},${(olD[73] + (neD[73] - olD[73])*progress)*height}`+
          ` L${(olD[74] + (neD[74] - olD[74])*progress)*width},${(olD[75] + (neD[75] - olD[75])*progress)*height}`+
          ` L${(olD[76] + (neD[76] - olD[76])*progress)*width},${(olD[77] + (neD[77] - olD[77])*progress)*height}`+
          ` L${(olD[78] + (neD[78] - olD[78])*progress)*width},${(olD[79] + (neD[79] - olD[79])*progress)*height}`+
          ` L${(olD[80] + (neD[80] - olD[80])*progress)*width},${(olD[81] + (neD[81] - olD[81])*progress)*height}`+
          ` L${(olD[82] + (neD[82] - olD[82])*progress)*width},${(olD[83] + (neD[83] - olD[83])*progress)*height}`+
          ` L${(olD[84] + (neD[84] - olD[84])*progress)*width},${(olD[85] + (neD[85] - olD[85])*progress)*height}`+
          ` L${(olD[86] + (neD[86] - olD[86])*progress)*width},${(olD[87] + (neD[87] - olD[87])*progress)*height}`+
          ` L${(olD[88] + (neD[88] - olD[88])*progress)*width},${(olD[89] + (neD[89] - olD[89])*progress)*height}`+
          ` L${(olD[90] + (neD[90] - olD[90])*progress)*width},${(olD[91] + (neD[91] - olD[91])*progress)*height}`+
          ` L${(olD[92] + (neD[92] - olD[92])*progress)*width},${(olD[93] + (neD[93] - olD[93])*progress)*height}`+
          ` L${(olD[94] + (neD[94] - olD[94])*progress)*width},${(olD[95] + (neD[95] - olD[95])*progress)*height}`+
          ` L${(olD[96] + (neD[96] - olD[96])*progress)*width},${(olD[97] + (neD[97] - olD[97])*progress)*height}`+
          ` L${(olD[98] + (neD[98] - olD[98])*progress)*width},${(olD[99] + (neD[99] - olD[99])*progress)*height}`+
          ` L${(olD[100] + (neD[100] - olD[100])*progress)*width},${(olD[101] + (neD[101] - olD[101])*progress)*height}`+
          ` L${(olD[102] + (neD[102] - olD[102])*progress)*width},${(olD[103] + (neD[103] - olD[103])*progress)*height}`+
          ` L${(olD[104] + (neD[104] - olD[104])*progress)*width},${(olD[105] + (neD[105] - olD[105])*progress)*height}`+
          ` L${(olD[106] + (neD[106] - olD[106])*progress)*width},${(olD[107] + (neD[107] - olD[107])*progress)*height}`+
          ` L${(olD[108] + (neD[108] - olD[108])*progress)*width},${(olD[109] + (neD[109] - olD[109])*progress)*height}`+
          ` L${(olD[110] + (neD[110] - olD[110])*progress)*width},${(olD[111] + (neD[111] - olD[111])*progress)*height}`+
          ` L${(olD[112] + (neD[112] - olD[112])*progress)*width},${(olD[113] + (neD[113] - olD[113])*progress)*height}`+
          ` L${(olD[114] + (neD[114] - olD[114])*progress)*width},${(olD[115] + (neD[115] - olD[115])*progress)*height}`+
          ` L${(olD[116] + (neD[116] - olD[116])*progress)*width},${(olD[117] + (neD[117] - olD[117])*progress)*height}`+
          ` L${(olD[118] + (neD[118] - olD[118])*progress)*width},${(olD[119] + (neD[119] - olD[119])*progress)*height}`+
          ` L${(olD[120] + (neD[120] - olD[120])*progress)*width},${(olD[121] + (neD[121] - olD[121])*progress)*height}`+
          ` L${(olD[122] + (neD[122] - olD[122])*progress)*width},${(olD[123] + (neD[123] - olD[123])*progress)*height}`+
          ` L${(olD[124] + (neD[124] - olD[124])*progress)*width},${(olD[125] + (neD[125] - olD[125])*progress)*height}`+
          ` L${(olD[126] + (neD[126] - olD[126])*progress)*width},${(olD[127] + (neD[127] - olD[127])*progress)*height}`+
          ` L${(olD[128] + (neD[128] - olD[128])*progress)*width},${(olD[129] + (neD[129] - olD[129])*progress)*height}`+
          ` L${(olD[130] + (neD[130] - olD[130])*progress)*width},${(olD[131] + (neD[131] - olD[131])*progress)*height}`+
          ` L${(olD[132] + (neD[132] - olD[132])*progress)*width},${(olD[133] + (neD[133] - olD[133])*progress)*height}`+
          ` L${(olD[134] + (neD[134] - olD[134])*progress)*width},${(olD[135] + (neD[135] - olD[135])*progress)*height}`+
          ` L${(olD[136] + (neD[136] - olD[136])*progress)*width},${(olD[137] + (neD[137] - olD[137])*progress)*height}`+
          ` L${(olD[138] + (neD[138] - olD[138])*progress)*width},${(olD[139] + (neD[139] - olD[139])*progress)*height}`+
          ` L${(olD[140] + (neD[140] - olD[140])*progress)*width},${(olD[141] + (neD[141] - olD[141])*progress)*height}`+
          ` L${(olD[142] + (neD[142] - olD[142])*progress)*width},${(olD[143] + (neD[143] - olD[143])*progress)*height}`+
          ` L${(olD[144] + (neD[144] - olD[144])*progress)*width},${(olD[145] + (neD[145] - olD[145])*progress)*height}`+
          ` L${(olD[146] + (neD[146] - olD[146])*progress)*width},${(olD[147] + (neD[147] - olD[147])*progress)*height}`+
          ` L${(olD[148] + (neD[148] - olD[148])*progress)*width},${(olD[149] + (neD[149] - olD[149])*progress)*height}`+
          ` L${(olD[150] + (neD[150] - olD[150])*progress)*width},${(olD[151] + (neD[151] - olD[151])*progress)*height}`+
          ` L${(olD[152] + (neD[152] - olD[152])*progress)*width},${(olD[153] + (neD[153] - olD[153])*progress)*height}`+
          ` L${(olD[154] + (neD[154] - olD[154])*progress)*width},${(olD[155] + (neD[155] - olD[155])*progress)*height}`+
          ` L${(olD[156] + (neD[156] - olD[156])*progress)*width},${(olD[157] + (neD[157] - olD[157])*progress)*height}`+
          ` L${(olD[158] + (neD[158] - olD[158])*progress)*width},${(olD[159] + (neD[159] - olD[159])*progress)*height}`+
          ` L${(olD[160] + (neD[160] - olD[160])*progress)*width},${(olD[161] + (neD[161] - olD[161])*progress)*height}`+
          ` L${(olD[162] + (neD[162] - olD[162])*progress)*width},${(olD[163] + (neD[163] - olD[163])*progress)*height}`+
          ` L${(olD[164] + (neD[164] - olD[164])*progress)*width},${(olD[165] + (neD[165] - olD[165])*progress)*height}`+
          ` L${(olD[166] + (neD[166] - olD[166])*progress)*width},${(olD[167] + (neD[167] - olD[167])*progress)*height}`+
          ` L${(olD[168] + (neD[168] - olD[168])*progress)*width},${(olD[169] + (neD[169] - olD[169])*progress)*height}`+
          ` L${(olD[170] + (neD[170] - olD[170])*progress)*width},${(olD[171] + (neD[171] - olD[171])*progress)*height}`+
          ` L${(olD[172] + (neD[172] - olD[172])*progress)*width},${(olD[173] + (neD[173] - olD[173])*progress)*height}`+
          ` L${(olD[174] + (neD[174] - olD[174])*progress)*width},${(olD[175] + (neD[175] - olD[175])*progress)*height}`+
          ` L${(olD[176] + (neD[176] - olD[176])*progress)*width},${(olD[177] + (neD[177] - olD[177])*progress)*height}`+
          ` L${(olD[178] + (neD[178] - olD[178])*progress)*width},${(olD[179] + (neD[179] - olD[179])*progress)*height}`+
          ` L${(olD[180] + (neD[180] - olD[180])*progress)*width},${(olD[181] + (neD[181] - olD[181])*progress)*height}`+
          ` L${(olD[182] + (neD[182] - olD[182])*progress)*width},${(olD[183] + (neD[183] - olD[183])*progress)*height}`+
          ` L${(olD[184] + (neD[184] - olD[184])*progress)*width},${(olD[185] + (neD[185] - olD[185])*progress)*height}`+
          ` L${(olD[186] + (neD[186] - olD[186])*progress)*width},${(olD[187] + (neD[187] - olD[187])*progress)*height}`+
          ` L${(olD[188] + (neD[188] - olD[188])*progress)*width},${(olD[189] + (neD[189] - olD[189])*progress)*height}`+
          ` L${(olD[190] + (neD[190] - olD[190])*progress)*width},${(olD[191] + (neD[191] - olD[191])*progress)*height}`+
          ` L${(olD[192] + (neD[192] - olD[192])*progress)*width},${(olD[193] + (neD[193] - olD[193])*progress)*height}`+
          ` L${(olD[194] + (neD[194] - olD[194])*progress)*width},${(olD[195] + (neD[195] - olD[195])*progress)*height}`+
          ` L${(olD[196] + (neD[196] - olD[196])*progress)*width},${(olD[197] + (neD[197] - olD[197])*progress)*height}`+
          ` L${(olD[198] + (neD[198] - olD[198])*progress)*width},${(olD[199] + (neD[199] - olD[199])*progress)*height}`
          //+` L${width},${height}`
}


const AnimationTitle = styled.p`
  text-align:center;
  opacity:0.5;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  padding-top:24px;
  color:${p => p.theme.colors.text};
`

const Container = styled.div`
    height: 100%;
    background:${p => p.theme.colors.main_top_bg};
    display: flex;
    flex-direction: column;
    flex:2;
    min-width:250px;
    z-index:1;
    box-shadow: 1px 0px 0px ${p => p.theme.colors.adb_border},-1px 0px 0px ${p => p.theme.colors.adb_border};
`
