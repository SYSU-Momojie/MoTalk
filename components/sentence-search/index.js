// components/mq/share-search/index.js
const api = require('../../behaviors/api.js')
const strUtil = require('../../utils/string.js')

Component({
  behaviors: [api],
  /**
   * 组件的属性列表
   */
  properties: {
    labelChosen: {
      type: String,
      value: ''
    },
    labelOptions: {
      type: Array,
      value: [{text: '全部', value: ''}]
    },
    latest: {
      type: Array,
      value: []
    },
    inputValue: {
      type: String,
      value: ''
    },
    hintList: {
      type: Array,
      value: []
    }
  },

  lifetimes: {
    ready: function () {
      var data = wx.getStorageSync('allLabels');
      if (data) {
        var nChosen = '';
        for (var i in data) {
          if (data[i].text === '全部') {
            nChosen = data[i].value;
          }
        }
        this.setData({
          labelOptions: data,
          labelChosen: nChosen
        });
      }

      var latest = wx.getStorageSync('searchLatest');
      if (latest) {
        this.setData({
          latest
        });
      }

      this.post('sentence/getAllLabels', {}, this.updateAfterRequest.bind(this));
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function (event) {
      // console.log(event);
      this.setData({
        inputValue: event.detail
      })
      this.showHint(event.detail);
    },
    onClear: function(event) {
      this.setData({
        inputValue: ''
      })
    },
    showHint: function (str) {
      var toFind = [];
      if (str === null || str === undefined || str.length === 0) {
        toFind = this.data.latest;
      } else {
        toFind.push(str);
      }
      var nHintList = [];
      for (var i in toFind) {
        for (var j in this.data.latest) {
          if (strUtil.ignoreCaseContains(this.data.latest[j], toFind[i])) {
            nHintList.push(this.data.latest[j]);
            if (nHintList.length === 5) {
              break;
            }
          }
        }
        if (nHintList.length === 5) {
          break;
        }
      }
      this.setData({
        hintList: nHintList
      });
      console.log(this.data.hintList);
    },
    onBlur: function (event) {
      setTimeout(this.clearHint.bind(this), 100);
    },
    onFocus: function (event) {
      this.showHint(this.data.inputValue);
    },
    clearHint: function () {
      this.setData({ hintList: [] });
    },
    handleTap: function (event) {
      console.log(event);
      this.setData({
        inputValue: event.currentTarget.dataset.v
      });
      this.triggerSearch(this.data.inputValue);
      this.clearHint();
    },
    onSearch: function(event) {
      this.triggerSearch(event.detail);
    },
    triggerSearch: function(content) {
      var latest = this.data.latest;
      var index = latest.indexOf(content);
      if (index > -1) {
        latest.splice(index, 1);
      }
      latest.unshift(content);
      if (latest.length > 5) {
        latest.splice(5, 1);
      }
      this.setData({
        latest
      });
      wx.setStorage({
        key: 'searchLatest',
        data: latest,
      });
      this.triggerEvent('search', { label: this.labelChosen, content: content });
    },
    updateAfterRequest: function (list) {
      console.log(list);
      var nOpts = [];
      var targetValue = '';
      for (var i in list) {
        nOpts.push({
          text: list[i].label, 
          value: list[i].label
        });
        if (list[i].label === '全部') {
          targetValue = list[i].label;
        }
      }
      this.setData({
        labelOptions: nOpts,
        labelChosen: targetValue
      });
      wx.setStorage({
        key: 'allLabels',
        data: nOpts,
      });
      
    }
  }
})
