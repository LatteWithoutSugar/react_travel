import React from "react";
import styles from "./index.module.css";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard } from "../../components";
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { checkOut } from "../../redux/shoppingCart/slice";

export const ShoppingCart: React.FC = (props) => {
  const data = useSelector(state=>state.user.data)
  const shoppingCartItems = useSelector(state=>state.shoppingCart.items)
  console.log('shoppingCartItems',shoppingCartItems);
  
  const loaing = useSelector(state=>state.user.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartItems}/>
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard 
                loading={loaing}
                originalPrice={shoppingCartItems.map(p=>p.originalPrice).reduce((a,b)=>a+b,0)}
                price={shoppingCartItems.map(p=>p.originalPrice*(p.discount? p.discount: 1)).reduce((a,b)=>a+b,0)}
                onCheckout={()=>{
                  if(shoppingCartItems.length<=0){
                    return 
                  }else{
                    if(typeof(data)==='string'){
                      dispatch(checkOut(data))
                    }
                    navigate('/placeOrder')
                  }
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
