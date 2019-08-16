
  $('#logout').on('click',function(){
    var isComfirm =confirm('确定要退出吗')
    if(isComfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
          location.href='login.html'
        },
        error:function(){
          alert('退出失败')
        }
      })
    }

  })

  $.ajax({
    type:'get',
    url:'/users/'+userId,
    success:function(response){
      $('.avatar').attr("src",response.avtar)
      $('.profile .name').html(response.nickName)
    }
  })
 