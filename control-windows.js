/**
 * on crée une fonction `AssistantControlWindows`
 * @param {Object} configuration L'objet `configuration` qui vient du fichier configuration.json
 */
var AssistantControlWindows = function(configuration) {
  // par exemple configuration.key si on a `{ "key": "XXX" }` dans le fichier configuration.json
  // exemple: this.key = configuration.key;
}

/**
 * Il faut ensuite créer une fonction `init()`
 *
 * @param  {Object} plugins Un objet représentant les autres plugins chargés
 * @return {Promise}
 */
AssistantControlWindows.prototype.init = function(plugins) {
  this.plugins = plugins;
  // si une configuration est requise (en reprenant l'exemple de "key") :
  // if (!this.key) return Promise.reject("[assistant-control-windows] Erreur : vous devez configurer ce plugin !");
  return Promise.resolve(this);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} commande La commande envoyée depuis IFTTT par Pushbullet
 * @return {Promise}
 */
AssistantControlWindows.prototype.action = function(commande) {
  // on regarde le premier mot clé
  var action = commande.split(' ')[0];
  var params = commande.split(' ').slice(1).join(' ');
  var _this = this;
  return new Promise(function(prom_res, prom_rej) {
    switch(action) {
      case 'volume': // on fixe un volume précis, en %
      case 'volume_down': // si on souhaite baisser le son de X %
      case 'volume_up': { // si on souhaite augmenter le son de X %
        // 100% = 65535
        // on doit fournir le % du volume souhaitée
        var volume = params.replace(/%/,"").trim() *  65535 / 100;
        if (action === 'volume_down') volume *= -1;
        _this.nircmd((action==='volume' ? 'setsysvolume' : 'changesysvolume') + ' '+volume)
        .then(function() {
          console.log("[assistant-control-windows] Changement du volume de Windows.");
          prom_res();
        })
        break;
      };
      case 'mute':
      case 'unmute': { // pour couper/remettre le son
        _this.nircmd('mutesysvolume '+ ('mute'?1:0))
        .then(function() {
          console.log("[assistant-control-windows] " + (action==='mute' ? "On coupe le son" : "On remet le son")+" de Windows.");
          prom_res();
        })
        break;
      };
      case 'key': { // si on veut envoyer une touche clavier
        _this.nircmd('sendkeypress '+params)
        .then(function() {
          console.log("[assistant-control-windows] Envoie de la touche '"+params+"' à Windows.");
          prom_res();
        })
        break;
      };
      case 'shutdown': { // pour arrêter l'ordinateur
        _this.nircmd('exitwin poweroff')
        .then(function() {
          console.log("[assistant-control-windows] On arrête Windows.");
          prom_res();
        });
        break;
      };
      case 'cmd': { // pour executer une autre commande de nircmd
        _this.nircmd(params)
        .then(function() {
          console.log("[assistant-control-windows] On execute '"+params+"'");
          prom_res();
        });
        break;
      }
    }
  })
};

AssistantControlWindows.prototype.nircmd = function(args) {
  var path = require('path');
  var exec = require('child_process').exec;
  var nircmd = path.join(__dirname,'bin/nircmd.exe');
  return new Promise(function(prom_res) {
    exec(nircmd+ ' ' +args, {windowsHide:true}, function(error, stdout, stderr) {
      if (error) console.log("[assistant-control-windows] Erreur détectée : ",error);
      if (stderr) console.log("[assistant-control-windows] Message d'erreur reçue : ",error);
      prom_res();
    })
  })
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init=function(configuration, plugins) {
  return new AssistantControlWindows(configuration).init(plugins)
  .then(function(resource) {
    console.log("[assistant-control-windows] Plugin chargé et prêt.");
    return resource;
  })
}
