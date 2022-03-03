import React from 'react'
import styles from './index.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GifOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

export const SideMenu: React.FC = ()=>{
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {
        sideMenuList.map((m)=>{
          return <Menu.SubMenu key={`side-menu-${nanoid()}`} title={<span><GifOutlined/>{m.title}</span>}>
            {
              m.subMenu.map((s)=>{
                return <Menu.SubMenu key={`sub-menu-${nanoid()}`} title={<span><GifOutlined/>{s.title}</span>}>
                  {
                    s.subMenu.map((ss)=>{
                      return <Menu.Item key={`sub-sub-menu-${nanoid()}`}><span><GifOutlined/>{ss}</span></Menu.Item>
                    })
                  }
                </Menu.SubMenu>
              })
            }
          </Menu.SubMenu>
        })
      }
    </Menu>
  )
}
