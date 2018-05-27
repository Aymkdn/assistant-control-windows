var request = require('request-promise-native'); // si vous souhaitez faire des requêtes HTTP

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
  var exec = require('child_process').exec;
  var nircmd = './bin/nircmd.exe';
  return new Promise(function(prom_res, prom_rej) {
    switch(action) {
      case 'sound_down': // si on souhaite baisser le son
      case 'sound_up': { // si on souhaite augmenter le son
        // 100% = 65535
        // on doit fournir le % du volume souhaitée
        var volume = params.replace(/%/,"").trim() *  65535 / 100;
        exec(nircmd+ ' setsysvolume '+volume, {windowsHide:true}, function(error, stdout, stderr) {
          console.log("[assistant-control-windows] Lancement du programme : "+commande);
          prom_res();
        })
        break;
      };
      case 'key': { // si on veut envoyer une touche clavier
        exec(nircmd+ ' sendkey '+params, {windowsHide:true}, function(error, stdout, stderr) {
          console.log("[assistant-control-windows] Lancement du programme : "+commande);
          prom_res();
        })
        break;
      }
    }
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

/**
 * À noter qu'il est également possible de sauvegarder des informations supplémentaires dans le fichier configuration.json général
 * Pour cela on appellera this.plugins.assistant.saveConfig('nom-du-plugin', {configuration_en_json_complète}); (exemple dans le plugin freebox)
 */
