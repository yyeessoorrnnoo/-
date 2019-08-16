// 当管理员选择文件的时候
$('#file').on('change', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('image', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image)
        }
    })
})
// 当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false
})
// 渲染轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        var html = template('slidesTpl', { data: response })
        $('#slidesBox').html(html)
    }
})
// 删除轮播图功能
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您真的要删除吗')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload()
            }

        })
    }
})