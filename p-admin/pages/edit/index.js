// p-admin/pages/edit/index.js

const api = require('../../../behaviors/api.js')

Page({
  behaviors: [api],

  /**
   * 页面的初始数据
   */
  data: {
    labels: [],
    content: '',
    id: ''
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

  onLabelChosen: function(event) {
    var chosen = event.detail;
    // console.log(chosen);
    if (this.data.labels.indexOf(chosen) < 0) {
      var newArr = this.data.labels;
      newArr.push(chosen);
      this.setData({
        labels: newArr
      });
    }
  },

  deleteLabel: function(event) {
    var chosen = event.currentTarget.dataset.v;
    console.log(chosen);
    var newArr = this.data.labels;
    var index = newArr.indexOf(chosen);
    if (index > -1) {
      newArr.splice(index, 1);
    }
    this.setData({
      labels: newArr
    });
  },

  saveSentence: function() {
    var targetUrl = 'sentence/addSentence'
    if (this.data.id !== '') {
      targetUrl = 'sentence/editSentence'
    }

    var param = {
      id: this.data.id,
      content: this.data.content,
      labels: this.data.labels
    };

    this.post(targetUrl, param, this.afterSave.bind(this))
  },

  afterSave: function(resp) {
    // console.log(resp);
    this.setData({
      id: resp.data
    });
  },

  deleteSentence: function() {
    this.post('sentence/deleteSentence', {id: this.data.id}, this.afterDelete.bind(this))
  },

  afterDelete: function(resp) {
    // console.log(resp);
    this.setData({
      id: ''
    });
  }
})