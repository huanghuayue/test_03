$(function(){
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;
    var user = localStorage.getItem('user');
    var atricleList = JSON.parse(localStorage.getItem(user+'Atricle'));
    // 创建一个时间过滤器
    template.defaults.imports.time = function(date){
        const dt = new Date(date);
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
    // 定义补0函数
    function padZero(n){
        return n > 9 ? n : '0' + n;
    }
    
    // 给页面渲染条数
    let pages = 0;
    let zongPage = 2;
    let zongtiaoshu = atricleList.length; // 总条数
    let yema = 1;
    let atricleLists = [];
    morenPage(atricleList,zongPage,zongtiaoshu);
    function morenPage(val,zong,zongtiaoshu){
        pages = 0
        zong = zong === 'undefined' ? 0 : zong;// 显示条数
        zongshu = 0
        atricleLists = []
        zongshu = zongtiaoshu;
        for(var i = 0; i < val.length; i++){
            if(pages !== zong){
                atricleLists.push(val[i]);
            }else{
                break;
            }
            pages++;
        }
        wenzhangList();
    }

    // 把获取过来的数据加载到模板渲染引擎
    function wenzhangList() {
        var htmlStr = template('tableList', atricleLists);
        $('tbody').html(htmlStr);
    }
    fenyePage(zongshu);
    // 获取所有分类
    var fenleiList = JSON.parse(localStorage.getItem(user+'List'));
    // 把获取过来的数据加载到模板渲染引擎
    fenleis();
    function fenleis() {
        var fenleiStr = template('fenlei', fenleiList);
        $('[name=cate_name]').html(fenleiStr);
        form.render();// 重新渲染layui模板js
    }
    // 搜索点击事件
    let newList = []
    $('#sousuo').on('click',function(e){
        e.preventDefault();
        let fl = $('[name=cate_name').val();
        let zt = $('[name=state').val();
        newList = [];
        atricleList.forEach(item =>{
            if(fl=='' && zt==''){
                newList.push(item);
            }else if(fl && zt){
                if(item.cate_name === fl && item.state === zt){
                    newList.push(item);
                }
            }else if(fl){
                if(item.cate_name === fl){
                    newList.push(item);
                }
            }else if(zt === '已发布'){
                if(item.state === '已发布'){
                    newList.push(item);
                }
            }else if(zt === '草稿'){
                if(item.state === '草稿'){
                    newList.push(item);
                }
            }else{
                newList = [];
            }
        });
        newsList();

        fenyePage(newList.length,newList);
    })
    // 搜索得到的结果重新渲染到页面
    function newsList() {
        if(newList.length === 0){
            $('tbody').hide();
            $('.zanwu').show();
            $('.zanwu').html(`抱歉！暂时搜索不到您想要寻找的结果！`);
            return
        }
        $('tbody').show();
        $('.zanwu').hide();
        zongtiaoshu = newList.length;
        morenPage(newList,zongPage,zongtiaoshu)
    }

    // 分页
    function fenyePage(value,isShow){
        laypage.render({// 调用分页的渲染结构
            elem:'fenyeBox',// 分页的容器id
            count:value,// 分页的总条数
            limit:zongPage,// 每页显示几条
            curr:yema,// 设置默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],// 这里时显示其他的一些功能
            limits:[2,5,10,20],
            // 分页发生切换时调用
            jump:function(obj,first){
                zongPage = obj.limit; // 切换条目数
                if(obj.curr === 1){
                    if(!first){// first解决死循环问题
                        if(isShow){
                            morenPage(isShow,zongPage,isShow.length)
                        }else{
                            atricleList = atricleList.slice(0)
                            morenPage(atricleList,zongPage,atricleList.length)
                        }
                    }
                }else{
                    if(!isShow){
                        var aa = 0;
                        var bb = 0;
                        for(var j = 0; j < obj.curr; j++){
                            aa ++;
                            if(aa == obj.curr){
                                break;
                            }else{
                                bb = aa * zongPage;
                            }
                        }
                        var cc = atricleList.slice(bb);
                        zongtiaoshu = atricleList.length;
                        yema = obj.curr;
                        morenPage(cc,zongPage,zongtiaoshu);
                    }else{
                        var aa = 0;
                        var bb = 0;
                        for(var j = 0; j < obj.curr; j++){
                            aa ++;
                            if(aa == obj.curr){
                                break;
                            }else{
                                bb = aa * zongPage;
                            }
                        }
                        var cc = isShow.slice(bb);
                        zongtiaoshu = isShow.length;
                        yema = obj.curr;
                        morenPage(cc,zongPage,zongtiaoshu);
                    }
                }
            }
        });
    }

    // 给编辑按钮绑定点击事件
    var bianjiBtn = null;
    var id = null;
    $('tbody').on('click','.bianji',function(){
        // 为编辑按钮绑定点击事件
        bianjiBtn = layer.open({
            type:1,
            title: '编辑文章分类',
            content: $('#bianji').html(),
            area:['500px','250px']
        });   
        id = parseInt($(this).attr('data-id'));
        console.log(id)
    })

    // 为删除绑定事件
    var ledId = null;
    $('tbody').on('click','.shanchu',function(e){        
        ledId = parseInt($(this).attr('data-eld'));
        // 提示用户是否删除
        layer.confirm('确定要删除么?', {icon: 3, title:'提示'}, function(index){
            atricleList.forEach(item =>{
                if(item.id === ledId){
                    atricleList.splice(jQuery.inArray(item,atricleList),1);
                }
            })
            localStorage.setItem(user+'Atricle',JSON.stringify(atricleList));
            morenPage(atricleList,zongPage,zongtiaoshu);
            fenyePage(JSON.parse(localStorage.getItem(user+'Atricle')).length);
            layer.close(index);
        });
    })
})