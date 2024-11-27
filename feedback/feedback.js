document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const logImg = document.querySelector('.logImg');
    const feedbackForm = document.getElementById('feedback-form');


    // 提交反馈表单
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // 获取表单数据
        const formData = new FormData(feedbackForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 显示加载中的提示信息
        const loadingModal = document.createElement('div');
        loadingModal.className = 'loading-modal';
        loadingModal.innerHTML = `
            <div class="loading-modal-content">
                <p>正在提交...</p>
            </div>
        `;
        document.body.appendChild(loadingModal);
        loadingModal.style.display = 'block';

        // 延时时间（单位：毫秒）
        const submitDelayTime = 500; // 你可以根据需要修改这个值

        // 延时后显示提交成功的模态框
        setTimeout(() => {
            // 控制台打印用户提交的反馈
            console.log('用户提交的反馈:', data);

            // 移除加载中的提示信息
            loadingModal.remove();

            // 显示提交成功的模态框
            const successModal = document.createElement('div');
            successModal.className = 'success-modal';
            successModal.innerHTML = `
                <div class="success-modal-content">
                    <span class="close" id="close-success-modal">&times;</span>
                    <div class="container_content">
                        <img src="../image/提交成功.png" alt="提交成功" class="success-icon">
                        <p>提交成功，感谢您的反馈！</p>
                    </div>
                </div>
            `;
            document.body.appendChild(successModal);
            successModal.style.display = 'block';

            // 关闭提交成功的模态框
            const closeSuccessModal = document.querySelector('#close-success-modal');
            closeSuccessModal.addEventListener('click', () => {
                successModal.remove();
            });

            // 点击模态框外部关闭模态框
            successModal.addEventListener('click', (event) => {
                if (event.target === successModal) {
                    successModal.remove();
                }
            });

            // 设置提交成功模态框自动关闭的时间（单位：毫秒）
            const successDelayTime = 500; // 你可以根据需要修改这个值

            // 延时后自动关闭提交成功的模态框
            setTimeout(() => {
                successModal.remove();
            }, successDelayTime);
        }, submitDelayTime);
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