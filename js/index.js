const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Definir arrays para armazenar pilotos, aeronaves e voos
const pilotos = [
  { id: 1, nome: "Piloto 1", habilitado: true },
  { id: 2, nome: "Piloto 2", habilitado: false },
];

const aeronaves = [
  { modelo: "Aeronave1", tipo: "Comercial", autonomia: 1000 },
  { modelo: "Aeronave2", tipo: "Particular", autonomia: 1200 },
];

const voosDisponiveis = [
  { origem: "São Paulo", destino: "Rio de Janeiro", horario: "08:00" },
  { origem: "Rio de Janeiro", destino: "Brasília", horario: "10:00" },
];

const voosAprovados = [];
const voosCancelados = [];

// Objeto para armazenar as altitudes ocupadas por aerovia e horário
const altitudesOcupadasPorAerovia = {};

// Função para exibir o menu de opções
function showMenu() {
  console.log("\nEscolha uma opção:");
  console.log("1. Listar Voos Disponíveis");
  console.log(
    "2. Verificar Altitudes Livres em uma Aerovia em um Determinado Horário"
  );
  console.log("3. Submeter Plano de Voo");
  console.log("4. Listar Plano de Voo por Número");
  console.log("5. Listar Planos de Voo para uma determinada Data");
  console.log("6. Listar Ocupação de uma Aerovia em uma determinada Data");
  console.log("7. Cancelar Plano de Voo");
  console.log("8. Encerrar o Sistema");
  rl.question("Opção: ", handleChoice);
}

// Função para verificar a autonomia da aeronave para o trecho
function verificarAutonomiaAeronave(aeronave, aerovia) {
  // Encontrar o tamanho da aerovia (apenas para exemplo, substitua por valores reais)
  let tamanhoAerovia;
  switch (aerovia) {
    case "São Paulo - Rio de Janeiro":
      tamanhoAerovia = 400; // Exemplo: tamanho da aerovia em quilômetros
      break;
    case "Rio de Janeiro - Brasília":
      tamanhoAerovia = 800; // Exemplo: tamanho da aerovia em quilômetros
      break;
    default:
      console.log("Aerovia não encontrada.");
      return false;
  }

  // Verificar se a autonomia da aeronave é 10% maior que o tamanho da aerovia
  const autonomiaNecessaria = tamanhoAerovia * 1.1;
  if (aeronave.autonomia >= autonomiaNecessaria) {
    console.log("Autonomia da aeronave é suficiente para o trecho.");
    return true;
  } else {
    console.log("Erro: Autonomia da aeronave não é suficiente para o trecho.");
    return false;
  }
}

// Função para verificar a compatibilidade da altitude com o tipo de aeronave
function verificarCompatibilidadeAltitude(altitude, tipoAeronave) {
  // Definir regras de compatibilidade de altitude para cada tipo de aeronave
  switch (tipoAeronave) {
    case "Comercial":
      // Altitudes compatíveis com aeronaves comerciais
      const altitudesComerciais = ["FL290", "FL310", "FL330", "FL350"];
      if (altitudesComerciais.includes(altitude)) {
        console.log("Altitude compatível com o tipo de aeronave comercial.");
        return true;
      } else {
        console.log(
          "Erro: Altitude não é compatível com o tipo de aeronave comercial."
        );
        return false;
      }
    case "Particular":
      // Altitudes compatíveis com aeronaves particulares
      const altitudesParticulares = ["FL200", "FL220", "FL240", "FL260"];
      if (altitudesParticulares.includes(altitude)) {
        console.log("Altitude compatível com o tipo de aeronave particular.");
        return true;
      } else {
        console.log(
          "Erro: Altitude não é compatível com o tipo de aeronave particular."
        );
        return false;
      }
    default:
      console.log("Erro: Tipo de aeronave não reconhecido.");
      return false;
  }
}

function altitudesLivres(aerovia, horario) {
  console.log(`Altitudes livres na aerovia ${aerovia} no horário ${horario}:`);

  // Verifica se a aerovia e o horário estão no mapa de altitudes ocupadas
  if (
    !(aerovia in altitudesOcupadasPorAerovia) ||
    !(horario in altitudesOcupadasPorAerovia[aerovia])
  ) {
    console.log("Não há informações sobre esta aerovia ou horário.");
    showMenu(); // Exibe o menu novamente
    return;
  }

  const altitudesOcupadas = altitudesOcupadasPorAerovia[aerovia][horario];

  const altitudesPossiveis = [];
  for (let altitude = 200; altitude <= 400; altitude += 10) {
    altitudesPossiveis.push(`FL${altitude}`);
  }

  // Filtra as altitudes possíveis para encontrar as livres
  const altitudesLivres = altitudesPossiveis.filter(
    (altitude) => !altitudesOcupadas.includes(altitude)
  );

  if (altitudesLivres.length > 0) {
    console.log("Altitudes livres:");
    altitudesLivres.forEach((altitude) => console.log(altitude));
  } else {
    console.log("Todas as altitudes estão ocupadas neste horário.");
  }

  showMenu(); // Exibe o menu novamente
}

// Função para exibir detalhes de um voo
function exibirDetalhesVoo(voo) {
  console.log(
    `Origem: ${voo.origem} - Destino: ${voo.destino} - Horário: ${voo.horario}`
  );
}

function verificarOcupacaoAeroviaData(aerovia, data) {
  console.log(`Ocupação da aerovia ${aerovia} na data ${data}:`);

  const voosNaAeroviaNaData = voosAprovados.filter((voo) => {
    return voo.aerovia === aerovia && voo.data === data;
  });

  if (voosNaAeroviaNaData.length > 0) {
    console.log("Voos ocupando esta aerovia nesta data:");
    voosNaAeroviaNaData.forEach((voo) => {
      console.log(
        `Origem: ${voo.origem}, Destino: ${voo.destino}, Horário: ${voo.horario}`
      );
    });
  } else {
    console.log("Nenhum voo ocupando esta aerovia nesta data.");
  }

  showMenu(); // Exibe o menu novamente
}

// Função para cancelar um plano de voo
function cancelarPlano(numeroPlano) {
  const index = voosAprovados.findIndex((voo) => voo.numero === numeroPlano);
  if (index !== -1) {
    const planoCancelado = voosAprovados.splice(index, 1)[0];
    voosCancelados.push(planoCancelado);
    console.log(`Plano de Voo ${numeroPlano} cancelado com sucesso.`);
  } else {
    console.log(`Plano de Voo ${numeroPlano} não encontrado.`);
  }
  showMenu(); // Exibe o menu novamente
}

function listarPlanoPorNumero() {
  rl.question(
    "Digite os primeiros 5 dígitos do Plano de Voo: ",
    (primeirosCincoDigitos) => {
      if (primeirosCincoDigitos.length < 5) {
        console.log(
          "Os primeiros 5 dígitos do Plano de Voo devem ter no mínimo 5 dígitos."
        );
        listarPlanoPorNumero();
        return;
      }

      const planos = voosAprovados.filter((voo) =>
        voo.numero.startsWith(primeirosCincoDigitos)
      );
      if (planos.length > 0) {
        console.log(
          `Planos de Voo com os primeiros 5 dígitos ${primeirosCincoDigitos}:`
        );
        planos.forEach((plano) => {
          console.log(`Número: ${plano.numero}`);
          console.log(`Origem: ${plano.origem}`);
          console.log(`Destino: ${plano.destino}`);
          console.log(`Horário: ${plano.horario}`);
          console.log(`Aerovia: ${plano.aerovia}`);
          console.log(`Altitude: ${plano.altitude}`);
          console.log(`Piloto: ${plano.piloto.nome}`);
          console.log(`Modelo da Aeronave: ${plano.aeronave.modelo}`);
          console.log("-----------------------------------------");
        });
      } else {
        console.log(
          `Nenhum Plano de Voo encontrado com os primeiros 5 dígitos ${primeirosCincoDigitos}.`
        );
      }
      showMenu(); // Exibe o menu novamente
    }
  );
}

// Função para lidar com a escolha do usuário
function handleChoice(choice) {
  switch (choice) {
    case "1":
      console.log("\nVoos Disponíveis:");
      voosDisponiveis.forEach(exibirDetalhesVoo);
      showMenu();
      break;
    case "2":
      console.log(
        "\nVerificar Altitudes Livres em uma Aerovia em um Determinado Horário:"
      );
      rl.question("Digite a aerovia: ", (aerovia) => {
        rl.question("Digite o horário (formato HH:MM): ", (horario) => {
          altitudesLivres(aerovia, horario);
        });
      });
      break;
    case "3":
      console.log("\nSubmeter Plano de Voo:");
      rl.question("Origem: ", (origem) => {
        rl.question("Destino: ", (destino) => {
          rl.question("Horário (formato HH:MM): ", (horario) => {
            rl.question("Aerovia: ", (aerovia) => {
              rl.question("Altitude: ", (altitude) => {
                rl.question("ID do Piloto: ", (pilotoId) => {
                  rl.question("Modelo da Aeronave: ", (modeloAeronave) => {
                    const piloto = pilotos.find(
                      (p) => p.id === parseInt(pilotoId)
                    );
                    const aeronave = aeronaves.find(
                      (a) => a.modelo === modeloAeronave
                    );
                    if (piloto && aeronave) {
                      submeterPlanoVoo(
                        origem,
                        destino,
                        horario,
                        aerovia,
                        altitude,
                        piloto,
                        aeronave
                      );
                    } else {
                      console.log("Piloto ou aeronave não encontrados.");
                      showMenu();
                    }
                  });
                });
              });
            });
          });
        });
      });
      break;
    case "4":
      listarPlanoPorNumero();
      break;
    case "5":
      rl.question("Digite a data (formato DD/MM/AAAA): ", (data) => {
        listarPlanosPorData(data);
      });
      break;
    case "6":
      console.log("Listar Ocupação de uma Aerovia em uma determinada Data:");
      rl.question("Digite a aerovia: ", (aerovia) => {
        rl.question("Digite a data (formato DD/MM/AAAA): ", (data) => {
          verificarOcupacaoAeroviaData(aerovia, data);
        });
      });
      break;
    case "7":
      rl.question(
        "Digite o número do Plano de Voo a ser cancelado: ",
        (numeroPlano) => {
          cancelarPlano(numeroPlano);
        }
      );
      break;
    case "8":
      console.log("Encerrando o sistema...");
      rl.close();
      break;
    default:
      console.log("Opção inválida. Por favor, escolha uma opção válida.");
      showMenu();
  }
}

// Iniciar o sistema
console.log("Bem-vindo ao Sistema de Gerenciamento de Voos.");
showMenu();
