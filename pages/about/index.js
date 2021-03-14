// pages/about/index.js
const computedBehavior = require('miniprogram-computed');

Page({

  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isAdmin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toLogin();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toLogin: function() {
    wx.login({
      success: this.afterWechatLogin.bind(this)
    });
  },

  afterWechatLogin: function(res) {
    if (res.code) {
      var payload = {
        program: 'motalk',
        code: res.code
      };
      var param = {
        url: 'http://localhost:9871/api/auth/wxLogin/',
        data: payload,
        method: 'POST',
        complete: this.afterLogin.bind(this)
      };

      wx.request(param);
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  
  },

  afterLogin: function(resp) {
    console.log(resp);
    if (resp.errMsg === 'request:ok' && resp.statusCode === 200) {
      getApp().globalData.header = {
        Cookie: resp.header['Set-Cookie']
      },
      getApp().globalData.userInfo = resp.data;
      this.setData({
        isLogin: true,
        isAdmin: resp.data.roles.indexOf('admin') >= 0
      });
      wx.switchTab({
        url: '/pages/short/index',
      })
    }
  }
})