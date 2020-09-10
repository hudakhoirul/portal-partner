module.exports = {
    'createHtml': (names, params = {}) => {
        return require('./new-page-template/new-page-form/new-page-form.component.html.js')(names, params)
    },
    'createComponent': (names, params = {}) => {
        return require('./new-page-template/new-page-form/new-page-form.component.js')(names, params)
    },
    'createScss': (names, params = {}) => {
        return require('./new-page-template/new-page-form/new-page-form.component.scss.js')(names, params)
    },
}