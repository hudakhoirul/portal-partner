module.exports = function(names, params) {
    return `
        export interface ${names.pascalCase}Interface {
            acknowledge: boolean;
            data: ${names.pascalCase}DataInterface[];
            total: number;
        }

        export interface ${names.pascalCase}DataInterface {
            containerType: string;
            containerDesc: string;
            size: number;
        }
    `
}