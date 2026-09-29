interface subscriber{
    (message: any): void;
}

class PubSub{

    private topics:{[key: string]: subscriber[]} = {};

    // método para se inscrever em um tópico ou criar um caso nao exista topico correspondente
    subscribe(topic: string, subscriber: subscriber): void{
        if(!this.topics[topic]){
            this.topics[topic] = [];
        }
        this.topics[topic].push(subscriber);
    }
    
    // método para se desinscrever de um tópico e deletar o tópico caso não haja mais assinantes. 
    unsubscribe(topic: string, subscriber: subscriber): void{
        if(!this.topics[topic]) return;
        this.topics[topic] = this.topics[topic].filter(sub => sub !== subscriber);
    }

    // método para publicar uma mensagem em um tópico, notificando todos os assinantes
    publish(topic: string, message: any): void{
        if(!this.topics[topic]) return;
        this.topics[topic].forEach(subscriber => subscriber(message));
    }


}

// exportando a classe PubSub para ser utilizada em outros arquivos
export default PubSub;
