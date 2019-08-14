// 添加分类
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload()
        }
    })

    return false
})
// 渲染页面
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryListTpl', { data: response })

        $('#categoryBox').html(html)
    }
})
// 编辑页面
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            var html = template('modifyCategoryTpl', response)
            $('#formBox').html(html)
        }
    })
})
// 渲染修改后页面
$('#formBox').on('submit', '#modifyCategory', function () {
    var formData = $(this).serialize()

    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false
})
// 删除分类
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您确认要删除分类吗')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})