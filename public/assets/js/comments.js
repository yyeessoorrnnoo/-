// 后台接口没有出来之前  伪代码
$.ajax({
url:'/comments',
type:'get',
success:function(response){
var html =template('commentTpl',{data:response})
$('#parent').html(html)
}
})