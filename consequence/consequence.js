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

            // 创建名词解释色块
            const definitionBlock = document.createElement('div');
            definitionBlock.className = 'definition-block';
            definitionBlock.textContent = '名词解释';
            definitionBlock.addEventListener('click', () => {
                localStorage.setItem('analysisTitle', result.name);
                localStorage.setItem('analysisType', 'definition');
                window.location.href = '../analysis/analysis.html';
            });

            resultItem.appendChild(definitionBlock);

            // 创建七个子色块
            for (let i = 1; i <= 7; i++) {
                const subContentItem = document.createElement('div');
                subContentItem.className = 'sub-content-item';
                subContentItem.textContent = `子内容${i}`;
                subContentItem.addEventListener('click', () => {
                    localStorage.setItem('analysisTitle', `${result.name} - 子内容${i}`);
                    localStorage.setItem('analysisType', 'subcontent');
                    window.location.href = '../analysis/analysis.html';
                });

                resultItem.appendChild(subContentItem);
            }

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