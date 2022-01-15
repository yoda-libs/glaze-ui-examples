#!/usr/bin/env node

const { existsSync, mkdirSync, readdirSync, lstatSync, writeFileSync, readFileSync, unlinkSync } = require('fs');
const path = require('path');


const ensureFolderExists = (source) => {
    if (!existsSync(source))
    mkdirSync(source);
};

const deleteAllFiles = (source) => {
    const files = readdirSync(source);
    for (const file of files) {
        unlinkSync(path.join(source, file));
    }
};

const distFolder = `${process.cwd()}/dist`;
ensureFolderExists(distFolder);
deleteAllFiles(distFolder);

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

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    ensureFolderExists( targetFolder );

    // Copy
    if ( lstatSync( source ).isDirectory() ) {
        files = readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
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


const packages = getDirectories(`${process.cwd()}/packages`);
for(let package of packages) {
    const packageDist = `${process.cwd()}/packages/${package}/dist`;
    if (!existsSync(packageDist))
        throw new Error(`${packageDist} does not exist. Run 'npm run build' in ${package}`);

    copyFolderRecursiveSync(packageDist, process.cwd());
}