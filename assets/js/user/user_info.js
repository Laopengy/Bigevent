const { form } = layui;
$(function() {
    form.verify({
        nickname: function(value) {
            if (value.length > 10) {
                return '昵称必须小于六位';
            }
        }
    })
})
initUserInfo()

initUserInfo()

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            console.log(res)
            form.val('formUserInfo', res.data)
        }
    })
}
// 重置表单的数据
$('#btnReset').on('click', function(e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
})
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return;
            }
            layer.msg('更新用户信息成功')
            window.parent.getUserInfo();
        }
    })
})