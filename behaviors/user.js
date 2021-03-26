
module.exports = Behavior({
  methods: {
    
    isAdmin: function() {
      var gd = getApp().globalData;
      if (gd.userInfo === null) {
        return false;
      }

      return gd.userInfo.roles.indexOf('admin') >= 0;
    }
  }
})