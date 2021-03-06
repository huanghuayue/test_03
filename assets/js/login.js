$(function(){
  var dataList =[
    {id:1,name:'最新',alias:'zuixin',is_delete:0},
    {id:2,name:'科技',alias:'keji',is_delete:0},
    {id:3,name:'股市',alias:'gushi',is_delete:0},
    {id:4,name:'历史',alias:'lishi',is_delete:0},
    {id:5,name:'情感',alias:'qinggan',is_delete:0},
  ]
  var dataAtricle = [
    {id:1,title:'测试文章',pub_date:'2021-9-20 15:3:12',state:'已发布',cate_name:'最新',cover_img:'/assets/images/sample2.jpg',content:'<p>我是内容哦</p>'},
    {id:2,title:'科技新闻',pub_date:'2021-09-20 15:57:12',state:'已发布',cate_name:'科技',cover_img:'/assets/images/sample2.jpg',content:'<p>我是内容哦</p>'},
    {id:3,title:'股市新闻',pub_date:'2021-09-20 15:57:12',state:'已发布',cate_name:'股市',cover_img:'/assets/images/sample2.jpg',content:'<p>我是内容哦</p>'},
    {id:4,title:'历史新闻',pub_date:'2021-09-20 15:57:12',state:'已发布',cate_name:'历史',cover_img:'/assets/images/sample2.jpg',content:'<p>我是内容哦</p>'},
    {id:5,title:'情感新闻',pub_date:'2021-09-20 15:57:12',state:'已发布',cate_name:'情感',cover_img:'/assets/images/sample2.jpg',content:'<p>我是内容哦</p>'},
  ]
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
    pwdlist:[/^[0-9a-zA-Z]{3,12}$/,'只能输入3-12位英文字符'],
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
    let re = /^[0-9a-zA-Z]{3,12}$/;
    e.preventDefault();
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let infolist = [];
    let isShow = true;
    let username = $('#from_reg [name=username]').val();
    let password = $('#from_reg [name=password]').val();
    let repassword = $('#from_reg [name=repassword]').val();
    if(!re.test(username)){
      return
    }
    if(password !== repassword){
      return
    }
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
    let items = null;
    if(userinfo){
      userinfo.forEach(item =>{
        if(item.username == username){
          items = item
          return
        }
      })
      setTimeout(() => {
        if(!items){
          return layer.msg('用户不存在');
        }
        if(items.password != password){
          return layer.msg('用户名或者密码错误');
        }
        if(items.username == username && items.password == password){
          localStorage.setItem('token','tokeninfo');
          localStorage.setItem('user',$('#form_login [name=username]').val())
          if(!localStorage.getItem(username)){
            localStorage.setItem('info',JSON.stringify({
              username:username,
              nickname:username,
              image:'',
              email:username+'@qq.com'
            }))
          }
          // 文章类别
          if(!localStorage.getItem($('#form_login [name=username]').val()+'List')){
            localStorage.setItem($('#form_login [name=username]').val()+'List',JSON.stringify(dataList))
          }
          // 文章列表
          if(!localStorage.getItem($('#form_login [name=username]').val()+'Atricle')){
            localStorage.setItem($('#form_login [name=username]').val()+'Atricle',JSON.stringify(dataAtricle))
          }

          location.href = '/index.html';
          return layer.msg('登录成功');
        }
      }, 300);
    }else{
      return layer.msg('用户不存在');
    }
  })

})