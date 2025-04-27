document.addEventListener('DOMContentLoaded', () => {
    // Constantes para classes e storage
    const CLASS_SELECTED = 'selecionado';
    const STORAGE_KEY = 'selectedCharacter';

    const botoes = document.querySelectorAll('.botao');
    const personagens = document.querySelectorAll('.personagem');
    const clickSound = document.getElementById('clickSound');

    // Função para remover seleção atual
    function limparSelecao() {
        document.querySelector(`.botao.${CLASS_SELECTED}`)?.classList.remove(CLASS_SELECTED);
        document.querySelector(`.personagem.${CLASS_SELECTED}`)?.classList.remove(CLASS_SELECTED);
    }

    // Função para ativar personagem e botão
    function ativarPersonagem(indice) {
        limparSelecao();
        botoes[indice].classList.add(CLASS_SELECTED);
        personagens[indice].classList.add(CLASS_SELECTED);
        botoes[indice].focus(); // Acessibilidade: foco no botão selecionado
        localStorage.setItem(STORAGE_KEY, indice);

        // Toca o som, se existir
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }

    // Carrega seleção salva
    const savedIndex = localStorage.getItem(STORAGE_KEY);
    if (savedIndex !== null && botoes[savedIndex]) {
        ativarPersonagem(Number(savedIndex));
    }

    // Navegação por teclado global (setas)
    document.addEventListener('keydown', (e) => {
        const currentIndex = [...botoes].findIndex(b => b.classList.contains(CLASS_SELECTED));
        if (e.key === 'ArrowDown' && currentIndex < botoes.length - 1) {
            ativarPersonagem(currentIndex + 1);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            ativarPersonagem(currentIndex - 1);
        }
    });

    // Event listeners para cada botão
    botoes.forEach((botao, indice) => {
        botao.addEventListener('click', () => ativarPersonagem(indice));
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                ativarPersonagem(indice);
            }
        });
    });
});
