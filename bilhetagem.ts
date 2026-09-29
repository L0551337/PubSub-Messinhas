import PubSub from "./PubSub.ts";

// definindo interface para eventos de bilheteagem
interface TicketingEvent {
  type: string;
  location: string;
  details: string;
}

// definindo interface para sistemas assinantes
interface Subscriber {
  id: number;
  name: string;
  notify(event: TicketingEvent): void;
}

// classe que representa o sistema de bilheteagem
class BasicSubscriber implements Subscriber {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

    // método para receber notificações de eventos de bilheteagem
    notify(event: TicketingEvent): void {
    console.log(
      `Notificação ${this.name}: ${event.type} em ${event.location} - ${event.details}`
    );
  }
}

// criando instância do PubSub
const pubSub = new PubSub();

// criando função para reportar eventos de bilheteagem
function reportTicketingEvent(event: TicketingEvent) {
  console.log("*".repeat(50));
  console.log(
    `Evento Reportado: ${event.type} em ${event.location} - ${event.details}`
  );
  console.log("*".repeat(50));
  pubSub.publish(event.type, event);
}


// criando instâncias dos sistemas assinantes e armazenando as funções de notificação vinculadas
const centroDeCobranca = new BasicSubscriber(1, "Sistema de Cobrança de Bilheteagem");
const paineisLotacao = new BasicSubscriber(2, "Sistema de Painéis de Lotação de Ônibus");
const appDeRota = new BasicSubscriber(3, "Sistema de Aplicativo de Rota de Ônibus");

const boundSystem1Notify = centroDeCobranca.notify.bind(centroDeCobranca);
const boundSystem2Notify = paineisLotacao.notify.bind(paineisLotacao);
const boundSystem3Notify = appDeRota.notify.bind(appDeRota);

// subscrevendo os sistemas aos eventos de bilheteagem


pubSub.subscribe("Pagamento", boundSystem1Notify);
pubSub.subscribe("Lotacao", boundSystem2Notify);
pubSub.subscribe("Onibus em Rota", boundSystem3Notify);


// Simulando a publicação 


reportTicketingEvent({
  type: "Lotacao",
  location: "Linha Azul",
  details: "Linha azul lotada. Passageiros aguardando na estação.",
});


reportTicketingEvent  ({
  type: "Pagamento",
  location: "Catraca estação central",
  details: "Pagamento realizado com sucesso na estação central.",
});


reportTicketingEvent({
  type: "Onibus em Rota",
  location: "Avenida Principal",
  details: "Onibus da linha 5 está em rota para a Avenida Principal.",
});

pubSub.unsubscribe("Pagamento", boundSystem1Notify);


reportTicketingEvent({
  type: "Pagamento",
  location: "Catraca estação central",
  details: "Pagamento realizado na estação central.",
});

