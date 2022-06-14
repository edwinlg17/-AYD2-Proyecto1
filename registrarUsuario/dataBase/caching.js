const path = require('path');
require('dotenv').config({
    path: path.resolve(path.dirname(__dirname), process.env.NODE_ENV + '.env'),
});
const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = process.env;

module.exports = class CacheService {
    constructor() {
        this.redisHost = REDIS_HOST;
        this.redisPort = REDIS_PORT;
        this.redisClient = redis.createClient({
            url: `redis://${this.redisHost}:${this.redisPort}`,
        });
        this.redisClient.connect();
    }

    async get(id) {
        try {
            const value = await this.redisClient.get(id);
            global.log.debug({ data: JSON.parse(value) });

            return value ? JSON.parse(value) : null;
        } catch (err) {
            global.log.error({
                err,
                mensaje: `Error al obtener llave, el id: ${id} no existe en redis`,
            });
        }
    }

    async store(id, data) {
        try {
            //let datas = data[0].toJSON();
            await this.redisClient.set(id, JSON.stringify(data));
            //await this.redisClient.hSet()
        } catch (err) {
            global.log.error(
                `Error al guardar información en redis: ${data[0].toJSON()}, error: ${err}`
            );
        }
    }

    async remove(id) {
        try {
            await this.redisClient.del(id);
        } catch (err) {
            global.log.error({
                err,
                mensaje: `Error al obtener llave, el id: ${id} no existe en redis`,
            });
        }
    }
};
