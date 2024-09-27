interface ShippingStrategy {
    calculateCost(): number;
}

class StandardShipping implements ShippingStrategy {
    calculateCost(): number {
        return 5; // Implementación del cálculo para el envío estándar
    }
}

class ExpressShipping implements ShippingStrategy {
    calculateCost(): number {
        return 10; // Implementación del cálculo para el envío express
    }
}

class Order {
    private shippingStrategy: ShippingStrategy;

    constructor(shippingStrategy: ShippingStrategy) {
        this.shippingStrategy = shippingStrategy;
    }

    calculateShippingCost(): number {
        return this.shippingStrategy.calculateCost();
    }
}
