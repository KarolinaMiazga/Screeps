var spawning = require('spawning');
var roles = require('roles');

module.exports.loop = function () {
    let creep = Game.creeps['HARVESTER2'];
    let spawner = Game.spawns['Spawn1'];
    let sources = spawner.room.find(FIND_SOURCES);
    let src = sources[0];
    
    if (spawner.room.find(FIND_CREEPS).length < 6) {
        roles.makeCreep(spawner);
    };


    for (let name in Game.creeps) {
        creep = Game.creeps[name];
        roles.roleHarvester(creep, spawner, src);
    }


};