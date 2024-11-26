document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result-container');

    // 从 localStorage 中获取诊断结果
    const diagnosisResult = JSON.parse(localStorage.getItem('diagnosisResult'));

    if (diagnosisResult && Array.isArray(diagnosisResult) && diagnosisResult.length > 0) {
        diagnosisResult.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const name = document.createElement('h3');
            name.textContent = result.name;

            const probability = document.createElement('p');
            probability.textContent = `概率: ${result.percentage.toFixed(2)}%`;

            resultItem.appendChild(name);
            resultItem.appendChild(probability);

            resultContainer.appendChild(resultItem);
        });
    } else {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = '没有诊断结果';
        resultContainer.appendChild(noResultMessage);
    }

    // 返回上一级按钮的点击事件
    document.querySelector('.icon-back-to-prev').addEventListener('click', () => {
        history.back();
    });

    // 返回下一级按钮的点击事件
    document.querySelector('.icon-forward-to-next').addEventListener('click', () => {
        history.forward();
    });

    // 登录/注册模态框功能
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const logImg = document.getElementById('logImg');

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