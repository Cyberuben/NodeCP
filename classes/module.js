'use strict';

/*

WORK IN PROGRESS

Each module has it's own files and folders.
This class is for an INSTANCE of a module.
Every INSTANCE has its own docker instance, containing whatever is defined in the installation.
When loading each module, a Module object is created using the variables in config.json

Module MUST export:

NAME: TYPE [ (PARAMS) -> (RETURNS) ]

start: function () -> (number code)
stop: function () -> (number code)
install: function () -> (number code)
Settings: object

*/
var Modules={}

var Module = function Module (id,mdl) {
    // If a module with this ID has already loaded, then we use that instead. In this case the module parameter is optional.
    if (Modules[id]) {
      return Modules[id];
    }

    // The module was not yet initialized, create an Object for it and check whether it's set up
    this.id = id;

    // Require the module
    var info=require(mdl);

    this.name = mdl.name;
    this.version = mdl.version;
    this.doStart = mdl.start;
    this.doStop = mdl.stop;
    this.doInstall = mdl.install;
    this.Settings = mdl.DefaultSettings;

    // Load the settings, then allow the user to click "Install" or automatically "Start" depending on whether the Module with this ID is installed or not.


    // Add ourself to the Modules Object
    Modules[id] = this;
};


Module.prototype.start = function(){
  console.log("Starting " + this.name + "@" + this.version + "...");

  this.doStart();

  console.log("Success!");
};

Module.prototype.stop = function(){
  console.log("Stopping " + this.name + "@" + this.version + "...");

  this.doStop();

  console.log("Success!");
};

Module.prototype.install = function(){
  /*
  use docker lib

  if image exists then
    throw error OR void installation

  create image
  setup LXC

  this.setup(image)
  this.start()
  */
};

module.exports = exports = Module;
