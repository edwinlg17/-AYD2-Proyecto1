describe('registrar usuario controller', () => {
    const mockResolve = jest.fn();
    const mockDirname = jest.fn();
    jest.mock('path', () => {
        return {
            resolve: mockResolve,
            dirname: mockDirname,
        };
    });

    jest.mock('../../dataBase/index');

    jest.mock('aes-encryption', () => {
        return function () {
            return { AesEncryption: () => {} };
        };
    });

    jest.mock('../../dataBase/connection', () => {
        return function () {
            return { sequelize: () => {} };
        };
    });

    process.env.NODE_ENV = 'dev';
    jest.resetModules();
    const registrarUsuario = require('../../controller/registrarUsuario.controller');

    it('uso de path', () => {
        registrarUsuario;
        expect(mockResolve).toHaveBeenCalled();
        expect(mockDirname).toHaveBeenCalled();
    });
});
