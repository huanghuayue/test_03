$(function(){
  // 点击去注册
  $('#link_reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击登录
  $('#link_login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();
  })
  // 校验表单
  // 从layui中获取form对象
  let form = layui.form;
  // 从layui中获取弹出框对象
  let layer = layui.layer;
  // 通过from.verify()函数自定义校验规矩
  form.verify({
    // 自定义一个叫pwd的校验规则
    // 数组的方式检验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6-12位，且不能为空'],
    // 校验两次密码是否一致
    // 方法的方式检验规则
    repwd: function(value){
      // value拿到的是确认密码的内容
      // 获取密码的内容
      let pwd = $('.reg-box [name=password]').val()
      if(pwd !== value){
        return '两次密码不一致'
      }
    }
  })
  // 监听注册表单提交事件

  // $('#from_reg').on('submit',function(e){
  //   e.preventDefault();//阻止默认行为
  //   $.post('http://ajax.frontend.itheima.net/api/reguser',
  //   {
  //     username:$('#from_reg [name=username]').val(),
  //     password:$('#from_reg [name=password]').val()
  //   },function(res){
  //     if(res.status !== 0){
  //       // 注册失败，错误提示
  //       return layer.msg(res.message);
  //     }
  //     layer.msg('注册成功');
  //     // 注册成功之后跳转会登录页面
  //     $('#link_login').click()
  //   })
  // })

  // 监听登录事件

  // $('#form_login').submit(function(e){
  //   e.preventDefault();//阻止默认行为
  //   $.ajax({
  //     url:'http://ajax.frontend.itheima.net/api/login',
  //     method:'POST',
  //     // 快速获取表单中的数据
  //     data:$(this).serialize(),
  //     success:function(res){
  //       if(res.status !== 0){
  //         // 登录失败，错误提示
  //         return layer.msg(res.message);
  //       }
  //       layer.msg('注册成功');
  //       console.log(res.token);
  //       localStorage.setItem('token',res.token);
  //       // 登录成功之后跳转到首页
  //       location.href = '/index.html';
  //     }
  //   })
  // })

  // 本地注册和登录
  
  $('#zhuce').on('click',function(e){
    e.preventDefault();
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let infolist = [];
    let isShow = true;
    let username = $('#from_reg [name=username]').val();
    let password = $('#from_reg [name=password]').val();
    if(userinfo){
      infolist = userinfo;
      userinfo.forEach(item =>{
        if(item.username == username){
          isShow = false;
          return layer.msg("用户名已存在");
        }
      })
    }
    if(isShow && username !== '' && password !== ''){
      infolist.push({username:username,password:password})
      localStorage.setItem('userinfo',JSON.stringify(infolist));
      layer.msg("注册成功");
      // 跳转到登录界面
      $('#link_login').click();
    }
  })

  $('#denglu').on('click',function(e){
    e.preventDefault();
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let username = $('#form_login [name=username]').val();
    let password = $('#form_login [name=password]').val();
    if(userinfo){
      userinfo.forEach(item =>{
        if(item.username != username){
          return layer.msg('用户不存在');
        }else if(item.password != password){
          return layer.msg('用户名或者密码错误');
        }else if(item.username == username && item.password == password){
          localStorage.setItem('token','tokeninfo');
          location.href = '/index.html';
          return layer.msg('登录成功');
        }
      })
    }else{
      return layer.msg('用户不存在');
    }
  })

})