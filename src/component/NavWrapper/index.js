import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {withRouter} from "react-router-dom";
import { Icon } from 'antd'
import {isN,msg} from 'util/fn'
import {loadUser} from 'util/token'



import logo from "img/logo.svg"
import './index.less'


var MENU_MAIN = [ {name:'实时监测',key:'/run', role:0, list: []},
                  {name:'机组编辑',key:'/edit',role:0, list: []},
                  {name:'系统分析',key:'', role:0, 
                    list: [{name:'基本分析',key:'/sysp'}, 
                           {name:'综合图表分析',key:'/sysg1'},
                           {name:'数据综合分析',key:'/sysg3'},
                           {name:'风管能量损失',key:'/sysg4'},
                           {name:'机组耗能分析',key:'/sysg6'},
                           {name:'空调能耗优化',key:'/sysg2'},
                           {name:'室内外参数分析',key:'/sysg5'},
                          ]},
                  {name:'用户管理',key:'/conf',role:0, list: []}]

var $ = (o) =>{ return document.querySelector(o) }


@inject('mainStore')
@observer
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)
    this.store = this.props.mainStore
    this.state = {
      cur: '/',
      show: true,
      sel: 0,
      menu: [],
    }
	}

  async componentDidMount() {
    let user = loadUser()
    if (!isN(user)) {
      let role = user.role.split('|')
      let {menu}= this.state
      MENU_MAIN.map((item,i)=>{
        if (parseInt(role[i])) { menu.push(item) }
      })
      this.setState({menu:menu})
    }
  }

  doMenu = (item,i) => {

    if (isN(item.key)) return

    this.setState({ sel: i })
    this.props.history.push(item.key)
  }


  logout = ()=>{
    this.store.logout()
    this.props.history.push('/')
  }



	render() {
    const { menu,sel } = this.state
    const { currUser } = this.store

    return (
      <div className="g-nav">
        <div className="m-nav">
          <a className="navbar-brand" href="/">
            <img src={logo} className="d-inline-block align-top" />
          </a>
          <label>杭州师范大学有机硅研究所</label>
          
        </div>

        <div className="g-main">
          {this.props.children}
        </div>

        
      </div>
    )
  }
}

export default withRouter(NavWrapper)
