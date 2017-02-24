/**
 * Set To Production
 * Created by Evandro Lira de Souza on 21/02/17.
 */
(function (window) {
    window.__env = window.__env || {};

    window.__env.expressHostname = 'http://localhost';
    window.__env.expressPort = '3000';
    window.__env.expressUrl = window.__env.expressHostname + ':'
        + window.__env.expressPort;

    window.__env.db = 'mongodb://localhost:27017/zup';

    window.__env.enableDebug = true;
}(this));

