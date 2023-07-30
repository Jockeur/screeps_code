module.exports = function () {
    StructureSpawn.prototype.spawnCustomCreep =
        function (energy, name, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.spawnCreep(body, name, { memory: { role: roleName, working: false } });
        };

    StructureSpawn.prototype.spawnLongDistanceCreep =
        function (energy, name, nbWorkParts, home, target, sourceIndex, role) {
            var body = [];
            for (let i = 0; i < nbWorkParts; i++) {
                body.push(WORK);
            }
            energy -= 150 * nbWorkParts;
            var nbParts = Math.floor(energy / 100)

            for (let i = 0; i < nbParts; i++) {
                body.push(CARRY);
            }

            for (let i = 0; i < nbParts + nbWorkParts; i++) {
                body.push(MOVE);
            }

            return this.spawnCreep(body, name, {
                memory:
                {
                    role: role,
                    home: home,
                    target: target,
                    working: false,
                    sourceIndex: sourceIndex
                }
            })
        };

    StructureSpawn.prototype.spawnAttacker =
        function (energy, name, role, target) {
            var body = [];
            var nbParts = Math.floor(energy / 280)
            for (let i = 0; i < nbParts; i++) {
                body.push(RANGED_ATTACK);
            }
            for (let i = 0; i < nbParts; i++) {
                body.push(ATTACK);
            }
            for (let i = 0; i < nbParts; i++) {
                body.push(MOVE);
            }
            
            return this.spawnCreep(body, name, {
                memory:
                {
                    role: role,
                    target: target
                }
            })
        };
};