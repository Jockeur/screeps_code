StructureLink.prototype.transfer =
    function () {
        const room = this.room.name
        var memory = Memory.rooms[room].structures.links[this.id]
        const targets = memory.targets
        var length = targets.length
        var linkTo;
        for(target of targets) {
            var linkTo = Game.getObjectById(target);
            this.transferEnergy(linkTo, this.store.energy/length);
        }
    }