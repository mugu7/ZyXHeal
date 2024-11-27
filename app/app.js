// 存储登录状态和图标路径
const LOGIN_ICON_PATH = '../image/login.png';
const LOGOUT_ICON_PATH = '../image/log.png';

// 初始化登录状态
function initLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateLoginIcon(isLoggedIn);
    updateLoginButton(isLoggedIn);
}

// 更新登录图标
function updateLoginIcon(isLoggedIn) {
    const logImg = document.querySelector('.logImg');
    logImg.src = isLoggedIn ? LOGIN_ICON_PATH : LOGOUT_ICON_PATH;
}

// 更新登录按钮
function updateLoginButton(isLoggedIn) {
    const loginButton = document.getElementById('open-modal');
    if (loginButton) {
        if (isLoggedIn) {
            loginButton.textContent = '退出登录';
            loginButton.removeEventListener('click', openLoginModal);
            loginButton.addEventListener('click', logoutUser);
        } else {
            loginButton.textContent = '登录/注册';
            loginButton.removeEventListener('click', logoutUser);
            loginButton.addEventListener('click', openLoginModal);
        }
    }
}

// 用户登录
function loginUser(username, password) {
    // 这里可以添加发送数据到后端的代码
    console.log(`Username: ${username}, Password: ${password}`);

    // 模拟登录成功
    const submitDelayTime = 500; // 延迟时间（单位：毫秒）

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

    // 延时后显示登录成功的模态框
    setTimeout(() => {
        // 移除加载中的提示信息
        loadingModal.remove();

        // 显示登录成功的模态框
        const successModal = document.createElement('div');
        successModal.className = 'success-modal';
        successModal.innerHTML = `
            <div class="success-modal-content">
                <span class="close" id="close-success-modal">&times;</span>
                <div class="container_content">
                    <img src="../image/提交成功.png" alt="提交成功" class="success-icon">
                    <p>登录成功，欢迎回来！</p>
                </div>
            </div>
        `;
        document.body.appendChild(successModal);
        successModal.style.display = 'block';

        // 关闭登录成功的模态框
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

        // 设置登录成功模态框自动关闭的时间（单位：毫秒）
        const successDelayTime = 500; // 延迟时间（单位：毫秒）

        // 延时后自动关闭登录成功的模态框
        setTimeout(() => {
            successModal.remove();

            // 更新登录状态
            localStorage.setItem('isLoggedIn', 'true');
            updateLoginIcon(true);
            updateLoginButton(true);

            // 关闭模态框
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }, successDelayTime);
    }, submitDelayTime);
}

// 用户登出
function logoutUser(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'false');
    updateLoginIcon(false);
    updateLoginButton(false);
}

// 打开模态框
function openLoginModal(event) {
    event.preventDefault();
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// 初始化登录状态
initLoginState();

// 提交表单
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginUser(username, password);
});

// 关闭模态框
document.getElementById('close-modal').addEventListener('click', closeModal);

// 点击模态框外部关闭模态框
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});