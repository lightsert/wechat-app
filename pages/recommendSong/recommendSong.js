// pages/recommendSong/recommendSong.js
import request from '../../utils/request'
import PubSub from 'pubsub-js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'', //天
    month:'',  //月
    recommendList:[], //每日推荐数据
    index:0 //
  },


  async recommendListdata(){
    let recommendList = await request('/recommend/songs')
    console.log(recommendList.recommend);
    this.setData({
      recommendList:recommendList.recommend
    })

  },

  //  跳转至songDetail页面
  toSongDetail(event){
    let {song,index} = event.currentTarget.dataset
    this.setData({
      index
    })
    //  路由跳转传参，query参数
    wx.navigateTo({
      //  不能直接传song，song的长度过长
      url:'/pages/songDetail/songDetail?musicId=' + song.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.showToast({
        title:'请先登录',
        icon:'none',
        success:()=>{
          //  跳转到登录页面
          wx.reLaunch({
            url:'/pages/login/login'
          })
        }
      })
    }
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth() + 1
    })

    // 获取数据
    this.recommendListdata()

    //  订阅来自songDetail页面发布的消息
    PubSub.subscribe('switchType',(msg,data)=>{
      let {recommendList,index} = this.data
      if(data === 'pre'){ //  上一首
        (index === 0) && (index = recommendList.length)
        index -= 1;
      }else{  //  下一首
        (index === recommendList.length - 1)&& (index = -1)
        index += 1
      }
      //  更新下标
      this.setData({
        index
      })


      let musicId = recommendList[index].id;
      //  将musicId回传给songDetail页面
      PubSub.publish('musicId',musicId)
    })


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

  }
})