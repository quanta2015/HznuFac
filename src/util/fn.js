import {  notification } from 'antd'
import React from 'react'

export const facTitle = {
  CP1: ["K1空调机组",
        "K2空调机组",
        "K3空调机组",
        "K4空调机组",
        "K5空调机组",
        "K6空调机组"],
  CP2: ["K7空调机组",
        "K8空调机组",
        "K9空调机组",
        "K10空调机组"]
}


export const facName = {
  kt_111: {name:`K1侧吹风`, type: `[kt_111]`},
  kt_112: {name:`K1环境风`, type: `[kt_112]`},
  kt_121: {name:`K2侧吹风`, type: `[kt_121]`},
  kt_122: {name:`K2环境风`, type: `[kt_122]`},
  kt_131: {name:`K3侧吹风`, type: `[kt_131]`},
  kt_132: {name:`K3环境风`, type: `[kt_132]`},
  kt_141: {name:`K4侧吹风`, type: `[kt_141]`},
  kt_142: {name:`K4环境风`, type: `[kt_142]`},
  kt_151: {name:`K5侧吹风`, type: `[kt_151]`},
  kt_152: {name:`K5环境风`, type: `[kt_152]`},
  kt_161: {name:`K6侧吹风`, type: `[kt_161]`},
  kt_162: {name:`K6环境风`, type: `[kt_162]`},
  last:   {name:`最优值`},

  kt_211: {name:`K7侧吹风`, type: `[kt_211]`},
  kt_212: {name:`K7环境风`, type: `[kt_212]`},
  kt_221: {name:`K8侧吹风`, type: `[kt_221]`},
  kt_222: {name:`K8环境风`, type: `[kt_222]`},
  kt_231: {name:`K9侧吹风`, type: `[kt_231]`},
  kt_232: {name:`K9环境风`, type: `[kt_232]`},
  kt_241: {name:`K10侧吹风`,type: `[kt_241]`},
  kt_242: {name:`K10环境风`,type: `[kt_242]`},
  last:   {name:`最优值`},
}

var unitList = {tp:'℃',rh:'%',dv:'g/kg',hv:'kj/kg',fr:'hz',po:'kw',poa:'kw',el:'kwh',ela:'kwh',ffl:'m³/h',fsp:'m/s',fpr:'Pa',pr:'Pa',vls:'',vlp:'%',vlpc:'%',prd:'',coh:'',son:'',sof:'',sma:'',wsp:'m/s',wfl:'m³/h',wfla:'m³/h',wtpi:'℃',wtpo:'℃',chcp:'kw',chcpa:'kw',ot1:'',ot2:'',ot3:'',vplc:'%',fprd:'pa',wprd:'kpa'}

export const fieldList = (i,type,ret=null)=>{
  switch(type) {
    case 'mix':
      ret = `mix_${i}_tp_1,mix_${i}_rh_1,mix_${i}_dv_1,mix_${i}_hv_1,mix_${i}_tp_2,mix_${i}_rh_2,mix_${i}_dv_2,mix_${i}_hv_2,mix_${i}_tp_3,mix_${i}_rh_3,mix_${i}_dv_3,mix_${i}_hv_3,mix_${i}_tp_4,mix_${i}_rh_4,mix_${i}_dv_4,mix_${i}_hv_4,mix_${i}_ffl,mix_${i}_fsp,mix_${i}_vls_1,mix_${i}_vls_2,mix_${i}_vlp_1,mix_${i}_vlp_2`.split(',')
      break;
    case 'fil':
      ret = `fil_${i}_prd`.split(',')
      break;
    case 'col':
      ret = `col_${i}_coh,col_${i}_tp_1,col_${i}_rh_1,col_${i}_dv_1,col_${i}_hv_1,col_${i}_tp_2,col_${i}_rh_2,col_${i}_dv_2,col_${i}_hv_2,col_${i}_ffl,col_${i}_fsp,col_${i}_fprd,col_${i}_wtpi,col_${i}_wtpo,col_${i}_wsp,col_${i}_wprd,col_${i}_wfl,col_${i}_wfla,col_${i}_vls,col_${i}_vlp,col_${i}_vlpc,col_${i}_hcp,col_${i}_hcpa,col_${i}_chcp,col_${i}_chcpa`.split(',')
      break;
    case 'oth':
      ret = `oth_${i}_son,oth_${i}_sof,oth_${i}_tp_1,oth_${i}_rh_1,oth_${i}_dv_1,oth_${i}_hv_1,oth_${i}_tp_2,oth_${i}_rh_2,oth_${i}_dv_2,oth_${i}_hv_2,oth_${i}_ffl,oth_${i}_fsp,oth_${i}_hcp,oth_${i}_chcp`.split(',')
      break;
    case 'fan':
      ret = `fan_${i}_tp_1,fan_${i}_tp_2,fan_${i}_tp_3,fan_${i}_rh_1,fan_${i}_rh_2,fan_${i}_rh_3,fan_${i}_dv_1,fan_${i}_dv_2,fan_${i}_dv_3,fan_${i}_hv_1,fan_${i}_hv_2,fan_${i}_hv_3,fan_${i}_son,fan_${i}_sof,fan_${i}_sma,fan_${i}_ffl_1,fan_${i}_ffl_2,fan_${i}_ffl_3,fan_${i}_fsp,fan_${i}_fpr,fan_${i}_fr,fan_${i}_po,fan_${i}_poa,fan_${i}_el,fan_${i}_ela,fan_${i}_rem,fan_${i}_pr_1,fan_${i}_pr_2,fan_${i}_pr_3`.split(',')
      break;
    default:
      ret = []
  } 
  return ret
}

export const formatDt=(d,t)=>{
  d = d.replaceAll('-','')
  t = t.replaceAll(':','')
  return parseInt(`${d}${t}`)
}

export const formatDtFromInt = (d)=>{
  d = d.toString()
  let year  = d.substr(0,4)
  let month = d.substr(4,2)
  let day   = d.substr(6,2)
  let hour  = d.substr(8,2)
  let minute= d.substr(10,2)
  let second= d.substr(12,2)
  let ret = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return ret
}

export const formatDtFromIntS = (d)=>{
  d = d.toString()
  let year  = d.substr(2,2)
  let month = d.substr(4,2)
  let day   = d.substr(6,2)
  let hour  = d.substr(8,2)
  let minute= d.substr(10,2)
  let ret = `${year}-${month}-${day} ${hour}:${minute}`
  return ret
}


export const formatState = (d)=>{
  return (d==1)? '运行':'关机'
}


export const unitByVal = (field)=>{
  console.log('field',field)
  return unitList[field.split('_')[0]]
}


export const intList=(e)=>{
  return Array.from(Array(e), (_, i) => i+1)
} 

export const isN=(e)=>{
  return  ((e===null)||(e==='')||(e===undefined))?true:false
}

export const isMobile =()=>{ 
  return document.querySelector('html').clientWidth<1000
}


export const msg=(info)=>{
  notification.info({
    message:'提示',
    description: info,
    placement: 'topLeft',
    style: {
      width: 300,
      color:'#ff0000',
      background: 'rgba(255,255,255,.9)',
    },
  })
}



export const Svg = ({id, size, color,sprite}) => {

  return (
   <svg className="m-svg" fill={color} width={size} height={size} viewBox="0 0 24 24">
       <use xlinkHref={`${sprite}#${id}`} />
   </svg>
  )

}



export const clone =(e)=> {
  return JSON.parse(JSON.stringify(e))
}
