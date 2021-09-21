$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比(指定裁剪区域的形状，比如：aspectRatio: 16/9 是长方形)
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#shangchuang').on('click', function (e) {
        $('#file').click();
    })

    // 绑定上传文件的 change事件
    $('#file').on('change', function (e) {
        e.preventDefault();
        let fileslist = e.target.files;
        if (fileslist.length === 0) {
            return layer.msg('请选择照片！');
        }
        // 1、拿到用户上传的文件
        var file = e.target.files[0];
        // 2、将文件转化成路劲
        var imgUrl = URL.createObjectURL(file);
        // 3、重新初始化裁剪区域
        $image.cropper('destroy')// 销毁就的裁剪区域
            .attr('src', imgUrl)// 重新设置图片路径
            .cropper(options)// 重新初始化裁剪区域
    })

    // 给确定按钮绑定点击事件
    // $('#queding').on('click', function (e) {
    //     // 1. 要拿到用户裁剪之后的头像
    //     var dataURL = $image
    //         .cropper('getCroppedCanvas', {
    //             // 创建一个 Canvas 画布
    //             width: 100,
    //             height: 100
    //         })
    //         .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //     // 2. 调用接口，把头像上传到服务器
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/update/avatar',
    //         data: {
    //             avatar: dataURL
    //         },
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('更换头像失败！')
    //             }
    //             layer.msg('更换头像成功！')
    //             window.parent.getUserInfo();// 调用父元素的更新用户方法
    //         }
    //     })
    // })
    let user = localStorage.getItem('user');
    $('#queding').on('click', function (e) {
        var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
        if(localStorage.getItem(user)){
            let userinfo = JSON.parse(localStorage.getItem(user));
            userinfo.image = dataURL;
            localStorage.setItem(user,JSON.stringify(userinfo));
            layer.msg("修改成功");
            setTimeout(() => {
                window.parent.indexs()
            },1000);
            window.parent.getUserInfo();// 调用父元素的更新用户方法
        }else {
            let userinfo = JSON.parse(localStorage.getItem('info'));
            userinfo.image = dataURL;
            localStorage.setItem(user,JSON.stringify(userinfo));
            layer.msg("修改成功");
            setTimeout(() => {
                window.parent.indexs()
            },1000);
            window.parent.getUserInfo();// 调用父元素的更新用户方法
        }
    })
})