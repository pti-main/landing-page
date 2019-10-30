var fs = require('fs');
require('colors');

try{
    var data = fs.readFileSync('config.json','utf8');
}catch(e){}

class Config{
    constructor(){
        let config;
        data ? config = JSON.parse(data) : config = undefined;
        // Default path
        this.path = "./src/components";
        if(config && config.path != undefined){
            if(typeof config.path == "string"){
                if(fs.existsSync(config.path)){
                    this.path = config.path;
                }else{
                    throw `This path: ${config.path} doesn't exists`.red.bold;
                }
            }else{
                throw "Invalid path. Please input string in your config.json file.".red.bold;
            }
        }
        this.srcs = getAllDirectories(this.path);

        if(this.srcs.length == 0){
            throw `There's not a single source in that path: ${this.path.green} `.red + `(that's default path)`.yellow + `
If you want use your own path just add path parameter to config.json file.`.red + `
Example:`.blue + ` "`.magenta + `path`.green + `"`.magenta + `: "`.magenta + `./src/components`.green + `"`.magenta + `  `.green + `(IMPORTANT to do it without "/" on the end)`.yellow;
        }else if(this.srcs.length == 0){
            throw `There's no directories in path: ${this.path.green}`.red;
        }

        if(config && config.src != undefined){
            if(typeof config.src == "number"){
                if(config.src <= this.srcs.length-1 && config.src >= 0){
                    this.src = this.srcs[config.src];
                }else{
                    throw `There's no directory with id:`.red + ` ${config.src.toString().green} `+`on path: `.blue + `${this.path.green}`.red;
                }
            }else if(typeof config.src == "object"){
                let sources = config.src.filter(srcs => srcs > this.srcs.length-1 || srcs < 0);
                if(sources.length == 1){
                    throw `There's no directory with id:`.red + ` [${sources}]`.green +` on path: `.red + `${this.path.green}`+`
Correct your srcs in config.json.`.yellow;
                }else if(sources.length > 0){
                    throw `There's no directories with ids:`.red +` [${sources}]`.green +` on path: `.red + `${this.path.green}`+`
Correct your srcs in config.json.`.yellow;
                }
                
                for(let i = 0;i<config.src.length;i++){
                    sources[i] = this.srcs[config.src[i]];
                }
                this.src = sources;
            }else{
                throw "Invalid src. Please input a number or array of numbers in your config.json file.".red;
            }


        }else{
            this.src = this.srcs;
        }
    }

    getDirectory(){
        let dirs = [];
        for(let i = 0;i<this.src.length;i++){
            dirs[i] = `${this.path}/${this.src[i]}/scss/**/*.scss`;
        }
        return dirs;
    }
}

module.exports = Config;

function getAllDirectories(path){
    var directories = [];
    directories = fs.readdirSync(path);
    for(let i = 0;i<directories.length;i++){
        var ele = directories[i];
        if(!fs.lstatSync(`${path}/${ele}`).isDirectory()){
            directories[i] = "";
        }
    }
    directories = directories.filter(val => val != '');
    
    return directories;
}