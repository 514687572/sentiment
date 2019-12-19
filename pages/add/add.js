const app = getApp();
Page({
  data: {
    weboUrl:'',
  }
}),
  Component({
    options: {
      addGlobalClass: true,
  }, methods: {
    saveData: function (e) {
      let glb = getApp().globalData
      let sub = {
        subUrl: this.data.weboUrl,
        userOpenId: JSON.parse(wx.getStorageSync('userKey')).sessionKey.split("&$&")[1]
      }

      wx.request({
        url: glb.serverUrl + '/sub/addSubscribe', //仅为示例，并非真实的接口地址
        method:'POST',
        data: {
          subUrl: this.data.weboUrl,
          userOpenId: JSON.parse(wx.getStorageSync('userKey')).sessionKey.split("&$&")[1]
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }, urlInput: function (e) {
      this.setData({
        weboUrl: e.detail.value
      })
    }
  }
  })