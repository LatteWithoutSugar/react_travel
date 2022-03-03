import styles from './index.module.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { signIn } from '../../redux/user/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {

  const loading = useSelector(state=>state.user.loading);
  // const error = useSelector(state=>state.user.error);
  const data = useSelector(state=>state.user.data);
  console.log('sign Inform组件', data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(typeof(data)==='string'){
      navigate('/');
    }
  },[data]);

  const onFinish = (values: any) => {
    dispatch(signIn({email: values.username, password: values.password}));
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
      className={styles['signIn-form']}
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

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};