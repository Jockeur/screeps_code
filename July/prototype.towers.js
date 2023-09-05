StructureTower.prototype.defend =
    function () {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            tower.attack(target);
        }

        var heal = tower.pos.findClosestByPath(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
        if (!target && heal) {
            tower.heal(heal);
        }
    }