import React from "react";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts/mainLayout";
import { Row, Col } from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrder: React.FC = (props) => {

  const data = useSelector(state=>state.shoppingCart.items)
  const loading = useSelector(state=>state.placeOrder.loading)
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
            <PaymentForm />
        </Col>
        <Col span={12}>
            <CheckOutCard 
              loading={loading}
              order={data}
              onCheckout={()=>{
                if(data){
                  dispatch(placeOrder(data))
                }
              }}
            />
        </Col>
      </Row>
    </MainLayout>
  );
};
