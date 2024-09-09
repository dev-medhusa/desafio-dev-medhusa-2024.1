document.getElementById("zoo-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o comportamento padrão de envio do formulário

    // Captura os valores dos inputs
    const animal = document.getElementById("animal").value.trim().toUpperCase();
    const quantidade = parseInt(document.getElementById("quantidade").value);

    // Verifica se a quantidade é válida
    if (isNaN(quantidade) || quantidade <= 0) {
        window.alert("Quantidade inválida");
        return;
    }

    // Chama a função do arquivo recintos-zoo.js
    const resultado = new RecintosZoo().analisaRecintos(animal, quantidade);

    // Verifica o resultado e exibe no alert
    if (resultado.erro) {
        window.alert(resultado.erro);
    } else {
        const recintosViaveis = resultado.recintosViaveis.join("\n");
        window.alert("Recintos viáveis:\n" + recintosViaveis);
    }
});