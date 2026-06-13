const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
    // Remove any leftover data
    await getKnex()(tables.afspraken).delete(); 
    await getKnex()(tables.user).delete(); 
    await getKnex()(tables.afspraken).delete();
    await getKnex()(tables.category).delete();

    await shutdownData(); 
};