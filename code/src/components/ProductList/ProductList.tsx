import React from "react";
import { Link } from "react-router-dom";
import { List, Rate, Space, Image, Typography } from "antd";
import { LikeOutlined, StarOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Product {
  description: string;
  discount: number;
  id: string;
  originalPrice: number;
  price: number;
  rating: number;
  title: string;
  touristRoutePictures: any[];
}
interface PropsType {
  data: Product[];
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    imgSrc: p.touristRoutePictures[0].url,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    rating: p.rating,
  }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList: React.FC<PropsType> = ({ data }) => {
  const products = listData(data);
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={products}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <>
              <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </>,
          ]}
          extra={
            <Image width={272} height={172} alt="image" src={item.imgSrc} />
          }
        >
          <List.Item.Meta
            title={
              <>
                {item.discount ? (
                  <>
                    <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                      ¥ {item.originalPrice}
                    </Text>
                    <Text
                      type="danger"
                      style={{ fontSize: 20, fontWeight: 400 }}
                    >
                      {" "}
                      ¥ {item.price}
                    </Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 20, fontWeight: 400 }}>
                    ¥ {item.price}
                  </Text>
                )}
                <Link to={"/detail/" + item.id}> {item.title}</Link>
              </>
            }
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};
