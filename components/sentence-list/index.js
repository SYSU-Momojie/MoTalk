// components/sentence-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    isRandom: {
      type: Boolean,
      value: true
    },
    showSpin: {
      type: Boolean,
      value: false
    },
    pageNum: {
      type: Number,
      value: 0
    },
    pageSize: {
      type: Number,
      value: 10
    },
    maxPage: {
      type: Number,
      value: 0
    },
    showPage: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPageChange: function(event) {
      this.triggerEvent("pageChange", event.detail);
    }
  }
})
