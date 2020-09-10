module.exports = {
    'createHtml': (names, params = {}) => {
        return require('./new-page-template/new-page-list/new-page-list.component.html.js')(names, params)
    },
    'createComponent': (names, params = {}) => {
        return require('./new-page-template/new-page-list/new-page-list.component.js')(names, params)
    },
    'createScss': (names, params = {}) => {
        return require('./new-page-template/new-page-list/new-page-list.component.scss.js')(names, params)
    },
}