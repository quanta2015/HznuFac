export const dateList = [
  { key: 'dc', val: '本日' },
  { key: 'dp', val: '昨日' },
  { key: 'wc', val: '本周' },
  { key: 'wp', val: '上周' },
  { key: 'mc', val: '本月' },
  { key: 'mp', val: '上月' },
  { key: 'yc', val: '本年' },
  { key: 'yp', val: '去年' }
]




export const initCode = (list, ret) => {
  list.map(e => {
    if (e.code.indexOf('kt_1') >= 0) {
      ret[0].opts.push(e.code)
    } else {
      ret[1].opts.push(e.code)
    }
  })


  return ret
}