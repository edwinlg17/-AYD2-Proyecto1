describe('Logger', () => {
    const mockInfo = jest.fn();
    const mockAdd = jest.fn();

    const loadLogger = (env) => {
        process.env.NODE_ENV = env || 'dev';
        jest.resetModules();
        require('../logger');
    };

    jest.mock('winston', () => {
        const mFormat = {
            colorize: jest.fn(),
            combine: jest.fn(),
            simple: jest.fn(),
            json: jest.fn(),
            print: jest.fn(),
            timestamp: jest.fn(),
        };

        const mTrasports = {
            Console: jest.fn(),
            File: jest.fn(),
        };

        return {
            format: mFormat,
            transports: mTrasports,
            createLogger: jest.fn().mockReturnValue({
                add: mockAdd,
                info: mockInfo,
            }),
        };
    });

    loadLogger();

    it('uso global.log con info', () => {
        global.log.info('hola mundo');
        expect(mockInfo).toHaveBeenCalled();
        expect(mockInfo).toHaveBeenCalledWith('hola mundo');
    });

    it('uso winston.logger.add para la consola transport con NODE_ENV != prod', () => {
        expect(mockAdd).toHaveBeenCalled();
    });

    it('uso logger.add para la Console transport con NODE_ENV == prod', () => {
        mockAdd.mockClear();
        loadLogger('prod');
        expect(mockAdd).not.toHaveBeenCalled();
    });
});
