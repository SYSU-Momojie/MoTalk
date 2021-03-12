// app.js

App({

  onLaunch() {
    wx.login({
      success (res) {
        if (res.code) {
          var payload = {
            program: 'motalk',
            code: res.code
          };
          var param = {
            url: 'http://localhost:9871/api/auth/wxLogin/',
            data: payload,
            method: 'POST',
            complete: function(resp) {
              console.log(resp);
            }
          };

          wx.request(param);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  globalData: {
    userInfo: null
  }
})
