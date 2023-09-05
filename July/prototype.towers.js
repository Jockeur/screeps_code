StructureTower.prototype.defend =
    function () {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            this.attack(target);
        }

        var heal = this.pos.findClosestByPath(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
        if (!target && heal) {
            this.heal(heal);
        }
    }