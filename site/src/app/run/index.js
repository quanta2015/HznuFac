import React, { useEffect, useState, useRef } from 'react';import dayjs from 'dayjs'import mqtt from 'mqtt';import { inject, observer, MobXProviderContext } from 'mobx-react'import { Spin, Icon, Input, Select, Button, message } from 'antd'import { API_SERVER } from '@/constant/apis'import style from './style.less';import * as urls from '@/constant/urls'import { serverUrl, SAV_TIME, SubRtg, saveData, cfList, sortData, groupData, mergeData } from './mqtt'import bg from '@/img/fac-bg.png'import act from '@/img/status-act.png'import war from '@/img/status-war.png'const Run = () => {  const { store } = React.useContext(MobXProviderContext)  const [loading, setLoading] = useState(false)  const [isPlaying, setIsPlaying] = useState(false);  const [tp, setTp] = useState({    tag01: { v: null, s: 'g' },    tag02: { v: null, s: 'g' },    tag03: { v: null, s: 'g' },    tag04: { v: null, s: 'g' },    tag05: { v: null, s: 'g' },    tag06: { v: null, s: 'g' },    tag07: { v: null, s: 'g' },    tag08: { v: null, s: 'g' },  })  const [g1, setG1] = useState([    { x: 743, y: 250, status: true },    { x: 790, y: 264, status: true },    { x: 837, y: 278, status: true },    { x: 884, y: 292, status: true },  ])  const [g2, setG2] = useState([    { x: 499, y: 464, status: true },    { x: 546, y: 478, status: true },    { x: 593, y: 492, status: true },    { x: 640, y: 506, status: true },  ])  const audioRef = useRef(null);  const startMqtt = () => {    const client = mqtt.connect('ws://121.43.120.234:8080');    client.on("connect", () => {      console.log("服务器连接成功");      cfList.map(e => client.subscribe(SubRtg(e), {}))    })    client.on("message", (addr, msg) => {      let m = JSON.parse(msg.toString())      let data = m.devs[0].d      // console.log(data)      // data = data.map(o => {      //   if (o.m === 'tag06') {      //     o.v = 3518      //   }      //   return o      // })      data.map(o => {        tp[o.m].v = o.v / 10        if ((o.v >= 500) && (o.v < 1000)) {          tp[o.m].s = 'y'        } else if ((o.v >= 1000) && (o.v < 2200)) {          tp[o.m].s = 'z'          setIsPlaying(true)        } else if (o.v >= 2200) {          tp[o.m].s = 'r'          setIsPlaying(true)        }        const tagToG1Index = {          'tag01': 0,          'tag05': 0,          'tag02': 1,          'tag06': 1,          'tag03': 2,          'tag07': 2,          'tag04': 3,          'tag08': 3,        };        if (o.v > 1000) {          g1[tagToG1Index[o.m]].status = false;        }      })      setTp({ ...tp })    })  }  useEffect(() => {    if (isPlaying) {      audioRef.current.play();      setTimeout(() => {        audioRef.current.pause();        setIsPlaying(false);      }, 10000);    } else {      audioRef.current.pause();    }  }, [isPlaying]);  useEffect(() => {    startMqtt()  }, []);  // console.log(JSON.stringify(tp, null, 2))  return (    <Spin spinning={loading}>      <div className="g-run">        <audio ref={audioRef} src={'alert.mp3'} />        <div className="m-bd">          <img src={bg} alt="" />          <div className="m-graph">            <div className="m-row">              <span>正常</span>              <span>一级报警</span>              <span>二级报警</span>              <span>三级报警</span>            </div>            <div className="m-row">              <em className="g"></em>              <em className="y"></em>              <em className="z"></em>              <em className="r"></em>            </div>          </div>          <div className="m-status">            {g1.map((o,i)=>               <img key={i} className="item-status" src={o.status?act:war} style={{left:o.x, top:o.y }} alt="" />            )}            {g2.map((o,i)=>               <img key={i} className="item-status" src={o.status?act:war} style={{left:o.x, top:o.y }} alt="" />            )}          </div>                    <div className="m-info m-info-1">            <div className="m-row">              <label>设备L1</label>              <span>传感器1</span><i className={tp?.tag01.s}>{tp?.tag01.v}℃</i>              <span>传感器2</span><i className={tp?.tag05.s}>{tp?.tag05.v}℃</i>            </div>            <div className="m-row">              <label>设备L2</label>              <span>传感器1</span><i className={tp?.tag02.s}>{tp?.tag02.v}℃</i>              <span>传感器2</span><i className={tp?.tag06.s}>{tp?.tag06.v}℃</i>            </div>            <div className="m-row">              <label>设备L3</label>              <span>传感器1</span><i className={tp?.tag03.s}>{tp?.tag03.v}℃</i>              <span>传感器2</span><i className={tp?.tag07.s}>{tp?.tag07.v}℃</i>            </div>            <div className="m-row">              <label>设备L4</label>              <span>传感器1</span><i className={tp?.tag04.s}>{tp?.tag04.v}℃</i>              <span>传感器2</span><i className={tp?.tag08.s}>{tp?.tag08.v}℃</i>            </div>          </div>          <div className="m-info m-info-2">            <div className="m-row">              <label>设备R1</label>              <span>传感器1</span><i>29.1℃</i>              <span>传感器2</span><i>34.1℃</i>            </div>            <div className="m-row">              <label>设备R2</label>              <span>传感器1</span><i>29.1℃</i>              <span>传感器2</span><i>34.1℃</i>            </div>            <div className="m-row">              <label>设备R3</label>              <span>传感器1</span><i>29.1℃</i>              <span>传感器2</span><i>34.1℃</i>            </div>            <div className="m-row">              <label>设备R4</label>              <span>传感器1</span><i>29.1℃</i>              <span>传感器2</span><i>34.1℃</i>            </div>          </div>        </div>      </div>    </Spin>  );}export default observer(Run)