const dayjs = require("dayjs")

const lik = ['mix', 'fil', 'col', 'oth', 'fan', 'sys', 'rom']
const isC = (s) => { return (escape(s).indexOf("%u") < 0) }
const exist = (e) => {
  let list = e.split('_')
  let last = list[list.length - 1]
  if ((last === 'ops') || (last === 'fl') || (last === 'ops1') || (last === 'set')) return false
  // if (last!=='set') return false
  let ret = false
  lik.map((item, i) => {
    if (e.includes(item)) {
      ret = true
    }
  })
  return ret;
}


const savedata = (data, ret) => {
  let exist = false
  ret.map((item, i) => {
    // 已经存在 添加子类数据
    if ((item.dt === data.dt) && (item.code === data.code)) {
      item.data = [...item.data, ...data.data]
      exist = true
    }
  })

  // 不存在 增加父对象
  if (!exist) {
    ret.push(data)
  }
}


const procData = (msg, r) => {
  let m = JSON.parse(msg.toString())
  // console.log(JSON.stringify(m, null, 4))
  // console.log(JSON.stringify(m))
  let data = m.devs[0].d

  let dt = dayjs.unix(m.ts).format('YYYYMMDDHHmmss').slice(0, -2) + '00';
  let ret = []

  data.map((item, i) => {
    r.push({ dt: dt, key: item.m, val: item.v / 10 })
  })
}


const merge = (r, ret = []) => {
  r.data.sort(function(a, b) {
    var x = a.key.toLowerCase();
    var y = b.key.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  r.data.reduce((pre, cur, i) => {
    if (i === 0) {
      ret.push(cur)
      return cur
    } else if (pre.key !== cur.key) {
      ret.push(cur)
      return cur
    } else {
      return pre
    }
  }, [])
  r.dt = `${dayjs().format('YYYYMMDDHHmm')}00`
  r.data = ret
  return r
}


exports.isC = isC
exports.exist = exist
exports.merge = merge
exports.procData = procData