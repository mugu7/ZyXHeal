document.addEventListener('DOMContentLoaded', () => {
    const treatmentContainer = document.getElementById('treatment-container');
    const pageTitle = document.getElementById('page-title');
    const headerTitle = document.getElementById('header-title');

    // 从 localStorage 中获取治疗建议
    const treatmentResult = JSON.parse(localStorage.getItem('treatmentResult'));
    const analysisTitle = localStorage.getItem('analysisTitle');

    if (analysisTitle) {
        pageTitle.textContent = analysisTitle;
        headerTitle.textContent = analysisTitle;
    }

    if (treatmentResult && Array.isArray(treatmentResult) && treatmentResult.length > 0) {
        treatmentResult.forEach(treatment => {
            const treatmentItem = document.createElement('div');
            treatmentItem.className = 'treatment-item';

            const title = document.createElement('h3');
            title.textContent = treatment.name;

            const description = document.createElement('p');
            description.textContent = treatment.describe;

            treatmentItem.appendChild(title);
            treatmentItem.appendChild(description);

            treatmentContainer.appendChild(treatmentItem);
        });
    } else {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = '没有治疗建议';
        treatmentContainer.appendChild(noResultMessage);
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