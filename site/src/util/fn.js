import dayjs from 'dayjs'



export const clone = (obj) => {
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    let value = obj[key];
    copy[key] = (typeof value === 'object' && value !== null) ? clone(value) : value;
  }
  return copy;
}


export const clearSets = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] instanceof Set) {
      obj[key].clear();
    }
  }
}

export const genClr = (n) =>
  Array.from({ length: n }, () => {
    const r = Math.floor(Math.random() * 128); // 0-127
    const g = Math.floor(Math.random() * 128); // 0-127
    const b = Math.floor(Math.random() * 128); // 0-127
    const rHex = (r + 128).toString(16).padStart(2, '0'); // 调整范围并转为16进制
    const gHex = (g + 128).toString(16).padStart(2, '0'); // 调整范围并转为16进制
    const bHex = (b + 128).toString(16).padStart(2, '0'); // 调整范围并转为16进制
    return `#${rHex}${gHex}${bHex}`;
  });


export const listInt = (n) => Array.from({ length: n }, (_, i) => (String(i + 1).padStart(2, '0')))
export const optInit = (o) => o.map(item => ({ value: item, label: item }))
export const optInitN = (list, item, fdb) => list.map(o => {

  if ((item.fld_db === '') || (item.fld_db === undefined)) {
    return { value: o, label: o }
  } else {
    // console.log(item.fld_db,'item')
    let name = item.fld_db.substring(0, 2)
    let set = fdb[name]
    return { value: o, label: o, disabled: set.has(o) }
  }
})


export const isN = (e) => {
  return ((e === null) || (e === '') || (e === undefined)) ? true : false
}

export const isMobile = (width) => {
  return document.querySelector('html').clientWidth < width
}


export const scrollToBottom = (direction) => {
  setTimeout(() => {
    const el = document.getElementById("chatContent")
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, 100)
}


export const filterData = (data, type) => {
  let condSet, ret = []
  switch (type) {
    case 'sign':
      condSet = new Set(['json', 'auto_user', 'auto_date'])
      ret = data.filter(item => true ^ condSet.has(item.type))
      break;
    case 'json':
      condSet = new Set(['json'])
      ret = data.filter(item => false ^ condSet.has(item.type))
      break;
    case 'auto':
      ret = data.filter(item => item.type.startsWith('auto_'))
      break;
  }
  return ret
}


export const getKeyField = (e) => {
  let list = e.filter(item => item.key)
  return list[0].dataIndex
}



export const caluPeriod = (e) => {
  let fr, to, type, format = 'MM-DD'

  switch (e) {
    case 'dc':
      fr = dayjs().startOf('day')
      to = dayjs().endOf('day')
      type = 'day'
      break;
    case 'dp':
      fr = dayjs().subtract(1, 'day').startOf('day')
      to = dayjs().subtract(1, 'day').endOf('day')
      type = 'day'
      break;
    case 'wc':
      fr = dayjs().startOf('week').startOf('day')
      to = dayjs().endOf('week').endOf('day')
      type = 'week'
      break;
    case 'wp':
      fr = dayjs().subtract(1, 'weeks').startOf('week').startOf('day')
      to = dayjs().subtract(1, 'weeks').endOf('week').endOf('day')
      type = 'week'
      break;
    case 'mc':
      fr = dayjs().startOf('month').startOf('day')
      to = dayjs().endOf('month').endOf('day')
      type = 'month'
      break;
    case 'mp':
      fr = dayjs().subtract(1, 'month').startOf('month').startOf('day')
      to = dayjs().subtract(1, 'month').endOf('month').endOf('day')
      type = 'month'
      break;
    case 'yc':
      fr = dayjs().startOf('year').startOf('day')
      to = dayjs().endOf('year').endOf('day')
      format = 'YYYY-MM-DD'
      type = 'year'
      break;
    case 'yp':
      fr = dayjs().subtract(1, 'year').startOf('year').startOf('day')
      to = dayjs().subtract(1, 'year').endOf('year').endOf('day')
      format = 'YYYY-MM-DD'
      type = 'year'
      break;
  }

  return { fr, to, type, format }
}