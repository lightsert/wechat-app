//  发送ajax请求

/*
    封装功能函数
        1.功能点明确
        2.函数内部应该保留固定代码（静态的）
        3.将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
        4.一个良好的功能函数应该设置形参的默认值

    2.封装功能组件
        1。功能点明确
        2.组件内部保留静态的代码
        3.将动态的数据抽取成props参数，由使用者根据自身的情况以标签属性的形式动态传入props数据
        4.一个良好的组件应该设置组件的必要性及数据类型
            props：{
                msg：{
                    require：true，
                    deault：默认值。
                    type：String
                }
            }
*/
import config from "./config";


export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.hosts + url,
            data,
            method,
            header:{
                cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies'):''
            },
            success: (res) => {
                console.log(data);
              let cookies = { cookie:`_ntes_nuid=fa26c3211688246d59adaf5b34e95e58; NMTID=00OXCLXttUQ66fXz01tk3sLbcPCUeAAAAGBHz1YxQ; WEVNSM=1.0.0; WNMCID=krvgoa.1654086523858.01.0; WM_TID=9DSjXO2JFmlEFQFRUAfERgP6X7c272Cu; _ga=GA1.1.475053550.1669907376; _clck=1d9a7cs|1|f71|0; Qs_lvt_382223=1669907376%2C1669907394; Qs_pv_382223=3335056547766010000%2C1175767255445515300; _ga_C6TGHFPQ1H=GS1.1.1669907376.1.1.1669908759.0.0.0; NTES_P_UTID=wGwxTGOH1qqYPs5sdtu81Kbhfecj5Eee|1672310004; P_INFO=lightsert@163.com|1672310004|0|mail163|00&99|null&null&null#CN&null#10#0#0|&0||lightsert@163.com; nts_mail_user=lightsert@163.com:-1:1; _ntes_nnid=fa26c3211688246d59adaf5b34e95e58,1677574293235; __snaker__id=nw9985hTF2EBuiw8; YD00000558929251%3AWM_TID=wXbAXfxK0iNFBFRRUEeAaIdqXtEyVMHB; from=bdjjnim0055; hb_MA-9F44-2FC2BD04228F_source=yunxin.163.com; ntes_kaola_ad=1; YD00000558929251%3AWM_NI=om0fA%2B89w%2BYqgwsVJV72qG%2BjvpIhgnI1f2w%2BsfPtUDpT5k0IT5cMt5Ml46bkO6JWjyBtelFAiRVxm31IuCM5QFi3qIUtryqvyn8FHtqi%2Bdb0y7wcEanRNBbRb1saUz0RZHk%3D; YD00000558929251%3AWM_NIKE=9ca17ae2e6ffcda170e2e6eea8eb729593be87d945a8868fb7d14b828e8b87c848a894b8a2ce798aed8f8fe62af0fea7c3b92aadb30087c421fce7b9ccdc7ba5a9bdb7c95ef5eebfa8aa62b6b08789e6668befaad3f621b1baa095d850b48cfb8cb34398ebadaef73f8fb4fcd7e1618dea86b8e97382acab8dc54bab8e9a99f039f397bba4d03f939aa7d4f44397acbe9af47ebbb2f8a7cb80b3b7e585e13cbbe9b984c86bae8e82a3e15aa2efbd82d872f48e96a9ea37e2a3; __csrf=d983d8c40e447a66c006217a158d16ca; MUSIC_U=25d7d2b21670424303528bf6484634f79b4d001e999384087dd3434dba1d5f7e993166e004087dd3e30ca2c4cea3da9ef7ed3859a47b4da7502c458952f207a2534af25e5ced26abd4dbf082a8813684; __remember_me=true; gdxidpyhxdE=aO5CuIcYwrrRbPMO1%2Bs2PLzS%5CNJGLPlYvoTrLzl3NgIwOTv4Wbi4dTd1UviXMPVldLtyZw8uEHBGzfrouwLLKEt%5CBUhorDgLIS0%2BA%2FgjWzMfaIykg4CGkjtEoWRwjWrQGXMDLv1z5awms7E7ilRJCw%2BpnejHHtOM1%2FEhD9D%5CYSwjbh2f%3A1677658066967; playerid=36050653; WM_NI=%2FaQYNm7VyQKJS0UdeXwyap2w2lsPuWPYvO0TYHTw2RxtL8rWVvXFypZ5ALLRbTrmEfnQ5wFW1NiGwklhsG6e9pDal9h1D%2BNqwTReJGlfPkgcUsdOc63nkqreNnQSjvLwVUY%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6ee93f56fa29eaea4cc7da7a88bb7d44e928b8a86c4488eb6fb90ee6af6b2bf9bf12af0fea7c3b92aedbf9fbacd67f58ab7b2ca4291f09b85e854b5a7af91b17df2b4bdb1f85d9487bab0b3609b989c98b15abcac84d9f15d96aa98a7fc7c9aeb8fadcf5aa28cbe8ec86eae8ffb98c55df392a7a8f661b0b8bda8b56ffbb08c82ef33acef8ccccd7bb58c9e86c94db0baa08ce66997adacb0e23ef1b2a592f16f8eb29fb4e97e90a99ab6dc37e2a3; JSESSIONID-WYYY=QCXO5GAPy4afriU%5C8%2BcnGN9UPkTxXDeXleFq4lIy22gxjxr%5Cbj8VRnp6v%5Cr2cxwvvMzz5EwQWETSMK%2Fpxv%5CDQm5hpBfxhfUa4UnT5krcWF3SGEVGxRf%2BBP%2BiZHDeNG0gPIFhwHpr6kJASVXPGhqYr7WrQEWdCg8mfUc5PyISwff3M3Ia%3A1678025796276; _iuqxldmzr_=33`}
                if (data.isLogin) {
                    wx.setStorage({
                        key:'cookies',
                        data: cookies.cookie
                    })
                }
                // console.log('请求成功',res);
                resolve(res.data);
            },
            fail: (err) => {
                console.log('请求失败', err);
                reject(err);
            }
        })
    })
}