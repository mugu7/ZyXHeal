document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // 打开模态框
    openModalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'block';
    });
    
    // 图标点击打开模态框
    logImg.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'block';
    });

    // 关闭模态框
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


    // 点击模态框外部关闭模态框
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 提交表单
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 这里可以添加发送数据到后端的代码
        console.log(`Username: ${username}, Password: ${password}`);

        // 关闭模态框
        modal.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 返回上一级按钮的点击事件
    document.querySelector('.icon-back-to-prev').addEventListener('click', () => {
        history.back();
    });

    // 返回下一级按钮的点击事件
    document.querySelector('.icon-forward-to-next').addEventListener('click', () => {
        history.forward();
    });
});

