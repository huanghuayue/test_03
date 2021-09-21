$(function () {
    var form = layui.form;
    // 获取所有分类
    var user = localStorage.getItem('user');
    var fenleiList = JSON.parse(localStorage.getItem(user+'List'));
    fenleis();
    function fenleis() {
        var fenleiStr = template('fenlei', fenleiList);
        $('[name=cate_name]').html(fenleiStr);
        form.render();// 重新渲染layui模板js
    }

    // 获取所有文章
    var atricleList = JSON.parse(localStorage.getItem(user+'Atricle'));

    // 调用富文本编译器
    initEditor();

    // 头像裁剪
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
    
    // 发布文章
    var state = '已发布';
    var title = '文章标题';
    var content = '内容';
    var cover_img = '封面图片';
    var id = 'id';
    var pub_date = '时间';
    var cate_name = '分类'

    // 确定上传图片
    function tijiaoImg(e) {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png')
        cover_img = dataURL;
    }

    // 定义补0函数
    function padZero(n){
        return n > 9 ? n : '0' + n;
    }

    // 创建一个时间过滤器
    function tiem (){
        const dt = new Date();
        // 年月日
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth()+1);
        var d = padZero(dt.getDate());
        // 时分秒
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss ;
    }

    // 发布
    $('#fabu').on('click',function (e){
        e.preventDefault();
        // 获取图片的64格式
        tijiaoImg();
        atricleList.push({
            id: atricleList[atricleList.length-1].id + 1,
            title: $('[name=wenzhangtitle]').val(),
            pub_date: tiem(),
            state: '已发布',
            cate_name: $('[name=cate_name]').val(),
            cover_img: cover_img,
            content: tinymce.activeEditor.getContent(),// 获取富文本的内容
        })
        localStorage.setItem(user+'Atricle',JSON.stringify(atricleList));
        layer.msg("添加成功");
        setTimeout(() => {
            window.parent.indexs()
        },1000);
    })
    // 存草稿
    $('#caogao').on('click',function (e){
        e.preventDefault();
        tijiaoImg();
        atricleList.push({
            id: atricleList[atricleList.length-1].id + 1,
            title: $('[name=wenzhangtitle]').val(),
            pub_date: tiem(),
            state: '草稿',
            cate_name: $('[name=cate_name]').val(),
            cover_img: cover_img,
            content: tinymce.activeEditor.getContent(),// 获取富文本的内容
        })
        localStorage.setItem(user+'Atricle',JSON.stringify(atricleList));
        layer.msg("添加成功");
        setTimeout(() => {
            window.parent.indexs()
        },1000);
    })
})