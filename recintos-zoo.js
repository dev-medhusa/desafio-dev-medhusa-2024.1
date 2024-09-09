class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisPermitidos = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisPermitidos[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaAdequado = this.biomaAdequado(recinto, animal);
            const espaçoLivre = this.calcularEspacoLivre(recinto, animal, quantidade);
            const coexistir = this.coexistirAnimais(recinto, animal);
            return biomaAdequado && espaçoLivre >= 0 && coexistir;
        }).map(recinto => {
            const espaçoLivre = this.calcularEspacoLivre(recinto, animal, quantidade);
            return `Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    biomaAdequado(recinto, animal) {
        return this.animaisPermitidos[animal].biomas.includes(recinto.bioma);
    }

    calcularEspacoLivre(recinto, animal, quantidade) {
        const espaçoOcupadoExistente = recinto.animais.reduce((total, a) => total + (this.animaisPermitidos[a.especie].tamanho * a.quantidade), 0);
        const espaçoOcupadoNovo = this.animaisPermitidos[animal].tamanho * quantidade;

        //Verificação de numero de especies no recinto
        const maisDeUmaEspecie = recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== animal);
        const espaçoExtra = maisDeUmaEspecie ? 1 : 0;

        return recinto.tamanhoTotal - (espaçoOcupadoExistente + espaçoOcupadoNovo + espaçoExtra);
    }

    coexistirAnimais(recinto, animal) {
        const carnívoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];
        const éCarnívoro = carnívoros.includes(animal);

        // Carnívoros só podem ficar com a própria espécie
        if (éCarnívoro) {
            return recinto.animais.every(a => a.especie === animal);
        }

        // Hipopótamos só toleram outras espécies se estiverem num bioma misto
        if (animal === 'HIPOPOTAMO' || recinto.animais.some(a => a.especie === 'HIPOPOTAMO')) {
            return recinto.bioma === 'savana e rio';
        }

        // Macacos precisam de outros animais no recinto
        if (animal === 'MACACO' && recinto.animais.length === 0) {
            return false; // Macacos não podem ficar sozinhos
        }

        return true;
    }
}

// Exemplo de chamada:
const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('MACACO', 2)); // Testando com macacos




