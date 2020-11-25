const SVGTemplate = function (
  dX: any, dY: any,
  width: number,
  height: number,
  progress: number) {

  // ========= Generator =========
  // var mStr = "";
  // for(let i=0;i<100;i++){
  //   mStr += "` L${(dX["+i+"])*width},${(dY["+i+"])*height}` + ";
  // }
  // console.log(mStr)

  
  // ========== Loop ==========
  var mStr = `M0,0`;
  for(let i=0;i<dX.length;i++){
    mStr += ` L${(dX[i])*width},${(dY[i])*height}`;
  }

  return  mStr;
}

const SVGTransitionTemplate = function (
  oldX: any, oldY: any,
  newX: any, newY: any,
  width: number,
  height: number,
  progress: number) {

  // ========= Generator =========
  // var mStr = "";
  // for(let i=0;i<100;i++){
  //   mStr += "` L${(oldX["+i+"] + (newX["+i+"] - oldX["+i+"])*progress)*width},${(oldY["+i+"] + (newY["+i+"] - oldY["+i+"])*progress)*height}` + ";
  // }
  // console.log(mStr)


  // ========== Loop ==========
  var mStr = `M0,0`;
  for(let i=0;i<oldX.length;i++){
    mStr += ` L${(oldX[i] + (newX[i] - oldX[i])*progress)*width},${(oldY[i] + (newY[i] - oldY[i])*progress)*height}`;
  }

  return  mStr;
}


const SVGTemplate_100 = function(dX:any,dY:any,width:number,height:number,progress:number){

  return  `M0,0` +
          ` L${(dX[0])*width},${(dY[0])*height}` + 
          ` L${(dX[1])*width},${(dY[1])*height}` + 
          ` L${(dX[2])*width},${(dY[2])*height}` + 
          ` L${(dX[3])*width},${(dY[3])*height}` + 
          ` L${(dX[4])*width},${(dY[4])*height}` + 
          ` L${(dX[5])*width},${(dY[5])*height}` + 
          ` L${(dX[6])*width},${(dY[6])*height}` + 
          ` L${(dX[7])*width},${(dY[7])*height}` + 
          ` L${(dX[8])*width},${(dY[8])*height}` + 
          ` L${(dX[9])*width},${(dY[9])*height}` + 
          ` L${(dX[10])*width},${(dY[10])*height}` + 
          ` L${(dX[11])*width},${(dY[11])*height}` + 
          ` L${(dX[12])*width},${(dY[12])*height}` + 
          ` L${(dX[13])*width},${(dY[13])*height}` + 
          ` L${(dX[14])*width},${(dY[14])*height}` + 
          ` L${(dX[15])*width},${(dY[15])*height}` + 
          ` L${(dX[16])*width},${(dY[16])*height}` + 
          ` L${(dX[17])*width},${(dY[17])*height}` + 
          ` L${(dX[18])*width},${(dY[18])*height}` + 
          ` L${(dX[19])*width},${(dY[19])*height}` + 
          ` L${(dX[20])*width},${(dY[20])*height}` + 
          ` L${(dX[21])*width},${(dY[21])*height}` + 
          ` L${(dX[22])*width},${(dY[22])*height}` + 
          ` L${(dX[23])*width},${(dY[23])*height}` + 
          ` L${(dX[24])*width},${(dY[24])*height}` + 
          ` L${(dX[25])*width},${(dY[25])*height}` + 
          ` L${(dX[26])*width},${(dY[26])*height}` + 
          ` L${(dX[27])*width},${(dY[27])*height}` + 
          ` L${(dX[28])*width},${(dY[28])*height}` + 
          ` L${(dX[29])*width},${(dY[29])*height}` + 
          ` L${(dX[30])*width},${(dY[30])*height}` + 
          ` L${(dX[31])*width},${(dY[31])*height}` + 
          ` L${(dX[32])*width},${(dY[32])*height}` + 
          ` L${(dX[33])*width},${(dY[33])*height}` + 
          ` L${(dX[34])*width},${(dY[34])*height}` + 
          ` L${(dX[35])*width},${(dY[35])*height}` + 
          ` L${(dX[36])*width},${(dY[36])*height}` + 
          ` L${(dX[37])*width},${(dY[37])*height}` + 
          ` L${(dX[38])*width},${(dY[38])*height}` + 
          ` L${(dX[39])*width},${(dY[39])*height}` + 
          ` L${(dX[40])*width},${(dY[40])*height}` + 
          ` L${(dX[41])*width},${(dY[41])*height}` + 
          ` L${(dX[42])*width},${(dY[42])*height}` + 
          ` L${(dX[43])*width},${(dY[43])*height}` + 
          ` L${(dX[44])*width},${(dY[44])*height}` + 
          ` L${(dX[45])*width},${(dY[45])*height}` + 
          ` L${(dX[46])*width},${(dY[46])*height}` + 
          ` L${(dX[47])*width},${(dY[47])*height}` + 
          ` L${(dX[48])*width},${(dY[48])*height}` + 
          ` L${(dX[49])*width},${(dY[49])*height}` + 
          ` L${(dX[50])*width},${(dY[50])*height}` + 
          ` L${(dX[51])*width},${(dY[51])*height}` + 
          ` L${(dX[52])*width},${(dY[52])*height}` + 
          ` L${(dX[53])*width},${(dY[53])*height}` + 
          ` L${(dX[54])*width},${(dY[54])*height}` + 
          ` L${(dX[55])*width},${(dY[55])*height}` + 
          ` L${(dX[56])*width},${(dY[56])*height}` + 
          ` L${(dX[57])*width},${(dY[57])*height}` + 
          ` L${(dX[58])*width},${(dY[58])*height}` + 
          ` L${(dX[59])*width},${(dY[59])*height}` + 
          ` L${(dX[60])*width},${(dY[60])*height}` + 
          ` L${(dX[61])*width},${(dY[61])*height}` + 
          ` L${(dX[62])*width},${(dY[62])*height}` + 
          ` L${(dX[63])*width},${(dY[63])*height}` + 
          ` L${(dX[64])*width},${(dY[64])*height}` + 
          ` L${(dX[65])*width},${(dY[65])*height}` + 
          ` L${(dX[66])*width},${(dY[66])*height}` + 
          ` L${(dX[67])*width},${(dY[67])*height}` + 
          ` L${(dX[68])*width},${(dY[68])*height}` + 
          ` L${(dX[69])*width},${(dY[69])*height}` + 
          ` L${(dX[70])*width},${(dY[70])*height}` + 
          ` L${(dX[71])*width},${(dY[71])*height}` + 
          ` L${(dX[72])*width},${(dY[72])*height}` + 
          ` L${(dX[73])*width},${(dY[73])*height}` + 
          ` L${(dX[74])*width},${(dY[74])*height}` + 
          ` L${(dX[75])*width},${(dY[75])*height}` + 
          ` L${(dX[76])*width},${(dY[76])*height}` + 
          ` L${(dX[77])*width},${(dY[77])*height}` + 
          ` L${(dX[78])*width},${(dY[78])*height}` + 
          ` L${(dX[79])*width},${(dY[79])*height}` + 
          ` L${(dX[80])*width},${(dY[80])*height}` + 
          ` L${(dX[81])*width},${(dY[81])*height}` + 
          ` L${(dX[82])*width},${(dY[82])*height}` + 
          ` L${(dX[83])*width},${(dY[83])*height}` + 
          ` L${(dX[84])*width},${(dY[84])*height}` + 
          ` L${(dX[85])*width},${(dY[85])*height}` + 
          ` L${(dX[86])*width},${(dY[86])*height}` + 
          ` L${(dX[87])*width},${(dY[87])*height}` + 
          ` L${(dX[88])*width},${(dY[88])*height}` + 
          ` L${(dX[89])*width},${(dY[89])*height}` + 
          ` L${(dX[90])*width},${(dY[90])*height}` + 
          ` L${(dX[91])*width},${(dY[91])*height}` + 
          ` L${(dX[92])*width},${(dY[92])*height}` + 
          ` L${(dX[93])*width},${(dY[93])*height}` + 
          ` L${(dX[94])*width},${(dY[94])*height}` + 
          ` L${(dX[95])*width},${(dY[95])*height}` + 
          ` L${(dX[96])*width},${(dY[96])*height}` + 
          ` L${(dX[97])*width},${(dY[97])*height}` + 
          ` L${(dX[98])*width},${(dY[98])*height}` + 
          ` L${(dX[99])*width},${(dY[99])*height}`
}


const SVGTemplate_50 = function(dX:any,dY:any,width:number,height:number,progress:number){


  return  `M0,0` +
          ` L${(dX[0])*width},${(dY[0])*height}` + 
          ` L${(dX[1])*width},${(dY[1])*height}` + 
          ` L${(dX[2])*width},${(dY[2])*height}` + 
          ` L${(dX[3])*width},${(dY[3])*height}` + 
          ` L${(dX[4])*width},${(dY[4])*height}` + 
          ` L${(dX[5])*width},${(dY[5])*height}` + 
          ` L${(dX[6])*width},${(dY[6])*height}` + 
          ` L${(dX[7])*width},${(dY[7])*height}` + 
          ` L${(dX[8])*width},${(dY[8])*height}` + 
          ` L${(dX[9])*width},${(dY[9])*height}` + 
          ` L${(dX[10])*width},${(dY[10])*height}` + 
          ` L${(dX[11])*width},${(dY[11])*height}` + 
          ` L${(dX[12])*width},${(dY[12])*height}` + 
          ` L${(dX[13])*width},${(dY[13])*height}` + 
          ` L${(dX[14])*width},${(dY[14])*height}` + 
          ` L${(dX[15])*width},${(dY[15])*height}` + 
          ` L${(dX[16])*width},${(dY[16])*height}` + 
          ` L${(dX[17])*width},${(dY[17])*height}` + 
          ` L${(dX[18])*width},${(dY[18])*height}` + 
          ` L${(dX[19])*width},${(dY[19])*height}` + 
          ` L${(dX[20])*width},${(dY[20])*height}` + 
          ` L${(dX[21])*width},${(dY[21])*height}` + 
          ` L${(dX[22])*width},${(dY[22])*height}` + 
          ` L${(dX[23])*width},${(dY[23])*height}` + 
          ` L${(dX[24])*width},${(dY[24])*height}` + 
          ` L${(dX[25])*width},${(dY[25])*height}` + 
          ` L${(dX[26])*width},${(dY[26])*height}` + 
          ` L${(dX[27])*width},${(dY[27])*height}` + 
          ` L${(dX[28])*width},${(dY[28])*height}` + 
          ` L${(dX[29])*width},${(dY[29])*height}` + 
          ` L${(dX[30])*width},${(dY[30])*height}` + 
          ` L${(dX[31])*width},${(dY[31])*height}` + 
          ` L${(dX[32])*width},${(dY[32])*height}` + 
          ` L${(dX[33])*width},${(dY[33])*height}` + 
          ` L${(dX[34])*width},${(dY[34])*height}` + 
          ` L${(dX[35])*width},${(dY[35])*height}` + 
          ` L${(dX[36])*width},${(dY[36])*height}` + 
          ` L${(dX[37])*width},${(dY[37])*height}` + 
          ` L${(dX[38])*width},${(dY[38])*height}` + 
          ` L${(dX[39])*width},${(dY[39])*height}` + 
          ` L${(dX[40])*width},${(dY[40])*height}` + 
          ` L${(dX[41])*width},${(dY[41])*height}` + 
          ` L${(dX[42])*width},${(dY[42])*height}` + 
          ` L${(dX[43])*width},${(dY[43])*height}` + 
          ` L${(dX[44])*width},${(dY[44])*height}` + 
          ` L${(dX[45])*width},${(dY[45])*height}` + 
          ` L${(dX[46])*width},${(dY[46])*height}` + 
          ` L${(dX[47])*width},${(dY[47])*height}` + 
          ` L${(dX[48])*width},${(dY[48])*height}` + 
          ` L${(dX[49])*width},${(dY[49])*height}`
}

// const ZeroSVG = function (pointNumber:number,width:number) {

//   // ========= Generator =========
//   // var mStr = "";
//   // for(let i=0;i<100;i++){
//   //   mStr += "` L${(dX["+i+"])*width},${(dY["+i+"])*height}` + ";
//   // }
//   // console.log(mStr)


//   // ========== Loop ==========
//   var mStr = `M0,0`;
//   for(let i=0;i<pointNumber;i++){
//     mStr += ` L${(i/pointNumber)*width},0`;
//   }

//   return  mStr;
// }

const SVGTransitionTemplate_100 = function (
  oldX: any, oldY: any,
  newX: any, newY: any,
  width: number,
  height: number,
  progress: number) {

  return `M0,0` +
    ` L${(oldX[0] + (newX[0] - oldX[0]) * progress) * width},${(oldY[0] + (newY[0] - oldY[0]) * progress) * height}` + 
    ` L${(oldX[1] + (newX[1] - oldX[1]) * progress) * width},${(oldY[1] + (newY[1] - oldY[1]) * progress) * height}` + 
    ` L${(oldX[2] + (newX[2] - oldX[2]) * progress) * width},${(oldY[2] + (newY[2] - oldY[2]) * progress) * height}` + 
    ` L${(oldX[3] + (newX[3] - oldX[3]) * progress) * width},${(oldY[3] + (newY[3] - oldY[3]) * progress) * height}` + 
    ` L${(oldX[4] + (newX[4] - oldX[4]) * progress) * width},${(oldY[4] + (newY[4] - oldY[4]) * progress) * height}` + 
    ` L${(oldX[5] + (newX[5] - oldX[5]) * progress) * width},${(oldY[5] + (newY[5] - oldY[5]) * progress) * height}` + 
    ` L${(oldX[6] + (newX[6] - oldX[6]) * progress) * width},${(oldY[6] + (newY[6] - oldY[6]) * progress) * height}` + 
    ` L${(oldX[7] + (newX[7] - oldX[7]) * progress) * width},${(oldY[7] + (newY[7] - oldY[7]) * progress) * height}` + 
    ` L${(oldX[8] + (newX[8] - oldX[8]) * progress) * width},${(oldY[8] + (newY[8] - oldY[8]) * progress) * height}` + 
    ` L${(oldX[9] + (newX[9] - oldX[9]) * progress) * width},${(oldY[9] + (newY[9] - oldY[9]) * progress) * height}` + 
    ` L${(oldX[10] + (newX[10] - oldX[10]) * progress) * width},${(oldY[10] + (newY[10] - oldY[10]) * progress) * height}` + 
    ` L${(oldX[11] + (newX[11] - oldX[11]) * progress) * width},${(oldY[11] + (newY[11] - oldY[11]) * progress) * height}` + 
    ` L${(oldX[12] + (newX[12] - oldX[12]) * progress) * width},${(oldY[12] + (newY[12] - oldY[12]) * progress) * height}` + 
    ` L${(oldX[13] + (newX[13] - oldX[13]) * progress) * width},${(oldY[13] + (newY[13] - oldY[13]) * progress) * height}` + 
    ` L${(oldX[14] + (newX[14] - oldX[14]) * progress) * width},${(oldY[14] + (newY[14] - oldY[14]) * progress) * height}` + 
    ` L${(oldX[15] + (newX[15] - oldX[15]) * progress) * width},${(oldY[15] + (newY[15] - oldY[15]) * progress) * height}` + 
    ` L${(oldX[16] + (newX[16] - oldX[16]) * progress) * width},${(oldY[16] + (newY[16] - oldY[16]) * progress) * height}` + 
    ` L${(oldX[17] + (newX[17] - oldX[17]) * progress) * width},${(oldY[17] + (newY[17] - oldY[17]) * progress) * height}` + 
    ` L${(oldX[18] + (newX[18] - oldX[18]) * progress) * width},${(oldY[18] + (newY[18] - oldY[18]) * progress) * height}` + 
    ` L${(oldX[19] + (newX[19] - oldX[19]) * progress) * width},${(oldY[19] + (newY[19] - oldY[19]) * progress) * height}` + 
    ` L${(oldX[20] + (newX[20] - oldX[20]) * progress) * width},${(oldY[20] + (newY[20] - oldY[20]) * progress) * height}` + 
    ` L${(oldX[21] + (newX[21] - oldX[21]) * progress) * width},${(oldY[21] + (newY[21] - oldY[21]) * progress) * height}` + 
    ` L${(oldX[22] + (newX[22] - oldX[22]) * progress) * width},${(oldY[22] + (newY[22] - oldY[22]) * progress) * height}` + 
    ` L${(oldX[23] + (newX[23] - oldX[23]) * progress) * width},${(oldY[23] + (newY[23] - oldY[23]) * progress) * height}` + 
    ` L${(oldX[24] + (newX[24] - oldX[24]) * progress) * width},${(oldY[24] + (newY[24] - oldY[24]) * progress) * height}` + 
    ` L${(oldX[25] + (newX[25] - oldX[25]) * progress) * width},${(oldY[25] + (newY[25] - oldY[25]) * progress) * height}` + 
    ` L${(oldX[26] + (newX[26] - oldX[26]) * progress) * width},${(oldY[26] + (newY[26] - oldY[26]) * progress) * height}` + 
    ` L${(oldX[27] + (newX[27] - oldX[27]) * progress) * width},${(oldY[27] + (newY[27] - oldY[27]) * progress) * height}` + 
    ` L${(oldX[28] + (newX[28] - oldX[28]) * progress) * width},${(oldY[28] + (newY[28] - oldY[28]) * progress) * height}` + 
    ` L${(oldX[29] + (newX[29] - oldX[29]) * progress) * width},${(oldY[29] + (newY[29] - oldY[29]) * progress) * height}` + 
    ` L${(oldX[30] + (newX[30] - oldX[30]) * progress) * width},${(oldY[30] + (newY[30] - oldY[30]) * progress) * height}` + 
    ` L${(oldX[31] + (newX[31] - oldX[31]) * progress) * width},${(oldY[31] + (newY[31] - oldY[31]) * progress) * height}` + 
    ` L${(oldX[32] + (newX[32] - oldX[32]) * progress) * width},${(oldY[32] + (newY[32] - oldY[32]) * progress) * height}` + 
    ` L${(oldX[33] + (newX[33] - oldX[33]) * progress) * width},${(oldY[33] + (newY[33] - oldY[33]) * progress) * height}` + 
    ` L${(oldX[34] + (newX[34] - oldX[34]) * progress) * width},${(oldY[34] + (newY[34] - oldY[34]) * progress) * height}` + 
    ` L${(oldX[35] + (newX[35] - oldX[35]) * progress) * width},${(oldY[35] + (newY[35] - oldY[35]) * progress) * height}` + 
    ` L${(oldX[36] + (newX[36] - oldX[36]) * progress) * width},${(oldY[36] + (newY[36] - oldY[36]) * progress) * height}` + 
    ` L${(oldX[37] + (newX[37] - oldX[37]) * progress) * width},${(oldY[37] + (newY[37] - oldY[37]) * progress) * height}` + 
    ` L${(oldX[38] + (newX[38] - oldX[38]) * progress) * width},${(oldY[38] + (newY[38] - oldY[38]) * progress) * height}` + 
    ` L${(oldX[39] + (newX[39] - oldX[39]) * progress) * width},${(oldY[39] + (newY[39] - oldY[39]) * progress) * height}` + 
    ` L${(oldX[40] + (newX[40] - oldX[40]) * progress) * width},${(oldY[40] + (newY[40] - oldY[40]) * progress) * height}` + 
    ` L${(oldX[41] + (newX[41] - oldX[41]) * progress) * width},${(oldY[41] + (newY[41] - oldY[41]) * progress) * height}` + 
    ` L${(oldX[42] + (newX[42] - oldX[42]) * progress) * width},${(oldY[42] + (newY[42] - oldY[42]) * progress) * height}` + 
    ` L${(oldX[43] + (newX[43] - oldX[43]) * progress) * width},${(oldY[43] + (newY[43] - oldY[43]) * progress) * height}` + 
    ` L${(oldX[44] + (newX[44] - oldX[44]) * progress) * width},${(oldY[44] + (newY[44] - oldY[44]) * progress) * height}` + 
    ` L${(oldX[45] + (newX[45] - oldX[45]) * progress) * width},${(oldY[45] + (newY[45] - oldY[45]) * progress) * height}` + 
    ` L${(oldX[46] + (newX[46] - oldX[46]) * progress) * width},${(oldY[46] + (newY[46] - oldY[46]) * progress) * height}` + 
    ` L${(oldX[47] + (newX[47] - oldX[47]) * progress) * width},${(oldY[47] + (newY[47] - oldY[47]) * progress) * height}` + 
    ` L${(oldX[48] + (newX[48] - oldX[48]) * progress) * width},${(oldY[48] + (newY[48] - oldY[48]) * progress) * height}` + 
    ` L${(oldX[49] + (newX[49] - oldX[49]) * progress) * width},${(oldY[49] + (newY[49] - oldY[49]) * progress) * height}` + 
    ` L${(oldX[50] + (newX[50] - oldX[50]) * progress) * width},${(oldY[50] + (newY[50] - oldY[50]) * progress) * height}` + 
    ` L${(oldX[51] + (newX[51] - oldX[51]) * progress) * width},${(oldY[51] + (newY[51] - oldY[51]) * progress) * height}` + 
    ` L${(oldX[52] + (newX[52] - oldX[52]) * progress) * width},${(oldY[52] + (newY[52] - oldY[52]) * progress) * height}` + 
    ` L${(oldX[53] + (newX[53] - oldX[53]) * progress) * width},${(oldY[53] + (newY[53] - oldY[53]) * progress) * height}` + 
    ` L${(oldX[54] + (newX[54] - oldX[54]) * progress) * width},${(oldY[54] + (newY[54] - oldY[54]) * progress) * height}` + 
    ` L${(oldX[55] + (newX[55] - oldX[55]) * progress) * width},${(oldY[55] + (newY[55] - oldY[55]) * progress) * height}` + 
    ` L${(oldX[56] + (newX[56] - oldX[56]) * progress) * width},${(oldY[56] + (newY[56] - oldY[56]) * progress) * height}` + 
    ` L${(oldX[57] + (newX[57] - oldX[57]) * progress) * width},${(oldY[57] + (newY[57] - oldY[57]) * progress) * height}` + 
    ` L${(oldX[58] + (newX[58] - oldX[58]) * progress) * width},${(oldY[58] + (newY[58] - oldY[58]) * progress) * height}` + 
    ` L${(oldX[59] + (newX[59] - oldX[59]) * progress) * width},${(oldY[59] + (newY[59] - oldY[59]) * progress) * height}` + 
    ` L${(oldX[60] + (newX[60] - oldX[60]) * progress) * width},${(oldY[60] + (newY[60] - oldY[60]) * progress) * height}` + 
    ` L${(oldX[61] + (newX[61] - oldX[61]) * progress) * width},${(oldY[61] + (newY[61] - oldY[61]) * progress) * height}` + 
    ` L${(oldX[62] + (newX[62] - oldX[62]) * progress) * width},${(oldY[62] + (newY[62] - oldY[62]) * progress) * height}` + 
    ` L${(oldX[63] + (newX[63] - oldX[63]) * progress) * width},${(oldY[63] + (newY[63] - oldY[63]) * progress) * height}` + 
    ` L${(oldX[64] + (newX[64] - oldX[64]) * progress) * width},${(oldY[64] + (newY[64] - oldY[64]) * progress) * height}` + 
    ` L${(oldX[65] + (newX[65] - oldX[65]) * progress) * width},${(oldY[65] + (newY[65] - oldY[65]) * progress) * height}` + 
    ` L${(oldX[66] + (newX[66] - oldX[66]) * progress) * width},${(oldY[66] + (newY[66] - oldY[66]) * progress) * height}` + 
    ` L${(oldX[67] + (newX[67] - oldX[67]) * progress) * width},${(oldY[67] + (newY[67] - oldY[67]) * progress) * height}` + 
    ` L${(oldX[68] + (newX[68] - oldX[68]) * progress) * width},${(oldY[68] + (newY[68] - oldY[68]) * progress) * height}` + 
    ` L${(oldX[69] + (newX[69] - oldX[69]) * progress) * width},${(oldY[69] + (newY[69] - oldY[69]) * progress) * height}` + 
    ` L${(oldX[70] + (newX[70] - oldX[70]) * progress) * width},${(oldY[70] + (newY[70] - oldY[70]) * progress) * height}` + 
    ` L${(oldX[71] + (newX[71] - oldX[71]) * progress) * width},${(oldY[71] + (newY[71] - oldY[71]) * progress) * height}` + 
    ` L${(oldX[72] + (newX[72] - oldX[72]) * progress) * width},${(oldY[72] + (newY[72] - oldY[72]) * progress) * height}` + 
    ` L${(oldX[73] + (newX[73] - oldX[73]) * progress) * width},${(oldY[73] + (newY[73] - oldY[73]) * progress) * height}` + 
    ` L${(oldX[74] + (newX[74] - oldX[74]) * progress) * width},${(oldY[74] + (newY[74] - oldY[74]) * progress) * height}` + 
    ` L${(oldX[75] + (newX[75] - oldX[75]) * progress) * width},${(oldY[75] + (newY[75] - oldY[75]) * progress) * height}` + 
    ` L${(oldX[76] + (newX[76] - oldX[76]) * progress) * width},${(oldY[76] + (newY[76] - oldY[76]) * progress) * height}` + 
    ` L${(oldX[77] + (newX[77] - oldX[77]) * progress) * width},${(oldY[77] + (newY[77] - oldY[77]) * progress) * height}` + 
    ` L${(oldX[78] + (newX[78] - oldX[78]) * progress) * width},${(oldY[78] + (newY[78] - oldY[78]) * progress) * height}` + 
    ` L${(oldX[79] + (newX[79] - oldX[79]) * progress) * width},${(oldY[79] + (newY[79] - oldY[79]) * progress) * height}` + 
    ` L${(oldX[80] + (newX[80] - oldX[80]) * progress) * width},${(oldY[80] + (newY[80] - oldY[80]) * progress) * height}` + 
    ` L${(oldX[81] + (newX[81] - oldX[81]) * progress) * width},${(oldY[81] + (newY[81] - oldY[81]) * progress) * height}` + 
    ` L${(oldX[82] + (newX[82] - oldX[82]) * progress) * width},${(oldY[82] + (newY[82] - oldY[82]) * progress) * height}` + 
    ` L${(oldX[83] + (newX[83] - oldX[83]) * progress) * width},${(oldY[83] + (newY[83] - oldY[83]) * progress) * height}` + 
    ` L${(oldX[84] + (newX[84] - oldX[84]) * progress) * width},${(oldY[84] + (newY[84] - oldY[84]) * progress) * height}` + 
    ` L${(oldX[85] + (newX[85] - oldX[85]) * progress) * width},${(oldY[85] + (newY[85] - oldY[85]) * progress) * height}` + 
    ` L${(oldX[86] + (newX[86] - oldX[86]) * progress) * width},${(oldY[86] + (newY[86] - oldY[86]) * progress) * height}` + 
    ` L${(oldX[87] + (newX[87] - oldX[87]) * progress) * width},${(oldY[87] + (newY[87] - oldY[87]) * progress) * height}` + 
    ` L${(oldX[88] + (newX[88] - oldX[88]) * progress) * width},${(oldY[88] + (newY[88] - oldY[88]) * progress) * height}` + 
    ` L${(oldX[89] + (newX[89] - oldX[89]) * progress) * width},${(oldY[89] + (newY[89] - oldY[89]) * progress) * height}` + 
    ` L${(oldX[90] + (newX[90] - oldX[90]) * progress) * width},${(oldY[90] + (newY[90] - oldY[90]) * progress) * height}` + 
    ` L${(oldX[91] + (newX[91] - oldX[91]) * progress) * width},${(oldY[91] + (newY[91] - oldY[91]) * progress) * height}` + 
    ` L${(oldX[92] + (newX[92] - oldX[92]) * progress) * width},${(oldY[92] + (newY[92] - oldY[92]) * progress) * height}` + 
    ` L${(oldX[93] + (newX[93] - oldX[93]) * progress) * width},${(oldY[93] + (newY[93] - oldY[93]) * progress) * height}` + 
    ` L${(oldX[94] + (newX[94] - oldX[94]) * progress) * width},${(oldY[94] + (newY[94] - oldY[94]) * progress) * height}` + 
    ` L${(oldX[95] + (newX[95] - oldX[95]) * progress) * width},${(oldY[95] + (newY[95] - oldY[95]) * progress) * height}` + 
    ` L${(oldX[96] + (newX[96] - oldX[96]) * progress) * width},${(oldY[96] + (newY[96] - oldY[96]) * progress) * height}` + 
    ` L${(oldX[97] + (newX[97] - oldX[97]) * progress) * width},${(oldY[97] + (newY[97] - oldY[97]) * progress) * height}` + 
    ` L${(oldX[98] + (newX[98] - oldX[98]) * progress) * width},${(oldY[98] + (newY[98] - oldY[98]) * progress) * height}` + 
    ` L${(oldX[99] + (newX[99] - oldX[99]) * progress) * width},${(oldY[99] + (newY[99] - oldY[99]) * progress) * height}`

}

const SVGTransitionTemplate_50 = function (
  oldX: any, oldY: any,
  newX: any, newY: any,
  width: number,
  height: number,
  progress: number) {

  return `M0,0` +
    ` L${(oldX[0] + (newX[0] - oldX[0]) * progress) * width},${(oldY[0] + (newY[0] - oldY[0]) * progress) * height}` + 
    ` L${(oldX[1] + (newX[1] - oldX[1]) * progress) * width},${(oldY[1] + (newY[1] - oldY[1]) * progress) * height}` + 
    ` L${(oldX[2] + (newX[2] - oldX[2]) * progress) * width},${(oldY[2] + (newY[2] - oldY[2]) * progress) * height}` + 
    ` L${(oldX[3] + (newX[3] - oldX[3]) * progress) * width},${(oldY[3] + (newY[3] - oldY[3]) * progress) * height}` + 
    ` L${(oldX[4] + (newX[4] - oldX[4]) * progress) * width},${(oldY[4] + (newY[4] - oldY[4]) * progress) * height}` + 
    ` L${(oldX[5] + (newX[5] - oldX[5]) * progress) * width},${(oldY[5] + (newY[5] - oldY[5]) * progress) * height}` + 
    ` L${(oldX[6] + (newX[6] - oldX[6]) * progress) * width},${(oldY[6] + (newY[6] - oldY[6]) * progress) * height}` + 
    ` L${(oldX[7] + (newX[7] - oldX[7]) * progress) * width},${(oldY[7] + (newY[7] - oldY[7]) * progress) * height}` + 
    ` L${(oldX[8] + (newX[8] - oldX[8]) * progress) * width},${(oldY[8] + (newY[8] - oldY[8]) * progress) * height}` + 
    ` L${(oldX[9] + (newX[9] - oldX[9]) * progress) * width},${(oldY[9] + (newY[9] - oldY[9]) * progress) * height}` + 
    ` L${(oldX[10] + (newX[10] - oldX[10]) * progress) * width},${(oldY[10] + (newY[10] - oldY[10]) * progress) * height}` + 
    ` L${(oldX[11] + (newX[11] - oldX[11]) * progress) * width},${(oldY[11] + (newY[11] - oldY[11]) * progress) * height}` + 
    ` L${(oldX[12] + (newX[12] - oldX[12]) * progress) * width},${(oldY[12] + (newY[12] - oldY[12]) * progress) * height}` + 
    ` L${(oldX[13] + (newX[13] - oldX[13]) * progress) * width},${(oldY[13] + (newY[13] - oldY[13]) * progress) * height}` + 
    ` L${(oldX[14] + (newX[14] - oldX[14]) * progress) * width},${(oldY[14] + (newY[14] - oldY[14]) * progress) * height}` + 
    ` L${(oldX[15] + (newX[15] - oldX[15]) * progress) * width},${(oldY[15] + (newY[15] - oldY[15]) * progress) * height}` + 
    ` L${(oldX[16] + (newX[16] - oldX[16]) * progress) * width},${(oldY[16] + (newY[16] - oldY[16]) * progress) * height}` + 
    ` L${(oldX[17] + (newX[17] - oldX[17]) * progress) * width},${(oldY[17] + (newY[17] - oldY[17]) * progress) * height}` + 
    ` L${(oldX[18] + (newX[18] - oldX[18]) * progress) * width},${(oldY[18] + (newY[18] - oldY[18]) * progress) * height}` + 
    ` L${(oldX[19] + (newX[19] - oldX[19]) * progress) * width},${(oldY[19] + (newY[19] - oldY[19]) * progress) * height}` + 
    ` L${(oldX[20] + (newX[20] - oldX[20]) * progress) * width},${(oldY[20] + (newY[20] - oldY[20]) * progress) * height}` + 
    ` L${(oldX[21] + (newX[21] - oldX[21]) * progress) * width},${(oldY[21] + (newY[21] - oldY[21]) * progress) * height}` + 
    ` L${(oldX[22] + (newX[22] - oldX[22]) * progress) * width},${(oldY[22] + (newY[22] - oldY[22]) * progress) * height}` + 
    ` L${(oldX[23] + (newX[23] - oldX[23]) * progress) * width},${(oldY[23] + (newY[23] - oldY[23]) * progress) * height}` + 
    ` L${(oldX[24] + (newX[24] - oldX[24]) * progress) * width},${(oldY[24] + (newY[24] - oldY[24]) * progress) * height}` + 
    ` L${(oldX[25] + (newX[25] - oldX[25]) * progress) * width},${(oldY[25] + (newY[25] - oldY[25]) * progress) * height}` + 
    ` L${(oldX[26] + (newX[26] - oldX[26]) * progress) * width},${(oldY[26] + (newY[26] - oldY[26]) * progress) * height}` + 
    ` L${(oldX[27] + (newX[27] - oldX[27]) * progress) * width},${(oldY[27] + (newY[27] - oldY[27]) * progress) * height}` + 
    ` L${(oldX[28] + (newX[28] - oldX[28]) * progress) * width},${(oldY[28] + (newY[28] - oldY[28]) * progress) * height}` + 
    ` L${(oldX[29] + (newX[29] - oldX[29]) * progress) * width},${(oldY[29] + (newY[29] - oldY[29]) * progress) * height}` + 
    ` L${(oldX[30] + (newX[30] - oldX[30]) * progress) * width},${(oldY[30] + (newY[30] - oldY[30]) * progress) * height}` + 
    ` L${(oldX[31] + (newX[31] - oldX[31]) * progress) * width},${(oldY[31] + (newY[31] - oldY[31]) * progress) * height}` + 
    ` L${(oldX[32] + (newX[32] - oldX[32]) * progress) * width},${(oldY[32] + (newY[32] - oldY[32]) * progress) * height}` + 
    ` L${(oldX[33] + (newX[33] - oldX[33]) * progress) * width},${(oldY[33] + (newY[33] - oldY[33]) * progress) * height}` + 
    ` L${(oldX[34] + (newX[34] - oldX[34]) * progress) * width},${(oldY[34] + (newY[34] - oldY[34]) * progress) * height}` + 
    ` L${(oldX[35] + (newX[35] - oldX[35]) * progress) * width},${(oldY[35] + (newY[35] - oldY[35]) * progress) * height}` + 
    ` L${(oldX[36] + (newX[36] - oldX[36]) * progress) * width},${(oldY[36] + (newY[36] - oldY[36]) * progress) * height}` + 
    ` L${(oldX[37] + (newX[37] - oldX[37]) * progress) * width},${(oldY[37] + (newY[37] - oldY[37]) * progress) * height}` + 
    ` L${(oldX[38] + (newX[38] - oldX[38]) * progress) * width},${(oldY[38] + (newY[38] - oldY[38]) * progress) * height}` + 
    ` L${(oldX[39] + (newX[39] - oldX[39]) * progress) * width},${(oldY[39] + (newY[39] - oldY[39]) * progress) * height}` + 
    ` L${(oldX[40] + (newX[40] - oldX[40]) * progress) * width},${(oldY[40] + (newY[40] - oldY[40]) * progress) * height}` + 
    ` L${(oldX[41] + (newX[41] - oldX[41]) * progress) * width},${(oldY[41] + (newY[41] - oldY[41]) * progress) * height}` + 
    ` L${(oldX[42] + (newX[42] - oldX[42]) * progress) * width},${(oldY[42] + (newY[42] - oldY[42]) * progress) * height}` + 
    ` L${(oldX[43] + (newX[43] - oldX[43]) * progress) * width},${(oldY[43] + (newY[43] - oldY[43]) * progress) * height}` + 
    ` L${(oldX[44] + (newX[44] - oldX[44]) * progress) * width},${(oldY[44] + (newY[44] - oldY[44]) * progress) * height}` + 
    ` L${(oldX[45] + (newX[45] - oldX[45]) * progress) * width},${(oldY[45] + (newY[45] - oldY[45]) * progress) * height}` + 
    ` L${(oldX[46] + (newX[46] - oldX[46]) * progress) * width},${(oldY[46] + (newY[46] - oldY[46]) * progress) * height}` + 
    ` L${(oldX[47] + (newX[47] - oldX[47]) * progress) * width},${(oldY[47] + (newY[47] - oldY[47]) * progress) * height}` + 
    ` L${(oldX[48] + (newX[48] - oldX[48]) * progress) * width},${(oldY[48] + (newY[48] - oldY[48]) * progress) * height}` + 
    ` L${(oldX[49] + (newX[49] - oldX[49]) * progress) * width},${(oldY[49] + (newY[49] - oldY[49]) * progress) * height}` 

}


export {SVGTemplate,SVGTransitionTemplate,SVGTemplate_100,SVGTransitionTemplate_100,SVGTemplate_50,SVGTransitionTemplate_50}