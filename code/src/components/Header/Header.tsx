import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined, GithubOutlined } from "@ant-design/icons"
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { addlanguageAction, changelanguageAction } from '../../redux/actions/language';
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next';
import { userSlice } from '../../redux/user/slice';

export const Header: React.FC = ()=>{
  const navigate = useNavigate()
  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch();
  const {t} = useTranslation()

  const data = useSelector((state) => state.user.data)
  console.log('Header组件',data);
  
  const [username, SetUsername] = useState("")
  
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items)
  const shoppingCartLoaing = useSelector((state) => state.shoppingCart.loading)

  useEffect(()=>{
    if(data){
      SetUsername(data)
    }
  },[data])

  const menuClickHandler =(e)=>{
    if(e.key==="new"){
      dispatch(addlanguageAction(nanoid(), "新语言"))
    }else{
      dispatch(changelanguageAction(e.key))
    }
  }

  const onLogout = ()=>{
    dispatch(userSlice.actions.logOut());
    navigate('/');
  }

  return (
    <div>
      <div className={styles.inner}>
        <div className={styles['top-header']}> {/* Top Header */}
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button 
              style={{marginLeft: 15, marginRight: 15}}
              overlay={
                <Menu onClick={menuClickHandler}>
                  {
                    languageList.map((l)=>{
                      return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                    })
                  }
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                  <Menu.Item><a href="https://hk.trip.com/?locale=zh_hk">繁軆中文（中國香港）</a></Menu.Item>
                  <Menu.Item><a href="https://uk.trip.com/?locale=en_gb">English（United Kingdom）</a></Menu.Item> 
                </Menu>
              }
              icon={<GlobalOutlined/>}
            >
              {language === 'en' ? 'English': '中文'}
            </Dropdown.Button>
          <Typography.Text>{t("header.author")}</Typography.Text>&nbsp;&nbsp;<GithubOutlined/>
          
          {data?
            <Button.Group className={styles['button-group']}>
              <span>{t("header.welcome")}</span>&nbsp;
              <Typography.Text>{username}</Typography.Text>&nbsp;&nbsp;
              <Button onClick={()=>{navigate('/shoppingCart')}} loading={shoppingCartLoaing}>{t("header.shoppingCart")}({shoppingCartItems.length})</Button>&nbsp;&nbsp;
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
            :
            <Button.Group className={styles['button-group']}>
              <Button onClick={()=>{navigate('/register')}}>{t("header.register")}</Button>&nbsp;&nbsp;
              <Button onClick={()=>{navigate('/signIn')}}>{t("header.signin")}</Button>
            </Button.Group>
          }
        </div>
      </div>

        <Layout.Header className={styles['app-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          <Input.Search 
            placeholder="搜索旅行目的地、主题或关键字" 
            enterButton="搜索" 
            className={styles['search-box']}
            onSearch={(keywords)=>{navigate('/search/'+keywords)}}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']}>
            <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
            <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
            <Menu.Item key={3}>{t("header.group")}</Menu.Item>
            <Menu.Item key={4}>{t("header.backpack")}</Menu.Item>
            <Menu.Item key={5}>{t("header.private")}</Menu.Item>
            <Menu.Item key={6}>{t("header.cruise")}</Menu.Item>
            <Menu.Item key={7}>{t("header.hotel")}</Menu.Item>
            <Menu.Item key={8}>{t("header.local")}</Menu.Item>
            <Menu.Item key={9}>{t("header.theme")}</Menu.Item>
            <Menu.Item key={10}>{t("header.custom")}</Menu.Item>
            <Menu.Item key={11}>{t("header.study")}</Menu.Item>
            <Menu.Item key={12}>{t("header.visa")}</Menu.Item>
            <Menu.Item key={13}>{t("header.enterprise")}</Menu.Item>
            <Menu.Item key={14}>{t("header.high_end")}</Menu.Item>
            <Menu.Item key={15}>{t("header.outdoor")}</Menu.Item>
            <Menu.Item key={16}>{t("header.insurance")}</Menu.Item>
        </Menu>
    </div>
  )
}
