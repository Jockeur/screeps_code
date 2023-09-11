StructureTerminal.prototype.sell =
    function (mineralType) {

        var resource;

        switch (mineralType) {
            case RESOURCE_HYDROGEN: resource = RESOURCE_REDUCTANT;
            case RESOURCE_OXYGEN: resource = RESOURCE_OXIDANT;
            case RESOURCE_LEMERGIUM: resource = RESOURCE_LEMERGIUM_BAR;
        }

        if (spawn.room.terminal.store[RESOURCE_ENERGY] >= 2000 && spawn.room.terminal.store[resource] >= 2000) {
            var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                order.type == ORDER_BUY &&
                Game.market.calcTransactionCost(200, spawn.room.name, order.roomName) < 400);
            console.log(resource + ' buy orders found: ' + orders.length);
            orders.sort(function (a, b) { return b.price - a.price; });
            console.log('Best price: ' + orders[0].price);
            if (orders[0].price > 0.7) {
                var result = Game.market.deal(orders[0].id, 200, spawn.room.name);
                if (result == 0) {
                    console.log('Order completed successfully');
                }
            }
        }
    }