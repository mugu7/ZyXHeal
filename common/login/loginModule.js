const loginModule = (function() {
    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    async function handleFormSubmit(event, modal) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://your-backend-api.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('登录成功:', data);
                closeModal(modal);
            } else {
                console.error('登录失败:', response.statusText);
                alert('登录失败，请检查用户名和密码');
            }
        } catch (error) {
            console.error('网络错误:', error);
            alert('网络错误，请稍后再试');
        }
    }

    function setupListeners(modal, openModalBtn, closeModalBtn, logImg, form) {
        openModalBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(modal);
        });

        logImg.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(modal);
        });

        closeModalBtn.addEventListener('click', () => {
            closeModal(modal);
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });

        form.addEventListener('submit', (event) => {
            handleFormSubmit(event, modal);
        });
    }

    return {
        init: (modalId, openModalBtnId, closeModalBtnId, logImgId, formId) => {
            const modal = document.getElementById(modalId);
            const openModalBtn = document.getElementById(openModalBtnId);
            const closeModalBtn = document.getElementById(closeModalBtnId);
            const logImg = document.getElementById(logImgId);
            const form = document.getElementById(formId);

            setupListeners(modal, openModalBtn, closeModalBtn, logImg, form);
        }
    };
})();

// 初始化模块
document.addEventListener('DOMContentLoaded', () => {
    loginModule.init('modal', 'open-modal', 'close-modal', 'logImg', 'login-form');

    // 返回上一级按钮的点击事件
    document.querySelector('.icon-back-to-prev').addEventListener('click', () => {
        history.back();
    });

    // 返回下一级按钮的点击事件
    document.querySelector('.icon-forward-to-next').addEventListener('click', () => {
        history.forward();
    });
});