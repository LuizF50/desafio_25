document.getElementById('jukeboxForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const initialTrack = parseInt(document.getElementById('initialTrack').value);
    const targetTrack = parseInt(document.getElementById('targetTrack').value);

    const { stepsCount, steps } = calculateOperations(initialTrack, targetTrack);

    // Exibir resultado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: yellow;">Menor número de operações: ${stepsCount}</p>`;
    
    // Preencher tabela de passos
    const tableBody = document.querySelector('#stepsTable tbody');
    tableBody.innerHTML = ''; // Limpar tabela
    steps.forEach((step, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index}</td>
            <td>${step.operation}</td>
            <td>${step.value}</td>
        `;
        tableBody.appendChild(row);
    });
});

// Função para calcular o menor número de operações
function calculateOperations(initial, target) {
    const queue = [[initial, [{ operation: "Início", value: initial }], 0]]; // [valor atual, lista de passos, número de operações]
    const visited = new Set(); // Para evitar revisitar valores já processados

    while (queue.length > 0) {
        const [currentValue, steps, operations] = queue.shift();

        // Se o valor atual for igual ao alvo, retorne os passos e o número de operações
        if (currentValue === target) {
            return { 
                stepsCount: operations,
                steps 
            };
        }

        // Marcar o valor atual como visitado
        visited.add(currentValue);

        // Gerar próximos valores possíveis com suas respectivas operações
        const nextSteps = [
            { value: currentValue + 1, operation: `Adição de 1` },
            { value: currentValue - 1, operation: `Subtração de 1` },
            { value: currentValue * 2, operation: `Multiplicação por 2` },
            { value: Math.floor(currentValue / 2), operation: `Divisão por 2` }
        ];

        nextSteps.forEach(next => {
            if (next.value > 0 && !visited.has(next.value)) {
                queue.push([
                    next.value,
                    [...steps, { operation: next.operation, value: next.value }],
                    operations + 1
                ]);
                visited.add(next.value); // Marcar como visitado para evitar duplicações
            }
        });
    }

    return { stepsCount: -1, steps: [] }; // Caso não seja possível alcançar o alvo
}

// Botão para reiniciar o formulário e limpar resultados
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('jukeboxForm').reset();
    
    document.getElementById('result').innerHTML = '';
    
    const tableBody = document.querySelector('#stepsTable tbody');
    tableBody.innerHTML = '';
});
