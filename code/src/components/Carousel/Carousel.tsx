import React from 'react'
import styles from './index.module.css'
import { Image, Carousel as AntCarousel } from 'antd'

import carousel_1 from '../../assets/images/carousel_1.jpg'
import carousel_2 from '../../assets/images/carousel_2.jpg'
import carousel_3 from '../../assets/images/carousel_3.jpg'
import carousel_4 from '../../assets/images/carousel_4.jpg'
import carousel_5 from '../../assets/images/carousel_5.jpg'

export const Carousal: React.FC = ()=>{
  return (
    <AntCarousel autoplay className={styles.slider}>
      <Image src={carousel_1} alt='走马灯图片'></Image>
      <Image src={carousel_2} alt='走马灯图片'></Image>
      <Image src={carousel_3} alt='走马灯图片'></Image>
      <Image src={carousel_4} alt='走马灯图片'></Image>
      <Image src={carousel_5} alt='走马灯图片'></Image>
    </AntCarousel>
  )
}
