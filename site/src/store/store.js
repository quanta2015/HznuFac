import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { get, post } from '@/util/net.js'
import * as urls from '@/constant/urls'


class Store {
  constructor() {
    makeAutoObservable(this);
  }



  async post(url, params) {
    const r = await post(url, params)
    // console.log(r, 'aaaa')
    if (r.code === 0) {
      return r.data
    } else {
      return null
      message.error(' 网络接口数据出错!')
    }
  }

  async get(url, params) {
    const r = await get(url, params)
    console.log(r)
    if (r.code === 0) {
      return r.data
    } else {
      return null
      message.error(' 网络接口数据出错!')
    }
  }

  async queryHistory(params) {
    return await this.post(urls.API_QRY_HISTORY, params)
  }

  async queryWarn(params) {
    return await this.post(urls.API_QRY_WARN, params)
  }






}

export default new Store()