/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Input,  Space,  Form, Button, Row, Col, Select, InputNumber} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import {API_SERVER} from '@/constant/apis'
import { observer,MobXProviderContext } from 'mobx-react'

import s from './index.module.less';


const formItemLayout = {
  labelCol: {
    md: { span: 6 },
  },
  wrapperCol: {
    md: { span: 18 },
  },
};

const FormMain = ({colM,colJ, col_a, method, setShowForm,setLoading,setRefresh,table}) => {
  const { store } = React.useContext(MobXProviderContext)

  const formItems = [...colM,...colJ]
  const initialValues = formItems.reduce((prev, curr) => {
    return { ...prev, [curr.dataIndex]: curr.val };
  }, {});

  const onFinish = (values) => {
    const def = [...colM, ...colJ, ...col_a]

    def.forEach((item,i)=>{
      switch(item.type) {
        case 'json': item.val = JSON.stringify(values[item.dataIndex]);break;
        case 'auto_user': item.val = 'liyang';break;
        case 'auto_date': item.val = '2023-06-20 11:13:13';break;
        default: item.val = values[item.dataIndex]
      }
    })

    const params = {
      table, def, method
    }
    console.log(params,'params')

    setLoading(true)
    store.saveTable(params).then(r=>{
      setLoading(false)
      setRefresh(true)
      setShowForm(false)
    })
  };


  const renderInput = (e) => {
    switch(e.type) {
      case 'string':
        return e.key?<Input disabled />:<Input />;
      case 'double':
        return <InputNumber />;
      case 'select':
        return (
          <Select>
            {e.enum.map((val, i) => (
              <Select.Option value={val} key={i}>{val}</Select.Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.form}>
      <div className={s.wrap}>
        <Form 
          {...formItemLayout}
          initialValues={initialValues}
          onFinish={onFinish}
          >
          {colM.map(field => (
            <Form.Item
              key={field.dataIndex}
              name={field.dataIndex}
              label={field.title}
              rules={[
                {
                  required: field.req,
                  message: `请填写${field.title}!`,
                },
              ]}
            > 
              {renderInput(field)}
            </Form.Item>
          ))}


          {colJ.map((item,i)=>
            <Row key={i}>
              <Col span={4} style={{textAlign:'right'}}>{item.title}：</Col>
              <Col span={20}>
                <Form.List name={item.dataIndex}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8,alignItems: 'baseline' }}  align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'key']}
                            rules={[{ required: true, message: 'Missing Key ' }]}
                          >
                            <Input placeholder="Key" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'val']}
                            rules={[{ required: true, message: 'Missing Value' }]}
                          >
                            <Input placeholder="Value" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          添加数据
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            
          )}

          <Space style={{display: 'flex', textAlign:'right'}} >
            <Button type="default" style={{width:'120px'}} onClick={()=>setShowForm(false)} >取消</Button>  
            <Button type="primary" htmlType="submit" style={{width:'120px'}} >保存</Button>
          </Space>
        </Form>
      </div>
    </div>
    
  )

}

export default  observer(FormMain)