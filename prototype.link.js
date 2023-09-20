StructureLink.prototype.transfer =
    function () {
        var state = this.memory.state
        if(state == 'transfer') {
            var targetId = this.memory.targetId
            var linkTo = Game.getObjectById(targetId)
            this.transferEnergy(linkTo)
        }
    }