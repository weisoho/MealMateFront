import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// 移除 TabBar 导入
import './index.css'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  // 模拟轮播图数据
  const bannerList = [
    { id: 1, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 2, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 3, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' }
  ]

  // 模拟热门商品数据
  const hotProducts = [
    { id: 1, name: '招牌奶茶', price: 12, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 2, name: '芝士奶盖', price: 15, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 3, name: '水果茶', price: 18, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' },
    { id: 4, name: '烤奶', price: 14, imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' }
  ]

  return (
    <View className='index'>
      {/* 轮播图 */}
      <Swiper
        className='banner'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {bannerList.map(item => (
          <SwiperItem key={item.id}>
            <Image src={item.imgUrl} className='banner-img' />
          </SwiperItem>
        ))}
      </Swiper>

      {/* 热门推荐 */}
      <View className='hot-section'>
        <View className='section-title'>热门推荐</View>
        <View className='product-list'>
          {hotProducts.map(product => (
            <View className='product-item' key={product.id}>
              <Image src={product.imgUrl} className='product-img' />
              <Text className='product-name'>{product.name}</Text>
              <Text className='product-price'>¥{product.price}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 优惠活动 */}
      <View className='promotion-section'>
        <View className='section-title'>优惠活动</View>
        <View className='promotion-banner'>
          <Image src='https://img.yzcdn.cn/vant/cat.jpeg' className='promotion-img' />
          <Text className='promotion-text'>新品上市，限时8折</Text>
        </View>
      </View>
      
      {/* 底部空白区域，为TabBar留出空间 */}
      <View style={{ height: '60px' }}></View>
      
      {/* 移除自定义TabBar组件 */}
    </View>
  )
}
