interface Observer {
    update(message: string): void;
}

class Establishment implements Observer {
    update(message: string): void {
        console.log(`Nuevo pedido: ${message}`);
        // Lógica para procesar el nuevo pedido
    }
}

class OrderSubject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    notifyObservers(message: string): void {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}
