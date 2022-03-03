import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {

  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log('Success:', values); //没有数据库 
    navigate('/signIn');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles['register-form']}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="密码确认"
        name="confirm password"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your confirm password!' },
          (({getFieldValue})=>({
              validator(_, value){
                if(!value || getFieldValue("password")===value){
                    return Promise.resolve()
                }else{
                  return Promise.reject('密码确认不一致！')
                }
              }
          }))
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};