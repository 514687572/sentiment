const app = getApp();
Page({
  data: {
    weboUrl:'',
  },
  urlInput: function (e) {
    this.setData({
      weboUrl: e.detail.value
    })
  },
  saveData: function (e) {
    console.log(1)
  },
}),
  Component({
    options: {
      addGlobalClass: true,
    }
  })