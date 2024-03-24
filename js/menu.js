// Definição da classe Voo
class Voo {
  constructor(origem, destino, horario, numero) {
    this.origem = origem;
    this.destino = destino;
    this.horario = horario;
    this.numero = numero;
  }

  // Método para exibir detalhes do voo
  exibirDetalhes() {
    return `Voo ${this.numero}: de ${this.origem} para ${this.destino}, horário: ${this.horario}`;
  }
}

// Função para exibir voos disponíveis
function exibirVoosDisponiveis() {
  let output = "<p>Voos Disponíveis:</p>";
  voosDisponiveis.forEach((voo) => {
    output += `<p>${voo.exibirDetalhes()}</p>`;
  });
  document.getElementById("output").innerHTML = output;
}

// Função para verificar altitudes livres
function verificarAltitudes() {
  let horario = prompt("Digite o horário desejado (formato HH:MM):");
  let altitudesOcupadas = ["FL300", "FL320", "FL340"];
  let altitudesDisponiveis = ["FL290", "FL310", "FL330", "FL350"];
  let altitudesLivres = altitudesDisponiveis.filter(
    (altitude) => !altitudesOcupadas.includes(altitude)
  );
  let output = `Altitudes livres em ${horario}:<br>`;
  altitudesLivres.forEach((altitude) => {
    output += `${altitude}<br>`;
  });
  document.getElementById("output").innerHTML = output;
}

// Função submeter o Plano de Voo
function submeterPlanoVoo() {
  alert("Submetendo Plano de Voo...");
  alert("Plano de Voo submetido com sucesso!");
}

// Função listar planos de voo por número
function listarPlanosPorNumero() {
  let output = "<p>Listagem de Plano de Voo por Número:</p>";
  voosDisponiveis.forEach((voo) => {
    output += `<p>Número do Voo: ${voo.numero}</p>`;
  });
  document.getElementById("output").innerHTML = output;
}

// Função listar planos de voo para uma determinada data
function listarPlanosPorData() {
  let dataPlanos = prompt(
    "Digite a data desejada para o Voo (formato DD/MM/AAAA):"
  );
  let output = `<p>Listagem de Planos de Voo para a data: ${dataPlanos}</p>`;
  const planosVoo = [
    {
      numero: "NYLAX123",
      origem: "Nova York",
      destino: "Los Angeles",
      horario: "08:00",
    },
    {
      numero: "PARLON456",
      origem: "Paris",
      destino: "Londres",
      horario: "10:30",
    },
    {
      numero: "TOKSYD789",
      origem: "Tóquio",
      destino: "Sydney",
      horario: "15:45",
    },
    {
      numero: "LAXSYD321",
      origem: "Los Angeles",
      destino: "Sydney",
      horario: "12:00",
    },
    {
      numero: "SYDNYC654",
      origem: "Sydney",
      destino: "Nova York",
      horario: "18:30",
    },
  ];
  shuffle(planosVoo)
    .slice(0, Math.floor(Math.random() * 5) + 1)
    .forEach((voo, index) => {
      output += `<p>${index + 1}. Número: ${voo.numero}, Origem: ${
        voo.origem
      }, Destino: ${voo.destino}, Horário: ${voo.horario}</p>`;
    });
  document.getElementById("output").innerHTML = output;
}

// Função listar ocupação de uma aerovia em data
function listarOcupacaoAerovia() {
  let dataOcupacao = prompt(
    "Digite a data desejada para listar a ocupação da Aerovia (formato DD/MM/AAAA):"
  );
  let output = `<p>Listagem de Ocupação de uma Aerovia para a data: ${dataOcupacao}</p>`;
  const ocupacaoAerovia = [
    { altitude: "FL290", ocupacao: "Baixa" },
    { altitude: "FL310", ocupacao: "Média" },
  ];
  shuffle(ocupacaoAerovia)
    .slice(0, 5)
    .forEach((ocupacao, index) => {
      output += `<p>${index + 1}. Altitude: ${ocupacao.altitude}, Ocupação: ${
        ocupacao.ocupacao
      }</p>`;
    });
  document.getElementById("output").innerHTML = output;
}

// Função cancelar o Plano de Voo
function cancelarPlanoVoo() {
  let numeroVooCancelar = prompt("Digite o número do Voo que deseja cancelar:");
  alert(`Cancelando Plano de Voo para o número: ${numeroVooCancelar}`);
}

// Função para embaralhar um array (utilizada para exibir dados aleatórios)
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // Enquanto ainda existirem elementos para embaralhar
  while (0 !== currentIndex) {
    // Seleciona um elemento aleatório restante
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E troca com o elemento atual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Criando alguns voos disponíveis
const voosDisponiveis = [
  new Voo("São Paulo", "Rio de Janeiro", "08:00", "SPRIO123"),
  new Voo("Brasília", "Salvador", "10:30", "BRASAL456"),
  new Voo("Fortaleza", "Recife", "15:45", "FORREC789"),
  new Voo("Belém", "Manaus", "12:00", "BELEMAO321"),
  new Voo("Porto Alegre", "Curitiba", "18:30", "POACWB654"),
  new Voo("Goiânia", "Cuiabá", "09:15", "GOICGB987"),
  new Voo("Florianópolis", "Porto Seguro", "14:20", "FLNPSG654"),
  new Voo("Natal", "Maceió", "11:45", "NTLMAC321"),
  new Voo("Vitória", "Campo Grande", "16:00", "VITCGR789"),
  new Voo("Palmas", "São Luís", "19:30", "PMASLZ987"),
  new Voo("Recife", "Miami", "09:00", "RECMIAMI123"),
  new Voo("Miami", "Orlando", "12:30", "MIAORL456"),
  new Voo("Recife", "Orlando", "14:45", "RECORL789"),
];
