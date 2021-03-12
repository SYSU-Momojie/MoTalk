import Notify from '@vant/weapp/notify/notify';

const api_host = 'http://localhost:9871/api/motalk/'
// const api_host = 'https://www.nemomojie.com/api/motalk/'

module.exports = Behavior({
  properties: {
    spinShow: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    post: function(api, param, success) {
      var callback = function(resp) {
        console.log(resp);
        if (resp.errMsg === 'request:ok' && resp.data instanceof Object) {
          success(resp.data);
        } else {
          Notify({
            message: `请求失败: ${resp.errMsg}`,
            type: 'danger'
          })
        }
        this.showSpin(false);
      };
      var obj = {
        url: api_host + api,
        data: param,
        method: 'POST',
        complete: callback.bind(this)
      }
      this.showSpin(true);
      wx.request(obj)
    },
    showSpin: function(s) {
      this.setData({
        spinShow: s
      });
    }
  }
})