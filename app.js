//app.js
App({
  onLaunch: function() {
    let that = this
    that.globalData.userInfo =false

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    serverUrl: "http://localhost:8015",
    hasUserInfo: true,
    userInfo:null,
  }
})