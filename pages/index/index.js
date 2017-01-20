//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    headerItems:[
      {id:0, title:'头条' , identy:'top'},
      {id:1, title:'社会' , identy:'shehui'},
      {id:2, title:'国内' , identy:'guonei'},
      {id:3, title:'国际' , identy:'guoji'},
      {id:4, title:'娱乐' , identy:'yule'},
      {id:5, title:'体育' , identy:'tiyu'},
      {id:6, title:'军事' , identy:'junshi'},
      {id:7, title:'科技' , identy:'keji'},
      {id:8, title:'财经' , identy:'caijing'},
      {id:9, title:'时尚' , identy:'shishang'}
    ],
    itemIdenty:'top',
    dataArr:[],
    postionId:0
  },
  onLoad:function(){
    this.requestHttp('top');
     wx.setNavigationBarTitle({
      title: '今日头条-头条'
    })
  },

  clickHeaderItem:function(e){
    var item = e.currentTarget.dataset['item'];
    if(item.identy==this.itemIdenty){
      return;
    }
    wx.setNavigationBarTitle({
      title: '今日头条-'+item.title
    })
    this.setData({
      itemIdenty:item.identy,
      postionId:item.id
    })
    this.requestHttp(item.identy);
  },

  requestHttp:function(newType){
    var url = app.globalData.baseUrl + newType;
    var that = this;
    console.log(url);
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        wx.hideNavigationBarLoading();
        that.globalData.tempArrs = [];//清空数组
        const dataArrs = res.data.result.data;
        for(var i=0;i<dataArrs.length;i++){
          var obj = dataArrs[i];
          obj.imageArr = that.getImageCount(obj);
          that.globalData.tempArrs.push(obj);
        }
        that.setData({
          dataArr: that.globalData.tempArrs
        })
      }
    })
  },
  
  getImageCount:function(obj){
     if ("thumbnail_pic_s03" in obj) {
        return [obj.thumbnail_pic_s,obj.thumbnail_pic_s02,obj.thumbnail_pic_s03];  
      }
      if ("thumbnail_pic_s02" in obj) {
          return [obj.thumbnail_pic_s,obj.thumbnail_pic_s02];
      }
      if ("thumbnail_pic_s" in obj){
         return [obj.thumbnail_pic_s];
      }
  }
  ,
   globalData: {
    tempArrs: []
  }
})