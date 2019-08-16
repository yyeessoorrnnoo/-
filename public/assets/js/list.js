var categoryId = getUrlParams('categoryId')

$.ajax({
    type:'get',
    url:'/posts/category/'+categoryId,
    success:function(response){
var html = template('listTpl',{data:response})
$('#listBox').html(html)
    }
})

// 根据分类id获取分类信息
$.ajax({
	type: 'get',
	url: '/categories/'+ categoryId,
	success: function (response) {
		$('#categoryTitle').html(response.title)
	}
})