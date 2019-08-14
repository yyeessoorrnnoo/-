// 提交用户
$('#userForm').on('submit', function () {

    var formData = $(this).serialize()
    console.log(formData)

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    // 阻止表单默认行为
    return false
})
// 提交头像
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $('#preview').attr('src', data[0].avatar)
            $('#hiddenAvatar').val(data[0].avatar)
        }
    })
})
// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', { data: response })
        $('#userBox').html(html)
    }
})
// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response)
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html)
        }
    })
})
// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            // 修改用户信息成功 重新加载页面
            location.reload()
        }
    })
    return false
})
// 删除事件
$('#userBox').on('click', '.delete', function () {
    if (confirm('您真的要删除吗')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})
//全选全不选
var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.on('change', function () {
    var status = $(this).prop('checked')
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    $('#userBox').find('input').prop('checked', status)
})
$('#userBox').on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input')

    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})
// 点击删除全部
deleteMany.on('click',function(){
    var ids =[]

    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'))
    })

    if(confirm('您真的要批量删除操作吗')){
    $.ajax({
        type:'delete',
        url:'/users/'+ids.join('-'),
        success:function(){
            location.reload()
        }
    })
    }
})
