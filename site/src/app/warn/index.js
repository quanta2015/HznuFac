/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Table, Space, Spin, Button, Modal } from 'antd'
import { PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { observer, MobXProviderContext } from 'mobx-react'
import s from './index.module.less';

const { confirm } = Modal;

const col = [{
    dataIndex: 'id',
    type: 'string',
    title: '编号',
    key: true,
    width: 80,
    fixed: 'left',
    align: 'center',
  },
  {
    dataIndex: 'fdt',
    type: 'string',
    title: '报警时间',
    fixed: 'left',
    width: 150,
    req: true,
  },
  {
    dataIndex: 'tag',
    type: 'string',
    title: '报警设备',
    fixed: 'left',
    width: 150,
    req: true,
  },
  {
    dataIndex: 'level',
    type: 'string',
    title: '报警级别',
    fixed: 'left',
    width: 150,
    req: true,
  }
]


const Warn = () => {
  const { store } = React.useContext(MobXProviderContext)
  const [loading, setLoading] = useState(false)
  const [ds, setDs] = useState([])




  useEffect(() => {

    setLoading(true)
    store.queryWarn().then(r => {
      console.log(r, 'data')
      setLoading(false)
      setDs(r)
    })
  }, []);


  return (

    <div className={s.index}>
      <div className={s.main}>
        <Spin spinning={loading}>
          <Table dataSource={ds} columns={col} />
        </Spin >
      </div>
    </div>
  )

}

export default observer(Warn)