// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit',function(){
    var formData =$(this).serialize()
    $.ajax({
        url:'/users/password',
        type:'put',
        data:formData,
        success:function(){
            location.href ="/admin/login.html"
        }
    })
    return false
})