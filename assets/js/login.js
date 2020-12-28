$(function() {
    // 点击“去注册账号”的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    });

    // 点击“去登录”的链接
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    });
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('注册失败' + res.message);
                    return;
                }
                layer.msg(res.message);
                $('#link_login').click();
            },
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                    return;
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})