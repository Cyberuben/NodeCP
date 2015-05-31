var os = require("os");
var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

/**
 * Represents an Nginx instance
 * @param {string} [executablePath] - Optional path to an nginx executable.
 * @constructor
*/
function Nginx(executablePath) {
	this.executablePath = executablePath;
}

// Private functions

/**
 * Retrieves the Nginx executable path and validates it, for use in internal class functions
 * @param {function} callback - Called with one argument; A function with the validated Nginx path as the first argument.
*/
Nginx.prototype.getExecutable = function GetExecutable(callback) {
	/**
	 * Checks if node is allowed to execute a given file
	 * @param {string} path - Path to the file to check
	 * @param {function} callback - Called with one argument; either an instance of Error() or null. File exists and is executable if null.
	*/
	function CheckExecuteAllowed(path, callback) {
		fs.stat(path, (function (err, stats) {
			if(err) {
				if(err.errno == -4058) {
					var error = new Error("File does not exist.");
					error.code = 1;
				} else {
					throw err;
				}
			} else if((stats.mode & 00007).toString(8) < 1) {
				var error = new Error("File is not executable.");
				error.code = 2;
			}

			callback(error || null);
		}).bind(this));
	}

	if(typeof this.executablePath == "undefined") {
		// Executable path was not provided to the class, attempt to detect it in PATH.
		switch(os.platform()) {
			case "win32": 
				exec("where nginx", (function (err, stdout, stderr) {
					if(err) {
						if(stderr == "INFO: Could not find files for the given pattern(s).\r\n") {
							throw new Error("Could not find nginx in PATH.");
						} else {
							throw err;
						}
					}
					
					var returnedPath = stdout.replace("\r\n", "");
					CheckExecuteAllowed(returnedPath, function (err) {
						if(err) throw err;

						callback(returnedPath);
					});
				}).bind(this));
			break;

			default:
				exec("which nginx", (function (err, stdout, stderr) {
					if(err) {
						if(err.code == 1) {
							throw new Error("Could not find nginx in PATH.");
						} else {
							throw err;
						}
					}
					
					var returnedPath = stdout.replace("\n", "");
					CheckExecuteAllowed(returnedPath, function (err) {
						if(err) throw err;

						callback(returnedPath);
					});
				}).bind(this));
			break;
		}
	} else {
		// Executable path was provided to the class.
		CheckExecuteAllowed(this.executablePath, function (err) {
			if(err) throw err;

			callback(this.executablePath);
		});
	}
}

// Control functions

/**
 * Starts Nginx if it's not already running
 * @param {function} callback - A function that runs when the function completes
*/
Nginx.prototype.start = function NginxControlStart(callback) {
	this.getExecutable(function (executable) {
		exec(executable, ["-s", "start"], callback);
	});
}

/**
 * Stops Nginx if it's running
 * @param {function} callback - A function that runs when the function completes
*/
Nginx.prototype.stop = function NginxControlStop(callback) {
	this.getExecutable(function (executable) {
		exec(executable, ["-s", "stop"], callback);
	});
}

/**
 * Restarts Nginx if it's running, starts it if it's not running
 * @param {function} callback - A function that runs when the function completes
*/
Nginx.prototype.restart = function NginxControlRestart(callback) {

}

/**
 * Reloads all Nginx config files if it's running
 * @param {function} callback - A function that runs when the function completes
*/
Nginx.prototype.reload = function NginxControlReload(callback) {
	this.getExecutable(function (executable) {
		exec(executable, ["-s", "reload"], callback);
	});
}

// Config functions

/**
 * Checks if a config file exists
 * @param {string} name - Name of the config file to check
*/
Nginx.prototype.configExists = function NginxConfigExists(name) {

}

/**
 * Creates a config file if it doesn't already exist
 * @param {string} name - Name of the config file to create
*/
Nginx.prototype.createConfig = function NginxConfigCreate(name) {

}

/**
 * Updates a config file
 * @param {string} name - Name of the config file to update
*/
Nginx.prototype.updateConfig = function NginxConfigUpdate(name) {
	
}

/**
 * Deletes a config file
 * @param {string} name - Name of the config file to delete
*/
Nginx.prototype.deleteConfig = function NginxConfigDelete(name) {
	
}

/**
 * Disables a config file if it's enable
 * @param {string} name - Name of the config file to disable
*/
Nginx.prototype.disableConfig = function NginxConfigDisable(name) {
	
}

/**
 * Enables a config file if it's disabled
 * @param {string} name - Name of the config file to enable
*/
Nginx.prototype.enableConfig = function NginxConfigEnable(name) {
	
}

module.exports = Nginx;
