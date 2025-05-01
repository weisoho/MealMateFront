export default {
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/order/index',
    'pages/my-orders/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'MealMate',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#ff6b6b',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tab-icons/home.png',
        selectedIconPath: 'assets/tab-icons/home.png'
      },
      {
        pagePath: 'pages/order/index',
        text: '点单',
        iconPath: 'assets/tab-icons/order.png',
        selectedIconPath: 'assets/tab-icons/order.png'
      },
      {
        pagePath: 'pages/my-orders/index',
        text: '订单',
        iconPath: 'assets/tab-icons/list.png',
        selectedIconPath: 'assets/tab-icons/list.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/tab-icons/user.png',
        selectedIconPath: 'assets/tab-icons/user.png'
      }
    ]
  }
}
