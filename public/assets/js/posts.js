$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        var html = template('postsTpl', response)
        $('#postsBox').html(html)
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
})
// 时间格式
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}
// 分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })

}
// 筛选功能
$.ajax({
    type: "get",
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl', { data: response })
        $('#categoryBox').html(html)
    }
})
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })
    return false
})
// 删除功能
$('#postsBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作吗')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})