require('lodash');
let f = require('functions');

module.exports = {generateName, spawnWorker, spawnSmallWorker, controlWorkersPopulation, forgetDeadCreeps};

function generateName(role) {
    return role + Game.time;
};

function spawnWorker(spawner, roleName) {
    let result = spawnBigWorker(spawner, roleName);
    if (result == ERR_NOT_ENOUGH_ENERGY) {
        result = spawnSmallWorker(spawner, roleName);
    }
    if (result != -6) console.log('Spawning: ' + result);
};

function spawnSmallWorker(spawner, roleName) {
    let name = generateName(roleName);
    let result = spawner.spawnCreep([WORK,WORK,CARRY,MOVE], name, { memory: {role:roleName} });
    if(result == 0) {
        return name;
    }
    return result;
};

function spawnBigWorker(spawner, roleName) {
    let name = generateName('big' + roleName);
    let result = spawner.spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], name, { memory: {role:roleName} });
    if(result == 0) {
        return name;
    }
    return result;
};

function controlWorkersPopulation(role, spawner) {
    let numNeeded=0
    try {
        numNeeded = Memory.strategy.needed[role];
    }
    catch (err) {
        basicStrategy();
        numNeeded = Memory.strategy.needed[role];
    }
    let available = f.countCreeps(role);
    console.log(abailable);
    if (numNeeded > available) {
        return 'spawning ' + role + ' with result: ' + spawnWorker(spawner, role);
    }
}

function forgetDeadCreeps() {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Creep " + name + " is no more. Let's not waste memory for his name.");
        }
    }
}




//strategy functions:
function basicStrategy(){
    Memory.strategy = { 'needed': { 'harvester':5, 'builder':0 } };
}