import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
  {
    title: "产品",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "价格",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  order: any[];
  onCheckout: () => void;
}

export const CheckOutCard: React.FC<PropsType> = ({
  loading,
  order,
  onCheckout,
}) => {
  const paymentData: OrderItem[] = order
    ? order.map((i, index) => ({
        key: index,
        item: i.title,
        amount: (
            <>
              <Text delete>¥ {i.originalPrice} </Text>{" "}
              <Text type="danger" strong>
                ¥ {i.originalPrice * i.discount}
              </Text>
            </>
          ),
      }))
    : [];
    console.log('paymentData',paymentData);
  
  const [ss, SetS] = useState(true)
  return (
    <Card
      style={{ width: 600, marginTop: 50 }}
      actions={[
        // <Button type="primary" danger onClick={onCheckout} loading={loading}>
        <Button type="primary" danger onClick={()=>{SetS(false)}} loading={loading}>
          <CheckCircleOutlined />
          {/* 支付 */}
          {ss ? "支付" : "返回首页"}
        </Button>
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={
            <Title level={2}>
              {/* {order ? "总计" : "支付成功"} */}
              {ss ? "总计" : "支付成功"}
            </Title>
          }
          description={
            <Table<OrderItem>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
