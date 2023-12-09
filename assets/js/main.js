// Seleciona o formulário usando o ID 'form'
const form = document.querySelector('#form')

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', function(event) {
    // Impede o comportamento padrão de enviar o formulário
    event.preventDefault()

    // Obtém os elementos de entrada de peso e altura
    const inputPeso = event.target.querySelector('#peso')
    const inputAltura = event.target.querySelector('#altura')

    // Converte os valores de peso e altura para números
    const peso = Number(inputPeso.value)
    const altura = Number(inputAltura.value)

    // Verifica se o peso é válido
    if (!peso) {
        setResultado('Peso inválido', false)
        return
    }

    // Verifica se a altura é válida
    if (!altura) {
        setResultado('Altura inválida', false)
        return
    }

    // Calcula o IMC e determina o nível do IMC
    const imc = getImc(peso, altura)
    const nivelImc = getNivelImc(imc)

    // Cria uma mensagem formatada com o IMC e o nível
    const msg = `Seu IMC é ${imc} (${nivelImc}).`

    // Define o resultado na página com a mensagem e o nível do IMC
    setResultado(msg, nivelImc, true)
})

// Função que determina o nível do IMC com base nos intervalos predefinidos
function getNivelImc(imc) {
    const nivel = [
        'Abaixo do peso', 
        'Peso Normal', 
        'Sobrepeso', 
        'Obesidade grau 1', 
        'Obesidade grau 2'
    ]

    // Compara o IMC com intervalos para determinar o nível
    if (imc >= 34.9){
        return nivel[4]
    } else if (imc >= 29.9){
        return nivel[3]
    } else if (imc >= 24.9){
        return nivel[2]
    } else if (imc >= 18.5){
        return nivel[1]
    } else if (imc < 18.5) {
        return nivel[0]
    }
}

// Função que calcula o IMC com base no peso e altura fornecidos
function getImc(peso, altura) {
    const imc = peso / altura ** 2
    return imc.toFixed(2) //toFixed limita o resultado a (x) casas decimais
}

// Função que cria um parágrafo HTML
function criaP(){
    const p = document.createElement('p')
    return p
}

// Função que define o resultado na página com a mensagem, nível do IMC e validação
function setResultado(msg, nivelImc, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = document.createElement('p');

    // Remove todas as classes de cor antes de adicionar a nova cor
    resultado.classList.remove('blue', 'green', 'yellow', 'orange', 'red', 'bad');
  
    // Adiciona a classe de cor de fundo com base no nível do IMC se for válido
    if (isValid) {
      resultado.classList.add(getCorFundo(nivelImc));
    } else {
      p.classList.add('bad');
    }
  
    // Define o texto do parágrafo como a mensagem
    p.textContent = msg;
    // Adiciona o parágrafo ao elemento resultado
    resultado.appendChild(p);
}

// Função que obtém a cor de fundo com base no nível do IMC
function getCorFundo(nivelImc) {
    switch (nivelImc) {
      case 'Abaixo do peso':
        return 'blue';
      case 'Peso Normal':
        return 'green';
      case 'Sobrepeso':
        return 'yellow';
      case 'Obesidade grau 1':
        return 'orange';
      case 'Obesidade grau 2':
        return 'red';
      default:
        return '';
    }
}
