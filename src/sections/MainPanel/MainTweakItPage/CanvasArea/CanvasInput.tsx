import React ,{ useContext} from 'react';
import '@Context/i18nContext'
import { AnimatorTypeContext } from '@Context/AnimatorTypeContext';
import InputTree from './InputTree'
import BezierInputTree from './BezierInputTree'


const CanvasInput: React.FC = ({}) => {
  
  const { currentAnimName, currentAnimData,currentAnimCalculator} = useContext(
    AnimatorTypeContext
  ); 

  const isBezierCalculator = (currentAnimCalculator === 'CubicBezierCalculator')

  return (
    <div>
    {(currentAnimName != 'HorizontalLine')?(
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
                      key={currentAnimName+'duration'}
                    >
                  </InputTree>
                )
              }
              else if(index === currentAnimData.length - 2){
                var p1:any = currentAnimData[0];
                var p2:any = currentAnimData[1];
                var p3:any = currentAnimData[2];
                var p4:any = currentAnimData[3];
                console.log(p1)
                return (
                <BezierInputTree 
                  name={'P1~P4'}
                  index={(index)}
                  isLast={false}
                  defaultVal={[p1[1].default,p2[1].default,p3[1].default,p4[1].default]}
                  isEditable={p1[1].editable}
                  min={data[1].min}
                  max={data[1].max}
                  key={currentAnimName + index}>
                </BezierInputTree>)
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
          defaultVal={0.5}
          isEditable={false}
          min={0}
          max={1}
          key={'input_placeholder'}>
          </InputTree>}
  </div>
  )
}

export default CanvasInput
