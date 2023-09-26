StructureLink.prototype.transfer =
    function () {
        const room = this.room.name
        var memory = Memory.rooms[room].structures.links[this.id]
        const targets = memory.targets
        var linkTo;
        for (let target of targets) {
            var linkTo = Game.getObjectById(target);
            if (linkTo.store.energy == 799) {
                
            } else {
                this.transferEnergy(linkTo);
            }
        }
    }