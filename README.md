# Repositorio Base - Microservicios

Qué tal compañeros del Grupo 14 del curso de AYD2 sección N Vacaciones de Junio 2022, les comparto este repositorio para tenerlo como base para los diferentes microservicios que se deben realizar. 

A continuación les listaré las configuraciones que se realizaron y las que faltan por realizar:

+ Se creo la siguiente estrctura de carpetas: 

    ```shell
    nombre_microservicio
    | 
    |__controller
    |
    |__logger
    |  |
    |  |__logger.js
    |  
    |__middleware
    |  |
    |  |__common.js
    |  |__index.js
    |
    |__index.js
    |__package-lock.json
    |__package.json
    ```

Donde: 

> # Carpetas

+ **nombre_microservicio:** es una carpeta que debe crearse para cada microservicio a realizar.
+ **controller:** en esta carpeta se crearan todas las rutas y funcionalidades del microservicio, todo archivo creado en esta carpeta deberá utilizar la convención Upper CamelCase (Esta carpeta deberá ser creada, ya que al no tener archivos no se sube al repositorio remoto).
+ **logger:** en esta carpeta se creran los logs configurados por Winston, ver el ejmplo del auxiliar.
+ **middleware:** en esta carpeta se configurar todo los middleware que se utilizarn en la aplicación.

> # Archivos

+ **logger.js:** El contenido de este archivo es el siguiente:
    ```javaScript=
    const winstone = require('winston'); //se requiere el paquete
    ```
    
    se deberá terminar la configuración para el microservicio en cuestion.
    
+ **common.js:** El contenido de este archivo es el siguiente:
    ```javaScript=
    const express = require('express');
    const morgan = require('morgan');
    const cors = require('cors');
    
    module.exports = (app) => {
        app.use(cors());
        app.use(morgan('common', {}));
        app.use(express.json());
    }
    ```
    aquí iran todos los middleware comunes en una aplicación, en este caso esta configurado el body-parser (express.json()), los cors para la conexión con nuestra api, y morgan para llevar un registro de las peticiones.
    
+ **middleware/index.js:** El contenido de este archivo es el siguiente:
    ```javaScript=
    const commonMiddleware = require('./common');
    
    const addMiddleware = (app) => {
        commonMiddleware(app);
    }
    
    module.exports = addMiddleware;
    ```

+ **index.js:** El contenido de este archivo es el siguiente:
    ```javaScript=
    const express = require('express');
    const middleware = require('./middleware');
    
    /*------------Middleware------------*/
    const createApp = () => {
        const app = express();
        middleware(app);
        
        return app;
    }
    
    const app = createApp();
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
    
    module.exports = createApp;
    ```

+ **package.json:** El contenido de este archivo es el siguiente:
    ```json=
    {
      "name": "repobase",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.1",
        "express-json-validator-middleware": "^3.0.1",
        "express-winston": "^4.2.0",
        "joi": "^17.6.0",
        "jsonwebtoken": "^8.5.1",
        "morgan": "^1.10.0",
        "mysql2": "^2.3.3",
        "redis": "^4.1.0",
        "sequelize": "^6.20.1",
        "swagger-jsdoc": "^6.2.1",
        "swagger-ui-express": "^4.4.0",
        "winston": "^3.7.2"
      },
      "devDependencies": {
        "eslint": "^8.17.0",
        "husky": "^8.0.1",
        "jest": "^28.1.0",
        "nodemon": "^2.0.16",
        "prettier": "2.6.2"
      }
    }
    ```

# Consideraciones

1. En el package.json podemos observar las dependencias y ver que todas las herramientas solicitadas estan instaladas, por lo que para su configuración ya no será necesario instalarlas nuevamente solo requerirlas.
2. En el apartado de las devDependencies podemos observar las herramientas solicitadas para la configuración mas general del repositorio así como nodemon.
3. Con respecto al nodemon, en el apartado de scripts se creo un nuevo script, llamado "start" que ejecutara el nodemon en el archivo index.js para facilidad de programación utilizar el comando npm start para programar la API.
4. Morgan esta configurado de forma estandar, por lo que se discutirá en el daily si utilizamos solamente esa configuración o se agregará más.

# Configuración Husky
1. Instalación en modo de desarrollo
```
npm i husky -D
```
2. Creo un script para pre configurar husky
```
npm set-script prepare "husky install"
npm run prepare
```
NOTA: si el repositorio cuenta con múltiples servicios se ingresa en la ruta de carpeta donde se encuentra la carpeta de .husky 
```
- my-monorepo/
   - server/
   - app/
```
```
npm set-script prepare-husky "cd .. && husky install app/.husky"
```
3. Se agrega el hook correspondiente pre-commit/pre-push
```
npx husky add .husky/pre-commit "npm test"
```
4. Se agrega la configuración del hook dependiendo del comportamiento deseado 
```
npm run format:check
npm run lint:check
```
# Configuración Prettier Eslint
1. Se instala en conjunto eslint y prettier como dependencias de desarrollo
```
npm install eslint eslint-config-prettier prettier --save-dev
```
2. Se configura eslint dependiendo de los requisitos del lenguaje
```
npx eslint --init
```
```
How would you like to use ESLint?
style
What type of modules does your project use?
commonjs
Which does your project use?
none
Does your project use TypeScript?
No
Where does your code run?
node
How would you like to define a style for your project?
guide
Which style guide do you want to follow?
google
What format do you want your config file to be in?
JSON
Checking peerDependencies of eslint-config-google@latest
The config that you've selected requires the following dependencies:
eslint-config-google@latest
Would you like to install then now?
Yes
Which package manager do you want to use?
npm
```
2. Configuración del archivo .eslintrc.json
```
{
    "root": true,
    "parserOptions": {
         "ecmaVersion": 12,
         "sourceType": "module"
    },
    "extends": ["eslint:recommended", "prettier"],
    "env": {
         "es2021": true,
         "node": true
    },
    "rules": {
         "no-console": "error"
    }
}
```
3. Configuración del archivo prettier si no existe créelo .prettierrc.json
```
{
"trailingComma": "es5",
"tabWidth": 4,
"semi": true,
"singleQuote": true
}
```
# Configuraciones scripts 
1. lint:fix corrige errores relacionados con la sintaxis del codigo 
```
"lint:fix": "eslint --fix ."
```
2. lint:check revisa la sintaxis del código 
```
"lint:check": "eslint ."
```
3. format:write corrige la indentación del código 
```
"format:write": "prettier --write ."
```
4. format:check revisa la indentación del código 
```
"format:check": "prettier --check ."
```
5. Referencia del estido de codificacion Airbnb

https://github.com/airbnb/javascript

# Configuracion Jest
1. Instalacion de jest y supertest
```
npm install jest supertest supertest --save-dev
```
2. configuracion pakage.json para jest
```
"test": "set NODE_OPTIONS=--experimental-vm-modules && jest",
```
```
"jest": {
    "collectCoverage": true,
    "coverageReporters": [
      "json",
      "html"
    ]
  }
```
