module.exports = {
    'createRoutingModule': (names, params = {}) => {
        return require('./new-page-template/new-page-routing.module.js')(names, params)
    },
    'createInterface': (names, params = {}) => {
        return require('./new-page-template/new-page.interface.js')(names, params)
    },
    'createModule': (names, params = {}) => {
        return require('./new-page-template/new-page.module.js')(names, params)
    },
    'createService': (names, params = {}) => {
        return require('./new-page-template/new-page.service.js')(names, params)
    },
}