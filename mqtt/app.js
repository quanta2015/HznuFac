const mqtt = require("mqtt")
const axios = require('axios')
const { isC, exist, procData, merge } = require("./fn")


const SERVER = '121.43.120.234'
const cfList = [
  { "key": "hznu", "sn": "test" },
  { "key": "hznu", "sn": "test2" }
]

const alertList = {
  tag01: 0,
  tag02: 0,
  tag03: 0,
  tag04: 0,
  tag05: 0,
  tag06: 0,
  tag07: 0,
  tag08: 0,
}

var ret = []
const SAV_TIME = 10000
const SubRtg = (e) => `/edge/${e.key}/${e.sn}/rtg`
const URL_SAVE = `http://${SERVER}/saveSensorData`
const URL_WARN = `http://${SERVER}/saveWarn`
const client = mqtt.connect(`mqtt://${SERVER}:1883`);

client.on("connect", function() {
  console.log("服务器连接成功");
  cfList.map((item) => {
    client.subscribe(SubRtg(item), { connectTimeout: 4000, })
  })
});

client.on("message", function(top, msg) {
  procData(msg, ret)
});


// setInterval(() => {
//   ret = ret.map(o => {
//     if (o.key === 'tag04') {
//       o.val = 240
//     }
//     // console.log(o) //     return o
//   })
// }, 5000)

setInterval(() => {
  // console.log(ret)
  ret = ret.reduce((acc, item) => {
    let duplicate = acc.find(el => el.key === item.key && el.dt === item.dt);
    if (!duplicate) {
      acc.push(item);
    }
    return acc;
  }, []);

  ret.sort((a, b) => {
    if (a.dt < b.dt) return -1;
    if (a.dt > b.dt) return 1;
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });

  let tmp = ret
  ret = []

  var list = tmp.reduce((pre, cur, index) => {
    let len = pre.length
    if (index === 0) {
      let { dt, key, val } = cur
      pre.push({ dt: dt, data: [{ key: key, val: val }] })
    } else if (pre[len - 1].dt === cur.dt) {
      let { dt, key, val } = cur
      pre[len - 1].data.push({ key: key, val: val })
    } else if (pre[len - 1].dt !== cur.dt) {
      let { dt, key, val } = cur
      pre.push({ dt: dt, data: [{ key: key, val: val }] })
    }
    return pre
  }, [])

  list.map(o => {
    o.data.map(async item => {

      let pre = alertList[item.key]
      let alert = item.val >= 220 ? 3 : (item.val >= 100 ? 2 : 0);

      if ((alert === 0) && (pre === 1)) {
        alertList[item.key] = 0
        // console.log(item)
        // console.log('end', item.key, o.dt)
      } else if ((alert > 0) && (pre === 0)) {
        // console.log(item)
        // console.log('start', item.key, o.dt)
        alertList[item.key] = 1
        const params = {
          dt: o.dt,
          tag: item.key,
          level: (alert === 2) ? '二级报警' : '三级报警'
        }
        await axios.post(URL_WARN, params).catch(err => {
          console.log(err)
        })
      }
    })

  })

  // console.log(JSON.stringify(list, null, 4), '2')

  list.map(async (item, i) => {
    let r = await axios.post(URL_SAVE, item).catch(err => {
      console.log(err)
    })
  })
}, SAV_TIME)