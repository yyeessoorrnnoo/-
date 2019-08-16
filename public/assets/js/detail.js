var postId = getUrlParams('id')
// 文章内容在详情页面展示功能
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function (response) {
        console.log(response)
        var html = template('postTpl', response)
        $('#article').html(html)
    }
})
// 点赞功能
$('#article').on('click','#like',function(){
    // 向服务器端发送请求  执行点赞功能
    $.ajax({
        type:'post',
        url:'/posts/fabulous/'+postId,
        success:function(){
            alert('点赞成功，感谢您的支持')
        }
    })
})

