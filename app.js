// Função para gerar PDF de cada manutenção
function gerarPDF(activity) {
    if (typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        alert('Para gerar PDF, é necessário incluir jsPDF e html2canvas no index.html.');
        return;
    }
    const element = document.querySelector(`.activity[data-activity="${activity}"]`);
    // Seleciona o container das fases
    const phasesContainer = element.querySelector('.image-section > div');
    // Aplica layout vertical temporário
    phasesContainer.classList.add('vertical-pdf-layout');
    // Oculta todos os botões da atividade
    const buttons = element.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');
    window.html2canvas(element, {
        scale: 1,
        width: 595,
        height: 842
    }).then(canvas => {
        // Restaura botões após captura
        buttons.forEach(btn => btn.style.display = '');
        // Remove layout vertical após captura
        phasesContainer.classList.remove('vertical-pdf-layout');
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        pdf.save(`${activity}-manutencao.pdf`);
    });
}
const promptsData = {
    painting: [
        "Parede antiga com tinta descascada e manchas, ambiente interno simples, luz natural suave, aspecto abandonado, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Trabalhador pintando parede com rolo e balde de tinta, usando capacete e luvas, iluminação clara, foco na ação, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Parede recém-pintada lisa, cor vibrante e uniforme, ambiente renovado limpo, luz brilhante, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ],
    renovation: [
        "Quarto com parede rachada e piso danificado, aparência antiga, luz fraca, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Dois trabalhadores reformando, um usando furadeira, outro consertando parede, equipamentos de EPI, ferramentas organizadas, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Quarto moderno reformado, novo piso, paredes lisas pintadas, iluminação brilhante, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ],
    gardening: [
        "Jardim descuidado com grama alta, folhas secas, arbustos sem poda, luz do dia natural, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Jardineiro aparando grama, outro podando arbustos, luvas e uniforme, ferramentas visíveis, céu limpo, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Jardim verde bonito, grama cortada, arbustos podados, flores coloridas, atmosfera vibrante, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ],
    plumbing: [
        "Cano exposto vazando água, chão molhado, ambiente simples de manutenção, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Encanador consertando cano com chave, usando capacete e luvas, trabalho focado, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Cano consertado, ambiente limpo e seco, funcionamento perfeito, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ],
    electrical: [
        "Fiação exposta na parede, lâmpada queimada, ambiente escuro, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Eletricista consertando fios com ferramentas isoladas, usando capacete, luvas de borracha e óculos de proteção, iluminação focada no trabalho, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Sistema elétrico organizado, fios devidamente posicionados, lâmpadas acesas, interior iluminado, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ],
    carpentry: [
        "Porta de madeira danificada, rachaduras e tinta descascada, fundo de oficina antiga, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Carpinteiro lixando madeira na bancada, usando luvas e óculos de proteção, ferramentas de carpintaria na mesa, oficina iluminada, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo.",
        "Porta de madeira restaurada, superfície lisa e envernizada, oficina limpa, fotorrealista, ultra detalhado, 8k, HDR, iluminação cinematográfica, texturas realistas, alta resolução, fotografia profissional, hiper-realismo."
    ]
};

function showPrompt(activity) {
    const prompts = promptsData[activity];
    // Antes
    const beforeSuggestion = document.getElementById(`suggestion-${activity}-before`);
    if (beforeSuggestion) beforeSuggestion.textContent = prompts[0] || "";
    // Durante
    const duringSuggestion = document.getElementById(`suggestion-${activity}-during`);
    if (duringSuggestion) duringSuggestion.textContent = prompts[1] || "";
    // Depois
    const afterSuggestion = document.getElementById(`suggestion-${activity}-after`);
    if (afterSuggestion) afterSuggestion.textContent = prompts[2] || "";
    }

    // Função para mostrar pré-visualização da imagem
    function setupImagePreview(activity) {
        ['before', 'during', 'after'].forEach(stage => {
            const input = document.getElementById(`${activity}-${stage}`);
            const preview = document.getElementById(`preview-${activity}-${stage}`);
            const suggestion = document.getElementById(`suggestion-${activity}-${stage}`);
            if (input && preview) {
                input.addEventListener('change', function() {
                    preview.innerHTML = '';
                    const file = input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.style.maxWidth = '120px';
                            img.style.maxHeight = '90px';
                            preview.appendChild(img);
                            if (suggestion) suggestion.style.display = '';
                        };
                        reader.readAsDataURL(file);
                    } else {
                        if (suggestion) suggestion.style.display = '';
                    }
                });
            }
        });
    }

    // Inicializar pré-visualização para todas as atividades ao carregar a página
    document.addEventListener('DOMContentLoaded', function() {
        ['painting', 'renovation', 'gardening', 'plumbing', 'electrical', 'carpentry'].forEach(activity => {
            setupImagePreview(activity);
            // Exibe sugestões automaticamente
            const prompts = promptsData[activity];
            const beforeSuggestion = document.getElementById(`suggestion-${activity}-before`);
            if (beforeSuggestion) beforeSuggestion.textContent = prompts[0] || "";
            const duringSuggestion = document.getElementById(`suggestion-${activity}-during`);
            if (duringSuggestion) duringSuggestion.textContent = prompts[1] || "";
            const afterSuggestion = document.getElementById(`suggestion-${activity}-after`);
            if (afterSuggestion) afterSuggestion.textContent = prompts[2] || "";
        });
    });

