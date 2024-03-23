const readline = require("readline");

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
    console.log(
      `Voo ${this.numero}: de ${this.origem} para ${this.destino}, horário: ${this.horario}`
    );
  }
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

// Criando a interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para exibir voos disponíveis
function exibirVoosDisponiveis() {
  console.log("Voos Disponíveis:");
  voosDisponiveis.forEach((voo) => voo.exibirDetalhes());
  showMenu(); // Exibe o menu novamente
}

// Função para verificar altitudes livres
function altitudesLivres(horario) {
  const altitudesOcupadas = ["FL300", "FL320", "FL340"]; // altitudes ocupadas
  const altitudesDisponiveis = ["FL290", "FL310", "FL330", "FL350"]; // altitudes disponíveis

  // Filtrar altitudes disponíveis
  const altitudesLivres = altitudesDisponiveis.filter(
    (altitude) => !altitudesOcupadas.includes(altitude)
  );

  // Exibir altitudes disponíveis
  console.log(`Altitudes livres em ${horario}:`);
  altitudesLivres.forEach((altitude) => console.log(altitude));
  showMenu(); // Exibe o menu novamente
}

// Função submeter o Plano de Voo
function submeterPlanoVoo(planoVoo) {
  console.log("Submetendo Plano de Voo...");
  console.log("Plano de Voo submetido com sucesso!");
  showMenu(); // Exibe o menu novamente
}

// Função listar planos de voo por número
function listarPlanosPorNumero() {
  console.log("Listagem de Plano de Voo por Número:");
  voosDisponiveis.forEach((voo) => console.log(`Número do Voo: ${voo.numero}`));
  showMenu(); // Exibe o menu novamente
}

// Função listar planos de voo para uma determinada data
function listarPlanosPorData(data) {
  console.log(`Listagem de Planos de Voo para a data: ${data}`);
  // Simulação de dados de Planos de Voo para a data
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
  // 5 planos de voo aleatórios
  shuffle(planosVoo)
    .slice(0, Math.floor(Math.random() * 5) + 1)
    .forEach((voo, index) =>
      console.log(
        `${index + 1}. Número: ${voo.numero}, Origem: ${voo.origem}, Destino: ${
          voo.destino
        }, Horário: ${voo.horario}`
      )
    );
  showMenu(); // Exibe o menu novamente
}

// Função listar ocupação de uma aerovia em data
function listarOcupacaoAerovia(data) {
  console.log(`Listagem de Ocupação de uma Aerovia para a data: ${data}`);
  // Simulação de dados de ocupação da aerovia para a data especificada
  const ocupacaoAerovia = [
    { altitude: "FL290", ocupacao: "Baixa" },
    { altitude: "FL310", ocupacao: "Média" },
  ];
  // Exibir 5 ocupações de aerovia aleatórias
  shuffle(ocupacaoAerovia)
    .slice(0, 5)
    .forEach((ocupacao, index) =>
      console.log(
        `${index + 1}. Altitude: ${ocupacao.altitude}, Ocupação: ${
          ocupacao.ocupacao
        }`
      )
    );
  showMenu(); // Exibe o menu novamente
}

// Função cancelar o Plano de Voo
function cancelarPlanoVoo(numeroVoo) {
  console.log(`Cancelando Plano de Voo para o número: ${numeroVoo}`);
  // Aqui você pode adicionar a lógica para cancelar o Plano de Voo com o número especificado
  showMenu(); // Exibe o menu novamente
}

// Função escolha do usuário
function handleChoice(choice) {
  switch (choice) {
    case "1":
      exibirVoosDisponiveis();
      break;
    case "2":
      rl.question("Digite o horário desejado (formato HH:MM):", (horario) => {
        altitudesLivres(horario);
      });
      break;
    case "3":
      const planoVoo = {}; // Aqui você poderia criar um objeto com os detalhes do Plano de Voo
      submeterPlanoVoo(planoVoo);
      break;
    case "4":
      listarPlanosPorNumero();
      break;
    case "5":
      rl.question(
        "Digite a data desejada para o Voo (formato DD/MM/AAAA):",
        (dataPlanos) => {
          listarPlanosPorData(dataPlanos);
        }
      );
      break;
    case "6":
      rl.question(
        "Digite a data desejada para listar a ocupação da Aerovia (formato DD/MM/AAAA):",
        (dataOcupacao) => {
          listarOcupacaoAerovia(dataOcupacao);
        }
      );
      break;
    case "7":
      rl.question(
        "Digite o número do Voo que deseja cancelar:",
        (numeroVooCancelar) => {
          cancelarPlanoVoo(numeroVooCancelar);
        }
      );
      break;
    case "8":
      console.log("Encerrando o sistema...");
      rl.close();
      break;
    default:
      console.log("Opção inválida!");
      showMenu(); // Exibe o menu novamente após uma opção inválida
  }
}

// Função para mostrar o menu
function showMenu() {
  console.log("\nMenu:");
  console.log("1. Exibir voos disponíveis");
  console.log(
    "2. Verificar altitudes livres em uma aerovia em um determinado horário"
  );
  console.log("3. Submeter Plano de Voo");
  console.log("4. Listar Plano de Voo por Número");
  console.log("5. Listar Planos de Voo para uma determinada Data");
  console.log("6. Listar Ocupação de uma Aerovia em uma determinada Data");
  console.log("7. Cancelar Plano de Voo");
  console.log("8. Encerrar o Sistema");

  rl.question("Digite a opção desejada:", (answer) => {
    handleChoice(answer.trim());
  });
}

// Chamar a função para mostrar o menu
showMenu();
