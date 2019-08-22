const apiHttp = "http://localhost:8015";
const apiHttps = "https://kqyh.huaxiok.com/";
function fun(url, method, data, header) {
  data = data || {};
  header = header || {};
  let sessionId = wx.getStorageSync("UserSessionId");
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId;
    }
  }

  let promise = new Promise(function(resolve, reject) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    wx.request({
      url: apiHttp + url,
      header: header,
      data: data,
      method: method,
      success: function(res) {
        wx.hideLoading();
        if (typeof res.data === "object") {
          if (res.data.status) {
            if (res.data.status === 200) {
                res = res.data
            } else {
              wx.showToast({
                title: res.data.message,
                icon: "none"
              });
              reject(res.data.message);
            }
          }
        }
        resolve(res);
      },
      fail(error){
      wx.hideLoading();
        wx.showToast({
          title:'请求失败，请稍后重试',
          icon:'none',
          mask:true
        });
        reject(error)
      },
      complete: function() {
       
      }
    });
  })
  return promise;
}

function upload(url, name, filePath) {
  let header = {};
  let sessionId = wx.getStorageSync("UserSessionId"); //从缓存中拿该信息
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId; //添加到请求头中
    }
  }
  wx.showNavigationBarLoading();
  let promise = new Promise(function(resolve, reject) {
    wx.uploadFile({
      url: apiHttp + url,
      filePath: filePath,
      name: name,
      header: header,
      success: function(res) {
        resolve(res);
      },
      fail: reject,
      complete: function() {
       
      }
    });
  });
  return promise;
}
module.exports = {
  apiHttp: apiHttp,
  "get": function(url, data, header) {
    return fun(url, "GET", data, header);
  },
  "post": function(url, data, header) {
    return fun(url, "POST", data, header);
  },
  upload: function(url, name, filePath) {
    return upload(url, name, filePath);
  }
};
