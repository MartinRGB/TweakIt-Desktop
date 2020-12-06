import React ,{memo,useContext} from 'react';
import '@Context/i18nContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';

import InputTree from './InputTree'
import initState from '@Config/init_state.json'

const CanvasInput: React.FC = memo(({}) => {
  
  const { currentAnimName,currentSolverData ,currentAnimData,currentAnimCalculator} = useContext(
    AnimatorTypeContext
  ); 

  const isBezierCalculator = (currentAnimCalculator === 'CubicBezierCalculator')

  
  return (
    <div>
    {(currentAnimName != '')?(
          isBezierCalculator?
            currentAnimData.map(function (data:any,index:number) {
              if(index === currentAnimData.length - 1){
                return (
                  <InputTree 
                      name={data[0]}
                      calculator={''}
                      index={index}
                      isLast={true}
                      defaultVal={data[1].default}
                      isEditable={data[1].editable}
                      min={data[1].min}
                      max={data[1].max}
                      visible={data[1].visible}
                      key={currentAnimName+'duration'}
                    >
                  </InputTree>
                )
              }
              else if(index === currentAnimData.length - 2){
                // var p1:any = currentAnimData[0];
                // var p2:any = currentAnimData[1];
                // var p3:any = currentAnimData[2];
                // var p4:any = currentAnimData[3];
                // return (
                // <BezierInputTree 
                //   name={'P1~P4'}
                //   index={(index)}
                //   isLast={false}
                //   defaultVal={[currentSolverData[0],currentSolverData[1],currentSolverData[2],currentSolverData[3]]}
                //   isEditable={p1[1].editable}
                //   min={data[1].min}
                //   max={data[1].max}
                //   key={currentAnimName + index}>
                // </BezierInputTree>)
              }
              else{
                return ''
              }

            })
            :
            currentAnimData.map(function (data:any,index:number) {
              return (
                <InputTree 
                    name={data[0]}
                    calculator={currentAnimCalculator}
                    index={index}
                    isLast={index===(currentAnimData.length-1)}
                    defaultVal={data[1].default}
                    isEditable={data[1].editable}
                    min={data[1].min}
                    max={data[1].max}
                    visible={data[1].visible}
                    key={currentAnimName+index}
                  >
                </InputTree>
              )
            })
          )
          : 
          <InputTree 
          name={'property'}
          index={0}
          isLast={true}
          defaultVal={initState.initSliderValue}
          isEditable={false}
          min={0}
          max={1}
          key={'input_placeholder'}>
          </InputTree>}
  </div>
  )
})

export default CanvasInput
