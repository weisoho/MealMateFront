export default {
  pages: [
    'pages/index/index',
    'pages/order/index',
    'pages/my-orders/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '点餐小程序',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // 移除custom属性
    color: "#999",
    selectedColor: "#ff6b6b",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        // 添加临时图标，后续可替换
        iconPath: "./assets/tab-icons/home.png",
        selectedIconPath: "./assets/tab-icons/home-active.png"
      },
      {
        pagePath: "pages/order/index",
        text: "点单",
        iconPath: "./assets/tab-icons/order.png",
        selectedIconPath: "./assets/tab-icons/order-active.png"
      },
      {
        pagePath: "pages/my-orders/index",
        text: "订单",
        iconPath: "./assets/tab-icons/list.png",
        selectedIconPath: "./assets/tab-icons/list-active.png"
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "./assets/tab-icons/user.png",
        selectedIconPath: "./assets/tab-icons/user-active.png"
      }
    ]
  }
}
