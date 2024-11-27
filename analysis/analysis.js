document.addEventListener('DOMContentLoaded', () => {
    const treatmentContainer = document.getElementById('treatment-container');
    const definitionContainer = document.getElementById('definition-container');
    const pageTitle = document.getElementById('page-title');
    const headerTitle = document.getElementById('header-title');

    // 从 localStorage 中获取分析类型和标题
    const analysisTitle = localStorage.getItem('analysisTitle');
    const analysisType = localStorage.getItem('analysisType');

    if (analysisTitle) {
        pageTitle.textContent = analysisTitle;
        headerTitle.textContent = analysisTitle;
    }

    // 病症解释数据
    const conditionDefinitions = {
        "不宁腿综合征": {
            professional: "不宁腿综合征是一种神经系统疾病，其特征是在休息或试图睡觉时出现强烈的腿部移动欲望，通常伴有不适感或异常感觉，如刺痛、拉扯或虫爬感。这些症状在晚上或休息时加重，通过活动肢体可得到暂时缓解。",
            common: "想象一下，当你准备入睡时，你的腿就像被无数只小蚂蚁爬过一样痒痒的、刺刺的，让你无法安坐或躺下，必须不停地动来动去才能稍微舒服点，这种感觉非常影响睡眠质量。"
        },
        "中枢性睡眠呼吸暂停综合症": {
            professional: "中枢性睡眠呼吸暂停综合症是指在睡眠中由于大脑未能正确地向呼吸肌发送信号而导致的一系列呼吸暂停事件。这类呼吸问题不是因为气道堵塞引起的，而是与控制呼吸的大脑部分功能失调有关。",
            common: "睡觉时，大脑偶尔会“忘记”告诉身体要呼吸，导致呼吸暂停，这种情况可能会让人突然醒来，感到窒息或喘不过气来，严重影响睡眠质量和第二天的精神状态。"
        },
        "发作性睡病": {
            professional: "发作性睡病是一种慢性神经系统疾病，主要特征是白天过度嗜睡和突然的睡眠发作。患者可能还会经历睡眠瘫痪、入睡前幻觉和猝倒等症状。",
            common: "这是一种让人随时随地都可能突然进入深度睡眠的状态，即使是在走路、吃饭或者开车的时候。除此之外，患者还可能在尝试入睡时看到或听到不存在的事物，或者醒来时发现自己不能动弹。"
        },
        "失眠症": {
            professional: "失眠症是指尽管有足够的睡眠机会，但仍然难以入睡、维持睡眠或早醒，并且这种困难导致了白天的功能受损。长期的失眠会对个人的健康、工作能力和生活质量产生负面影响。",
            common: "晚上躺在床上翻来覆去怎么也睡不着，或者半夜醒来后就再也无法入睡，这种情况持续很长时间，不仅让人第二天精神不佳，长此以往还会影响身体健康。"
        },
        "延迟睡眠相位障碍": {
            professional: "延迟睡眠相位障碍是一种睡眠-觉醒周期紊乱，患者的自然睡眠模式比常规的社会或职业要求的时间晚2小时以上。这使得患者很难按照正常的工作或学校时间表进行作息。",
            common: "如果你发现自己的生物钟总是比别人慢两拍，比如到了晚上很晚才开始感到困倦，早上又很难按时起床，那么你可能患有延迟睡眠相位障碍，这会让你很难适应正常的社交和工作时间。"
        },
        "快速眼球运动睡眠期行为障碍": {
            professional: "快速眼球运动睡眠期行为障碍是一种睡眠障碍，其中患者在REM睡眠期间失去肌肉松弛状态，从而能够执行梦中的动作，可能导致对自己或床伴造成伤害。",
            common: "当人们处于梦境中时，身体通常是放松的，但患有快速眼球运动睡眠期行为障碍的人却能在梦中做出真实的动作，比如说话、挥动手臂甚至下床行走，这不仅可能伤害到自己，也可能伤害到旁边的人。"
        },
        "提前睡眠相位障碍": {
            professional: "提前睡眠相位障碍是指个体的睡眠周期相对于常规社会时间提前了至少2小时以上，导致他们过早地感到困倦并上床睡觉，同时也会比大多数人更早醒来。",
            common: "如果一个人每天下午就感到非常困倦想要睡觉，并且凌晨三四点就会自然醒来，那么他可能患有提前睡眠相位障碍，这种状况同样会影响个人的日程安排和社会生活。"
        },
        "梦游症": {
            professional: "梦游症是一种在睡眠中出现的行为，患者会从床上起来并进行一系列复杂的活动，如走路、进食等，但对这些活动没有记忆。梦游通常发生在深度非REM睡眠阶段。",
            common: "梦游是指人在睡眠中起床并进行各种活动，但醒来后对这些活动完全没有印象。梦游者可能会做一些日常生活中常见的事情，如穿衣、吃东西，有时甚至离开家门外出，这对他们自身和周围的人来说都是潜在的危险。"
        },
        "特发性过度睡眠": {
            professional: "特发性过度睡眠是一种以白天过度嗜睡为主要特征的睡眠障碍，不同于发作性睡病，患者通常不会出现猝倒或睡眠瘫痪等症状。IH患者的夜间睡眠时间往往比常人长，但即便如此，他们在白天仍然感到极度困倦。",
            common: "这是一种让人整天都感到非常疲倦和困倦的情况，即使晚上睡了很长时间，白天还是想睡觉。与发作性睡病不同的是，这种困倦并不会突然发生，而是持续性的。"
        },
        "过度睡眠障碍": {
            professional: "过度睡眠障碍是一类以白天过度嗜睡为特征的睡眠障碍，包括特发性过度睡眠、发作性睡病和其他原因引起的过度睡眠。这些障碍会导致患者在白天频繁感到困倦，严重影响日常生活和工作。",
            common: "这一类疾病的特点就是患者经常感到极度困倦，需要大量的睡眠，即使睡了很多觉，白天还是会觉得疲惫不堪，严重影响了工作和生活的质量。"
        },
        "阻塞性睡眠呼吸暂停": {
            professional: "阻塞性睡眠呼吸暂停是一种睡眠障碍，其特点是睡眠过程中反复出现的呼吸暂停，这是由于上呼吸道部分或完全阻塞造成的。每次呼吸暂停都会导致血氧水平下降，最终迫使患者短暂醒来恢复呼吸。",
            common: "睡觉时，呼吸道会被部分或完全堵住，导致呼吸暂停，直到大脑发出警报使你醒来才能重新开始呼吸。这种情况会导致睡眠中断，使人第二天感到疲劳和精力不足。"
        }
    };

    if (analysisType === 'definition') {
        const definition = conditionDefinitions[analysisTitle];
        if (definition) {
            const definitionItem = document.createElement('div');
            definitionItem.className = 'definition-item';

            const professional = document.createElement('h3');
            professional.textContent = '专业解释：';

            const professionalDescription = document.createElement('p');
            professionalDescription.textContent = definition.professional;

            const common = document.createElement('h3');
            common.textContent = '通俗解释：';

            const commonDescription = document.createElement('p');
            commonDescription.textContent = definition.common;

            definitionItem.appendChild(professional);
            definitionItem.appendChild(professionalDescription);
            definitionItem.appendChild(common);
            definitionItem.appendChild(commonDescription);

            definitionContainer.appendChild(definitionItem);
        } else {
            const noResultMessage = document.createElement('p');
            noResultMessage.textContent = '没有找到相关解释';
            definitionContainer.appendChild(noResultMessage);
        }
    } else {
        // 从 localStorage 中获取治疗建议
        const treatmentResult = JSON.parse(localStorage.getItem('treatmentResult'));

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