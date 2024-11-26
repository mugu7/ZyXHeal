document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const logImg = document.querySelector('.logImg');
    const feedbackForm = document.getElementById('feedback-form');

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

    // 提交反馈表单
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // 获取表单数据
        const formData = new FormData(feedbackForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 发送数据到后端
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert('感谢您的反馈！');
            // 处理后端返回的结果
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('提交失败，请重试');
        });
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
