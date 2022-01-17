#!/usr/bin/env node

const { existsSync, mkdirSync, rmdirSync, readdirSync, lstatSync, writeFileSync, readFileSync, unlinkSync } = require('fs');
const path = require('path');

const {execSync} = require('child_process');

const runCommand = command => {
    execSync(`${command}`, {stdio: 'inherit'});
}


const ensureFolderExists = (source) => {
    if (!existsSync(source))
    mkdirSync(source);
};



const deleteAllFiles = (source) => {
    rmdirSync(source, { recursive: true });
};

const cleanUpFolder = source => {
    deleteAllFiles(source);
    ensureFolderExists(source);
}

const distFolder = `${process.cwd()}/dist`;
deleteAllFiles(distFolder);
ensureFolderExists(distFolder);

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( existsSync( target ) ) {
        if ( lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    writeFileSync(targetFile, readFileSync(source));
}

function copyFilesRecursiveSync( source, target ) {
    var files = [];

    // Copy
    if ( lstatSync( source ).isDirectory() ) {
        files = readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( lstatSync( curSource ).isDirectory() ) {
                copyFilesRecursiveSync( curSource, target );
            } else {
                if (curSource.endsWith('.LICENSE.txt')) return;
                copyFileSync( curSource, target );
            }
        } );
    }
}

const getDirectories = (source) => {
    const files = readdirSync(source, { withFileTypes: true });
    return files
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
};




// build all example projects
const examples = getDirectories(`${process.cwd()}/examples`);
for(let example of examples) {
    const bootstrapCommand = `cd ${process.cwd()}/examples/${example} && node_modules/.bin/lerna exec npm install`;
    const buildCommand = `cd ${examples}/${example} && node_modules/.bin/lerna exec npm run build`;

    console.log('Installing packages in', example);
    runCommand(bootstrapCommand);
    console.log('Building packages in', example);
    runCommand(buildCommand);

    cleanUpFolder(`${process.cwd()}/examples/${example}/dist`);
    const exampleDistFolder = `${process.cwd()}/examples/${example}/dist`;
    const packages = getDirectories(`${process.cwd()}/examples/${example}/packages`);
    for(let package of packages) {
        const packageDist = `${process.cwd()}/examples/${example}/packages/${package}/dist`;
        const packagePublic = `${process.cwd()}/examples/${example}/packages/${package}/public`;
        if (!existsSync(packageDist))
            throw new Error(`${packageDist} does not exist. Run 'npm run build' in ${package}`);

        if (existsSync(packagePublic))
            copyFilesRecursiveSync(packagePublic, packageDist);
        copyFilesRecursiveSync(packageDist, exampleDistFolder);
        // cleanUpFolder(packageDist)
    }

    // copy dist folder to main dist folder
    const exampleDist = `${process.cwd()}/examples/${example}/dist`;
    const targetFolder = `${distFolder}/${example}`;
    ensureFolderExists(targetFolder);
    copyFilesRecursiveSync(exampleDist, targetFolder);
    deleteAllFiles(exampleDist);
}

