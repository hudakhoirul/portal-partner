#!/usr/bin/env node

let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs') //fs already comes included with node.

let templates = require('./templates.js')
let templatesList = require('./template-list.js')
let templatesForm = require('./template-form.js')

let appDirectory = `${process.cwd()}`
appDirectory = appDirectory.substring(0, appDirectory.length - 10);
let configFile = process.argv[2]

let suffixName = {
    'createRoutingModule' : 'routing-module.ts',
    'createInterface' : 'interface.ts',
    'createModule' : 'module.ts',
    'createService' : 'service.ts',
}

let suffixComponentName = {
    'createHtml' : 'component.html',
    'createComponent' : 'component.ts',
    'createScss' : 'component.scss',
}

if(configFile){
    src = shell.cat(configFile)
    jsonsrc = JSON.parse(src.stdout)
}

const createFolder = (names) => {
    return new Promise(resolve=>{
        console.log("\nCreating folder page".cyan)
        shell.exec(`cd .. && cd src/app/main && mkdir ${names.kebabCase}`, () => {
            console.log("Finished creating folder page".green)
            resolve(true)
        })
    })    
}

const createTemplates = (names) => {
    return new Promise(resolve=>{
        console.log("\nCreating template page".cyan)
        let promises = []
        Object.keys(templates).forEach((fileName, i)=>{
            promises[i] = new Promise(res=>{
                fs.writeFile(`${appDirectory}/src/app/main/${names.kebabCase}/${names.kebabCase}.${suffixName[fileName]}`, templates[fileName](names), function(err) {
                    if(err) { return console.log(err) }
                    res(true)
                })
            })
        })
        Promise.all(promises).then(()=>{resolve(true)})
    })
}

const createListComponent = (names, config) => {
    return new Promise(resolve=>{
        let promises = []
        
        shell.exec(`cd ${appDirectory}/src/app/main/${names.kebabCase}/ && mkdir ${names.kebabCase}-list`, () => {
            console.log("Finished creating folder template page".green)
        })
        
        Object.keys(templatesList).forEach((fileName, i)=>{
            promises[i] = new Promise(res=>{
                fs.writeFile(`${appDirectory}/src/app/main/${names.kebabCase}/${names.kebabCase}-list/${names.kebabCase}-list.${suffixComponentName[fileName]}`, templatesList[fileName](names), function(err) {
                    if(err) { return console.log(err) }
                    res(true)
                })
            })
        })
        Promise.all(promises).then(()=>{resolve(true)})
    })
}

const createFormComponent = (names, config) => {
    return new Promise(resolve=>{
        let promises = []
        
        shell.exec(`cd ${appDirectory}/src/app/main/${names.kebabCase}/ && mkdir ${names.kebabCase}-form`, () => {
            console.log("Finished creating folder template page".green)
        })
        
        Object.keys(templatesForm).forEach((fileName, i)=>{
            promises[i] = new Promise(res=>{
                fs.writeFile(`${appDirectory}/src/app/main/${names.kebabCase}/${names.kebabCase}-form/${names.kebabCase}-form.${suffixComponentName[fileName]}`, templatesForm[fileName](names), function(err) {
                    if(err) { return console.log(err) }
                    res(true)
                })
            })
        })
        Promise.all(promises).then(()=>{resolve(true)})
    })
}

const run = async (jsonsrc) => {
    names = {
        camelCase : '',
        pascalCase : '',
        kebabCase : jsonsrc.pageName
    }
    jsonsrc.pageName.split("-").map((n, i) => {
        if(i===0){
            names.camelCase += n
        }else{
            names.camelCase += n.charAt(0).toUpperCase() + n.substr(1).toLowerCase()
        }
        names.pascalCase += n.charAt(0).toUpperCase() + n.substr(1).toLowerCase()
    })

    let handleCreateFolder = await createFolder(names)
    if(!handleCreateFolder){
        console.log('Something went wrong while creating folder page'.red)
        return false;
    }

    let handleCreateTemplates = await createTemplates(names)
    console.log('handleCreateTemplates ', handleCreateTemplates)
    if(!handleCreateTemplates){
        console.log('Something went wrong while creating template'.red)
        return false;
    }

    let handleCreateListComponent = await createListComponent(names, jsonsrc)
    if(!handleCreateListComponent){
        console.log('Something went wrong while creating list component'.red)
        return false;
    }

    let handleCreateFormComponent = await createFormComponent(names, jsonsrc)
    if(!handleCreateFormComponent){
        console.log('Something went wrong while creating form component'.red)
        return false;
    }
    
}




if(configFile){
    run(jsonsrc)
}