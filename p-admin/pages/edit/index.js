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
    id: '',
    like: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    if (options.id === null) {
      this.resetData();
      return ;
    }
    this.post('sentence/getSentenceById', options.id, this.updateAfterGet.bind(this));
  },

  resetData: function() {
    this.setData({
      labels: [],
      content: '',
      id: '',
      like: 0
    });
  },

  updateAfterGet: function(data) {
    // console.log(data);
    this.setData({
      id: data.id,
      content: data.content,
      labels: data.labels,
      like: data.like
    });
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
      labels: this.data.labels,
      like: this.data.like
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
    this.post('sentence/deleteSentence', this.data.id, this.afterDelete.bind(this))
  },

  afterDelete: function(resp) {
    // console.log(resp);
    this.setData({
      id: ''
    });
  }
})