import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import { ProductIntro, ProductComments } from '../../components'
import { Row, Col, DatePicker, Spin, Divider, Typography, Anchor, Menu, Button } from 'antd'
import { productList, commentMockData } from './mockups'
import { getProductDetail } from '../../redux/productDetail/slice'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layouts/mainLayout';
import { ShoppingCartOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;

export const Detail: React.FC = () =>{
  const params = useParams()
  const id = params.id
  
  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string|null>(null)

  const loading = useSelector(state=>state.productDetail.loading)
  // const product = useSelector(state=>state.productDetail.data)

  const data = productList.filter((p)=>{
    return String(p.id)=== id
  })
  const product = data[0]
  console.log('Detail', data[0]);
  console.log('Detail', loading);
  
  const error = useSelector(state=>state.productDetail.error)
  const shoppingCartLoaing = useSelector(state=>state.shoppingCart.loading)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const fetchData = ()=>{
      console.log('到这里了');
      dispatch(getProductDetail(id))
    }
    fetchData();
  },[id])

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  return (
    <MainLayout>
        {/* 产品简介与日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={String(product.coupons)}
                points={String(product.points)}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p)=>p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{marginTop:50, marginBottom:30,display:'block'}}
                type='primary'
                danger
                loading={shoppingCartLoaing}
              ><ShoppingCartOutlined/>放入购物车</Button>
              <RangePicker open style={{marginTop:20}}/>
            </Col>
          </Row>
        </div>
        
        {/* 锚点菜单 */}
        <Anchor className={styles['product-detail-container']}>
          <Menu mode="horizontal">
            <Menu.Item key={1}><Anchor.Link href='#features' title="产品特色"></Anchor.Link></Menu.Item>
            <Menu.Item key={2}><Anchor.Link href='#fees' title="费用"></Anchor.Link></Menu.Item>
            <Menu.Item key={3}><Anchor.Link href='#notes' title="预订须知"></Anchor.Link></Menu.Item>
            <Menu.Item key={4}><Anchor.Link href='#comments' title="用户评价"></Anchor.Link></Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id='features' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.features}}></div>
        </div>
        {/* 费用 */}
        <div id='fees' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>费用须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.fees}}></div>
        </div>
        {/* 预定须知 */}
        <div id='notes' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.notes}}></div>
        </div>
        {/* 产品评价 */}
        <div id='comments' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>产品评价</Typography.Title>
          </Divider>
          <div style={{margin:40}}>
            <ProductComments data={commentMockData}></ProductComments>
          </div>
        </div>
    </MainLayout>
  )
}
