import React from 'react'
import { Typography, Divider,Row, Col, Space } from 'antd'
import styles from './index.module.css'
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

import image1 from '../../assets/logo.svg'
import image2 from '../../assets/images/microsoft-80658_640.png'
import image3 from '../../assets/images/icon-720944_640.png'
import image4 from '../../assets/images/follow-826033_640.png'
import image5 from '../../assets/images/facebook-807588_640.png'

const partners = [
  {src: image1, title:"Microsoft"},
  {src: image2, title:"Microsoft"},
  {src: image3, title:"YouTube"},
  {src: image4, title:"Instagram"},
  {src: image5, title:"Facebook"}
]

export const BusinessPartners = ()=>{
  return (
    <div className={styles.content}>
      <Divider orientation='left'>
        <Typography.Title level={3}>合伙企业</Typography.Title>
      </Divider>
      <Row>
        <Col span={4}>
          <div style={{marginLeft:'60px',marginTop:'auto'}}>
            <Space><HeartTwoTone/></Space><Typography.Text className={styles.foot}>放心的服务</Typography.Text><br/>
            <Space><SmileTwoTone twoToneColor="#eb2f96"/></Space><Typography.Text className={styles.foot}>放心的伙伴</Typography.Text><br/>
            <Space><CheckCircleTwoTone twoToneColor="#52c41a"/></Space><Typography.Text className={styles.foot}>放心的价格</Typography.Text> 
          </div>
        </Col>
        
        {
          partners.map((p, index)=>{
            return (
              <Col span={4} key={`business-partner-${index}`}>
                <img src={p.src} alt="合作伙伴" className={styles.partner}/>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}
