import Solver from '@Components/Solver'
import initState from '@Config/init_state.json'


export const CreateSolverByString = (calculator:string,platform:string,name:string,data:any) =>{


    // console.log(calculator)
    // console.log(platform)
    // console.log(name)
    //console.log(data)

    const mSolver = Solver;

    var solverStr = `mSolver`

    var platformStr = `${platform}`

    var initClazzStr = ``;

    if(name){
        initClazzStr = (trimEmptyStr(name));

        // if(calculator == 'InterpolatorCalculator'){
        //     initClazzStr += `Interpolator`;
        // }
    }

    var initParaStr = ``;

    if(data){
        // data.map(function (data:any,index:number) {
        //     initParaStr += (index === 0?`${data[1].default}`:`,${data[1].default}`)
        // })
        data.map(function (val:any,index:number) {
            if(Array.isArray(val)){
                val.map(function(d:any,i:number){
                    //initParaStr += (i === 0?`${d}`:`,${d}`)
                    initParaStr += `${d},`
                })
            }else{
                //initParaStr += (index === 0?`${val}`:`,${val}`)
                initParaStr += `${val},`
            }
        })
        if (initParaStr.charAt(initParaStr.length - 1) == ',') {
            initParaStr = initParaStr.substr(0, initParaStr.length - 1);
        }
        //console.log(initParaStr)
    }

    //console.log(`new ${solverStr}.${trimEmptyStr(platform)}.${initClazzStr}(${initParaStr})`)

    if(platform){
        return eval(`new ${solverStr}.${trimEmptyStr(platform)}.${initClazzStr}(${initParaStr})`);
        //return new Solver.HorizontalLineCalculator()
    }
    else{
        return eval(`new ${solverStr}.${'Default'}.${'HorizontalLine'}(${initParaStr})`);
    }

}

const trimEmptyStr = (str:string) => {
    return str.replace(/\s+/g,"");
}

const trimInterpolatorStr = (str:string) => {
    return str.replace("Interpolator","")
}
