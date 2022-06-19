const Cache = require('./caching');

module.exports = class DbRepo {
    constructor() {
        this.cache = new Cache();
    }

    async save(id, datos) {
        try {
            await this.cache.store(id, datos);
            return { guardado: true };
        } catch (err) {
            global.log.error({
                error: err,
                mensaje: `Error al guardar datos desde la DB ${datos}`,
            });

            return { guardado: false };
        }
    }

    async get(id) {
        //Implementar el get aquí

        const valorCache = await this.cache.get(id);

        if (valorCache) {
            global.log.debug(`Datos desde redis: ${valorCache}`);
            return valorCache;
        }

        global.log.info(`El id: ${id} todavía no existe en redis`);

        return null;
    }

    async update(id) {
        this.cache.remove(id);
    }
};
