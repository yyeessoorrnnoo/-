// 渲染所属分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl', { data: response })
        $('#category').html(html)
    }
})
// 上传文件
$('#feature').on('change', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('cover', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data)
            $('#thumbnail').val(data[0].cover)
        }
    })
})
// 文章上传
$('#addForm').on('submit', function () {
    // 获取表单值
    var formData = $(this).serialize()
    // 发送ajax请求，获取数据 跳转页面
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }

    })
    return false
})

var id = getUrlParams('id')
// 修改编辑文章操作
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories
                    var html = template('modifyTpl', response)
                    $('#parentBox').html(html)
                }
            })
        }
    })
}
// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}
// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })
    return false
})