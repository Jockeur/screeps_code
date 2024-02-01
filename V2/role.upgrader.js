var role = {
    /** @param {Creep} creep */
   run: function(creep) {
       if(creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
           creep.memory.working = true;
       } else if (creep.store.energy == 0 && creep.memory.working) {
           creep.memory.working = false;
       }

       if (!creep.memory.working) {
           sources = creep.room.find(FIND_SOURCES_ACTIVE);
           if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
               creep.moveTo(sources[1])
           }
       } else {
           if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
               creep.moveTo(creep.room.controller);
           }
       }
   }
};

module.exports = role;