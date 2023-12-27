export const MAP_NAME = [{label:'CP1', value:'一分厂', opts:[]},{label:'CP2', value:'二分厂', opts:[]} ]


export const nameByKey =(key)=>{
  const item = MAP_NAME.find(e => e.label === key);
  return item ? item.value : undefined;
}


export const initCode = (list,ret)=>{
  list.map(e=>{
    if (e.code.indexOf('kt_1')>=0) {
      ret[0].opts.push(e.code)
    }else{
      ret[1].opts.push(e.code)
    }
  })


  return ret
}