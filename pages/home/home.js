const app = getApp();
Page({
    data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      iconList: [],
      gridCol: 3,
      skin: false
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }),
  Component({
    options: {
      addGlobalClass: true,
    }
  })