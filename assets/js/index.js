$(function(){
    $('.tuichu').on('click',function(e){
        e.stopPropagation();
        localStorage.removeItem('token');
        localStorage.removeItem('info');
        location.href = "/login.html";
    })
    getUserInfo();
})
// 获取用户信息
function getUserInfo(){
    let user = localStorage.getItem('user');
    if(localStorage.getItem('token')){
        let userinfo = localStorage.getItem(user)?JSON.parse(localStorage.getItem(user)):JSON.parse(localStorage.getItem('info'))
        let textinfo = userinfo.nickname[0].toUpperCase();
        $('.text-avatar').html(textinfo)
        if(userinfo.image){
            console.log("???")
            $('.layui-nav-img').show();
            $('.text-avatar').hide();
            $('.layui-nav-img').attr('src',userinfo.image)
            $('.welcome').html(userinfo.nickname)
            
        }else{
            $('.welcome').html(userinfo.nickname)
            $('.layui-footer').html(userinfo.nickname+'个人网站后台管理系统')
        }
    }else{
        location.href = "/login.html";
    }
}
function tiaoz(){
    location.href = '/login.html'
}
function indexs(){
    location.href = '/index.html'
}