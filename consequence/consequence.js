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
});