$(function(){
    let password = JSON.parse(localStorage.getItem('userinfo'));
    let username = JSON.parse(localStorage.getItem('info'));
    let user = localStorage.getItem('user');
    let users = JSON.parse(localStorage.getItem(user))
    let userinfo = null;
    let jiumima = '';
    let form = layui.form;
    let layer = layui.layer;

    password.forEach(item =>{
        if(!users){
            if(username.username == item.username){
                userinfo = item;
                jiumima = item.password;
            }
        }else{
            if(users.username == item.username){
                userinfo = item;
                jiumima = item.password;
            }
        }
    })
    // 验证规则
    form.verify({
        username:function(value){
            if(jiumima !== value){
                return "旧密码不正确"
            }
        },
        nickname:function(value){
            if(value.length < 6){
                return '密码必须是6个字符以上'
            }
        },
        password:function(value){
            if($('.layui-form [name=nickname]').val() !== value){
                return "两次密码不一致"
            }
        }
    })
    // 提交修改信息
    $('#tijiaos').on('click',function(e){
        e.preventDefault();
        if(jiumima !== $('.layui-form [name=username]').val()){
            return
        }
        if($('.layui-form [name=nickname]').val().length < 6){
            return
        }
        if($('.layui-form [name=nickname]').val() !== $('.layui-form [name=repassword]').val()){
            return
        }
        password.forEach(item =>{
            if(!users){
                if(username.username == item.username){
                    item.password = $('.layui-form [name=nickname]').val()
                }
            }else{
                if(users.username == item.username){
                    item.password = $('.layui-form [name=nickname]').val()
                }
            }
        })
        layer.msg("修改成功");
        setTimeout(() => {
            localStorage.setItem('userinfo',JSON.stringify(password));
            localStorage.removeItem('info')
            localStorage.removeItem('token')
            window.parent.tiaoz();
        }, 1000);
        
    })
})