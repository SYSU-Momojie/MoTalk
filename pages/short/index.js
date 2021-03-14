const api = require('../../behaviors/api.js')

Page({
  behaviors: [api],

  data: {
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      label: '全部',
      content: '',
      sentenceList: [],
      isRandom: true
  },

  onReady: function(event) {
    this.requestData();
  },

  onSearch: function(event) {
    console.log(event);
    var toSearch = event.detail;
    if (toSearch.label !== this.data.label || toSearch.content !== this.data.content) {
      this.setData({
        label: toSearch.label,
        content: toSearch.content
      });
      this.requestData();
    }
  },

  requestData: function() {
    var param = {
      pageNum: this.data.pageNum - 1,
      pageSize: this.data.pageSize,
      label: this.data.label,
      content: this.data.content,
      random: false
    };
    if (param.content === '') {
      param.random = true;
    }
    // console.log(param);
    this.setData({
      isRandom: param.random
    });
    this.post('sentence/getByPage', param, this.updateAfterRequest.bind(this));
  },

  updateAfterRequest: function(data) {
    // console.log(data);
    var maxPageNum = Math.ceil(data.total / this.data.pageSize);
    if (this.data.pageSize * maxPageNum < data.total) {
      maxPageNum += 1;
    }
    this.setData({
      totalPage: maxPageNum,
      sentenceList: data.list
    });
  },

  onPageChange: function(event) {
    var cur = this.data.pageNum;
    if (event.detail.type === 'prev') {
      cur -= 1;
    } else {
      cur += 1;
    }
    if (cur < 1) {
      cur = 1;
    }
    if (cur > this.data.totalPage) {
      cur = this.data.totalPage;
    }

    this.setData({
      pageNum: cur
    });
    this.requestData();
  }
})
