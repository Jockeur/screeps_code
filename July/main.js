require('prototype.spawn');
require('prototype.creeps');
require('prototype.towers')

var HOME;

module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];

        HOME = spawn.room.name;

        spawn.spawnCreepsIfNecessary();

        if (spawn.room.terminal && (Game.time % 10 == 0)) {
            if (spawn.room.terminal.store[RESOURCE_ENERGY] >= 2000 && spawn.room.terminal.store[RESOURCE_HYDROGEN] >= 2000) {
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_HYDROGEN &&
                    order.type == ORDER_BUY &&
                    Game.market.calcTransactionCost(200, spawn.room.name, order.roomName) < 400);
                console.log('Hydrogen buy orders found: ' + orders.length);
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
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.store.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
            creep.memory.working = true;
        }

        creep.runRole();
    }

}