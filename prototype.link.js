StructureLink.prototype.transfer =
    function () {
        const room = this.room.name
        var memory = Memory.rooms[room].structures.links[this.id]
        const targetId = memory.targetId
        var linkTo = Game.getObjectById(targetId)
        this.transferEnergy(linkTo)
    }