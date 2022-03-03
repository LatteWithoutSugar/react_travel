import React, { useEffect } from 'react'
import styles from './index.module.css'
import { FilterArea, ProductList } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { searchProduct } from '../../redux/productSearch/slice'
import { Spin } from 'antd'
import { MainLayout } from '../../layouts/mainLayout';

export const Search: React.FC = ()=>{
  const { keywords } = useParams()
  const loading = useSelector(state=>state.productSearch.loading)
  const error = useSelector(state=>state.productSearch.error)
  const productList = useSelector(state=>state.productSearch.data)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
    dispatch(searchProduct(keywords))
  },[location])
  
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
      {/* 分类过滤器 */}
      <div className={styles['product-list-container']}>
          <FilterArea/>
      </div>
      {/* 产品搜索列表 */}
      <div className={styles['product-list-container']}>
        <ProductList data={productList}/>
      </div>
    </MainLayout>
  )
}
