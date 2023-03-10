// pages/personal/personal.js
let startY = 0; //  手指起始的坐标 
let moveY = 0;  //  手指移动的坐标
let moveDistance = 0; //  手指移动距离

import requests from '../../utils/requests'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coveTransition:'',
    userInfo:{},
    cecentPlayList:[] //用户播放记录
  },

  handleTouchStart(event){
    startY = event.touches[0].clientY;
    this.setData({
      coveTransition:''
    })
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance <=0){
      return;
    }
    if(moveDistance >= 80){
      moveDistance = 80
    }
    //   动态更新coverTransform的状态值
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform:`translateY(0rpx)`,
      coveTransition:'transform 1s linear'
    })
  },

  //  获取用户播放记录的函数
  async getUserRecentPlayList(userId){
    let recentPlayListData = await requests('/user/record',{uid:userId,type:0})
    let index = 0;
    let cecentPlayList = recentPlayListData.allData.splice(0,10).map(item =>{
      item.id = index++;
      return item
    })

    this.setData({
      cecentPlayList
    })
    // console.log(this.data.cecentPlayList);
  },


  toLogin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },


  /**ev
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo');
    // console.log(userInfo);
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
      //  获取用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)

    }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {
   
  //  console.log(this.data.userInfo);
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