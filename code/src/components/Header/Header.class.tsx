import React, { Component } from 'react'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined, GithubOutlined } from "@ant-design/icons"
import styles from './index.module.css';
import store, { RootState } from '../../redux/store';
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { withTranslation, WithTranslation } from 'react-i18next'
import { changelanguageAction, addlanguageAction } from '../../redux/actions/language'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

const mapStateToProps = (state: RootState)=>{
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch)=>{
  return {
    changeLanguage:(code:"zh"|"en")=>{
      const action = changelanguageAction(code)
      dispatch(action)
    },
    addLanguage:(code:string, name:string)=>{
      const action = addlanguageAction(code, name)
      dispatch(action)
    }
  }
}

type PropsType = any & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
class HeaderComponent extends Component<PropsType>{

  menuClickHandler =(e)=>{
    if(e.key==="new"){
      this.props.addLanguage(nanoid(), "新语言")
    }else{
      this.props.changelanguageAction(e.key)
    }
  }

  render(){
    const {t} = this.props
    return (
      <div>
        <div className={styles.inner}>
          <div className={styles['top-header']}> {/* Top Header */}
            <Typography.Text>
              {t("header.slogan")}
            </Typography.Text>
            <Dropdown.Button 
              style={{marginLeft: 15, marginRight: 15}}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {
                    this.props.languageList.map((l)=>{
                      return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                    })
                  }
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                  {/* <Menu.Item><a href="https://hk.trip.com/?locale=zh_hk">繁軆中文（中國香港）</a></Menu.Item>
                  <Menu.Item><a href="https://us.trip.com/?locale=en_US">English（United States）</a></Menu.Item> 
                  <Menu.Item><a href="https://uk.trip.com/?locale=en_gb">English（United Kingdom）</a></Menu.Item>  */}
                </Menu>
              }
              icon={<GlobalOutlined/>}
            >
              {this.props.language === 'en' ? 'English': '中文'}
            </Dropdown.Button>
            <Typography.Text>Latte不加糖</Typography.Text>&nbsp;&nbsp;<GithubOutlined/>
            <Button.Group className={styles['button-group']}>
              <Link to="/register"><Button>{t("header.register")}</Button></Link>&nbsp;&nbsp;
              <Link to="/signIn"><Button>{t("header.signin")}</Button></Link>&nbsp;&nbsp;
            </Button.Group>
          </div>
        </div>

          <Layout.Header className={styles['app-header']}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
            <Input.Search placeholder="搜索旅行目的地、主题或关键字" enterButton="搜索" className={styles['search-box']}/>
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
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderComponent))
