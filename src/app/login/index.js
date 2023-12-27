import React from 'react'
import { Icon, Form, notification, Input, Button, Spin, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import token from '@/util/token.js'
import * as urls from '@/constant/urls'
import {isN,msg} from '@/util/fn'
import {saveUser} from '@/util/token'

import './index.less'
import logor from "@/img/logor.png"
import logo from "@/img/logo.svg"

const isMobile =()=>{ return document.querySelector('html').clientWidth<1000}

@inject('mainStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.mainStore
    this.state = {
      loading: false,
      succ: false,
    }
  }

  // async componentDidMount() {
 //    let user = token.loadUser()
 //    if (user!==null) {
 //      this.callLogin(user)
 //    }
 //  }

  doCheckVaild = () => {
    this.props.form.validateFields(async (err, values) => {
      if (err) { return }
      await this.doLogin(values)
    })
  }

  doLogin=async(u)=>{
    console.log(u)
    this.setState({ loading: true })
    let r = await this.store.post(urls.API_LOGIN, u)

    if (r.code===200) {
      this.store.saveUser(r.data)
      saveUser(r.data)
      this.setState({ loading: false, })

      isMobile()?this.props.history.push("/run"):this.props.history.push("/")
    
    }else{
      msg('用户密码错误！')
      this.setState({ loading: false, })
    }
  }

  onKeyUp=(e)=>{
    if(e.keyCode === 13) { this.doCheckVaild() }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    
    return (
      <Spin spinning={this.state.loading}>
        <div className='g-login' onKeyUp={this.onKeyUp}>
          {this.state.succ && <Redirect to='/'/>}

          <div className="m-wrap">
            
            <div className="m-logo">
              <div className="m-title">
                <img src={logo} />
                <p>
                  <span>兴惠化纤空气处理设备云运维平台</span>
                  <label>Xinghui Chemical Fiber Air Treatment Equipment Cloud Maintenance Platform</label>
                </p>
              </div>
              <div className="m-pic">
                <img src={logor} />
              </div>
            </div>
          
          
            
            <Form className='m-form'>
              <label>用户登录</label>
              <Form.Item>
                {getFieldDecorator('usr', {
                  rules: [{required: true, message: ' 请输入账号!'}],
                  initialValue: ''
                })(
                  <Input
                    icon="search"
                    size='large'
                    placeholder="请输入账号"
                    allowClear
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('pwd', {
                  rules: [{required: true, message: '请输入密码！'}],
                })(
                  <Input.Password
                    size='large'
                    placeholder="请输入密码"
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  />)}
              </Form.Item>
              <p></p>
              <Form.Item>
                <Button type="primary" className="input-btn" onClick={this.doCheckVaild} block >登 录</Button>
              </Form.Item>
            </Form>
            

          </div>
        </div>
      </Spin>
    )
  }
}

export default Form.create()(Login)
