const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções. Gosta de construir, corrigir falhas e encontrar soluções práticas.",
        recomendacao: "Atuar na manutenção de motores, reparo de estruturas do habitat e fabricação de equipamentos de suporte à vida.",
        imagem: "docomentos/missao-aura/imagens/construtor.jpg"
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar, analisar evidências e descobrir como as coisas funcionam.",
        recomendacao: "Liderar análises laboratoriais de amostras exógenas, estudo de fenômenos atmosféricos e biologia planetária.",
        imagem: "imagens/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Gosta de descobrir lugares, experimentar alternativas e lidar com situações novas.",
        recomendacao: "Comandar missões de reconhecimento em solo, mapeamento geográfico e incursões em terrenos desconhecidos.",
        imagem: "imagens/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Gosta de organizar informações, coordenar pessoas e decidir os próximos passos.",
        recomendacao: "Gerenciar protocolos de segurança, alocação de recursos da colônia e coordenação tática da tripulação.",
        imagem: "imagens/perfil-4.jpg"
    }
];

const quizForm = document.getElementById('quiz-form');
const resultadoContainer = document.getElementById('resultado-container');
const btnRefazer = document.getElementById('btn-refazer');

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const dataNascimentoStr = document.getElementById('data-nascimento').value;

    if (!dataNascimentoStr) {
        alert("Por favor, informe sua data de nascimento.");
        return;
    }

    const dataNascimento = new Date(dataNascimentoStr + "T00:00:00");
    const hoje = new Date();

    if (dataNascimento > hoje) {
        alert("A data de nascimento não pode estar no futuro!");
        return;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = dataNascimento.getMonth();
    const diaNasc = dataNascimento.getDate();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
        idade--;
    }

    const p1 = parseInt(document.querySelector('input[name="p1"]:checked').value);
    const p2 = parseInt(document.querySelector('input[name="p2"]:checked').value);
    const p3 = parseInt(document.querySelector('input[name="p3"]:checked').value);
    const p4 = parseInt(document.querySelector('input[name="p4"]:checked').value);

    const contagem = { 1: 0, 2: 0, 3: 0, 4: 0 };
    contagem[p1]++;
    contagem[p2]++;
    contagem[p3]++;
    contagem[p4]++;

    let perfilVencedorId = 1;
    let maiorPontuacao = -1;

    for (let id in contagem) {
        if (contagem[id] > maiorPontuacao) {
            maiorPontuacao = contagem[id];
            perfilVencedorId = parseInt(id);
        }
    }

    const perfilSelecionado = perfis.find(p => p.id === perfilVencedorId);

    document.getElementById('res-nome').textContent = nome;
    document.getElementById('res-idade').textContent = idade;
    document.getElementById('res-perfil').textContent = perfilSelecionado.nome;
    document.getElementById('res-categoria').textContent = perfilSelecionado.categoria;
    document.getElementById('res-descricao').textContent = perfilSelecionado.descricao;
    document.getElementById('res-recomendacao').textContent = perfilSelecionado.recomendacao;
    document.getElementById('perfil-img').src = perfilSelecionado.imagem;
    document.getElementById('perfil-img').alt = perfilSelecionado.nome;

    quizForm.classList.add('hidden');
    resultadoContainer.classList.remove('hidden');
});

btnRefazer.addEventListener('click', function() {
    quizForm.reset();
    resultadoContainer.classList.add('hidden');
    quizForm.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});