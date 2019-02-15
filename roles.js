module.exports = { goStore, goHarvest, roleHarvester, makeCreep };


function goHarvest (creep,src) {
    if (creep.harvest(src) == ERR_NOT_IN_RANGE) {
        creep.moveTo(src);
    }
}

function goStore (creep, spawner) {
    if (creep.transfer(spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawner);
    }
};

function roleHarvester (creep, spawner, src) {
    if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
        goStore(creep, spawner);
    } else {
        goHarvest(creep, src);
    };
};

function makeCreep (spawner) {
    if (spawner.energy == spawner.energyCapacity) {
        spawner.spawnCreep([WORK, CARRY, MOVE, MOVE], 'harvester' +Game.time);
    }
}


