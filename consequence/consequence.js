document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result-container');

    // 从 localStorage 中获取诊断结果
    const diagnosisResult = JSON.parse(localStorage.getItem('diagnosisResult'));

    const subContents = [
        "名词解释",
        "诊断标准",
        "症状与临床表现",
        "检查与测试",
        "易感因素",
        "睡眠障碍相关疾病",
        "预防措施及诊疗建议",
        "并发症"
    ];

    if (diagnosisResult && Array.isArray(diagnosisResult) && diagnosisResult.length > 0) {
        diagnosisResult.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.dataset.name = result.name; // 存储名称

            const title = document.createElement('h3');
            title.textContent = result.name;

            // 格式化概率为两位小数的百分数
            const formattedProbability = (parseFloat(result.probability) * 100).toFixed(2) + '%';
            const probability = document.createElement('p');
            probability.textContent = `概率: ${formattedProbability}`;

            const subContentContainer = document.createElement('div');
            subContentContainer.className = 'sub-content-container';

            subContents.forEach(subContent => {
                const subContentItem = document.createElement('div');
                subContentItem.className = 'sub-content-item';
                subContentItem.textContent = subContent;
                subContentItem.dataset.content = subContent;

                subContentItem.addEventListener('click', async () => {
                    const name = resultItem.dataset.name;
                    const content = subContentItem.dataset.content;
                    console.log('点击的内容:', name, content);

                    // 存储分析类型
                    localStorage.setItem('analysisType', content);

                    if (content === '名词解释') {
                        // 如果点击的是“名词解释”，直接跳转到 analysis 页面
                        localStorage.setItem('analysisTitle', name);
                        window.location.href = '../analysis/analysis.html';
                    } else {
                        // 构建请求数据
                        const requestData = {
                            [name]: content
                        };

                        console.log('发送的请求数据:', requestData);

                        // 后端地址
                        const backendUrl = 'http://121.41.10.59:8080/api/info'; // 替换为实际后端地址

                        try {
                            // 发送 POST 请求
                            const response = await fetch(backendUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(requestData)
                            });

                            if (response.ok) {
                                const treatmentResult = await response.json();
                                console.log('后端返回的治疗建议:', treatmentResult);

                                // 将治疗建议存储到 localStorage
                                localStorage.setItem('treatmentResult', JSON.stringify(treatmentResult));

                                // 动态设置分析页面的标题
                                localStorage.setItem('analysisTitle', content);

                                // 跳转到 analysis 页面
                                window.location.href = '../analysis/analysis.html';
                            } else {
                                console.error('请求失败:', response.status, response.statusText);
                                alert('请求失败，请稍后再试。');
                            }
                        } catch (error) {
                            console.error('请求出错:', error);
                            alert('请求出错，请检查网络连接或稍后再试。');
                        }
                    }
                });

                subContentContainer.appendChild(subContentItem);
            });

            resultItem.appendChild(title);
            resultItem.appendChild(probability);
            resultItem.appendChild(subContentContainer);

            resultContainer.appendChild(resultItem);
        });
    } else {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = '没有诊断结果';
        resultContainer.appendChild(noResultMessage);
    }
});