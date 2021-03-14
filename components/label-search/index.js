// components/mq/share-search/index.js
const api = require('../../behaviors/api.js')
const strUtil = require('../../utils/string.js')

Component({
  behaviors: [api],
  /**
   * 组件的属性列表
   */
  properties: {
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
      var latest = wx.getStorageSync('labelChosenLatest');
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
      var allLabel = wx.getStorageSync('allLabels');
      for (var i in toFind) {
        for (var j in allLabel) {
          if (strUtil.ignoreCaseContains(allLabel[j].label, toFind[i])) {
            nHintList.push(allLabel[j].label);
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
      // console.log(event);
      this.setData({
        inputValue: ''
      });
      this.triggerChosen(event.currentTarget.dataset.v);
      this.clearHint();
    },
    triggerChosen: function(content) {
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
        key: 'labelChosenLatest',
        data: latest,
      });
      this.triggerEvent('chosen', content);
    },
    updateAfterRequest: function (list) {
      wx.setStorage({
        key: 'allLabels',
        data: list,
      });
    }
  }
})
