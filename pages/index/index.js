// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerdata:[],
    recommendList:[],
    toList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log("123");
    let bannerdata = await request('/banner',{type:2})
    // console.log(bannerdata);
    this.setData({
      bannerdata:bannerdata.banners
    })

    //  获取歌单数据
    let recommendListData =await request('/personalized',{limit:10})
    console.log(recommendListData);
    this.setData({
      recommendList:recommendListData.result
    })

    //  获取排行榜数据
    let index = 0;
    let resultArr = [];
    while(index < 5){
      let topListData = await request('/top/list',{idx:index++})
      //  splice(会修改原数组) slice(不会修改原数组)
      let topListItem = {
        name:topListData.playlist.name,
        tracks:topListData.playlist.tracks.slice(0,3)
      }
      // console.log(topListItem);
      resultArr.push(topListItem)
      // console.log(topListItem);
      this.setData({
        toList:resultArr
      })
    }
    // console.log(resultArr);
    //  更新topList的状态值，放在此处更新会导致发生请求的过程中页面长时间白屏，用户体验差
  },

  //  跳转
  toRecommendSong(){
    wx.navigateTo({
      url:'/pages/recommendSong/recommendSong'
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