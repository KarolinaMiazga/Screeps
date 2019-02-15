require('lodash');
module.exports = {countCreeps};

function countCreeps(roleName) {
    return _(Game.creeps).filter( { memory: { role: roleName } } ).size();
}