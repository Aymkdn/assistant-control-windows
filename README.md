# assistant-control-windows

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet de contrôler l'ordinateur Windows sur lequel [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) est installé.

## Installation

Si vous n'avez pas installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), alors il faut le faire, et sélectionner **control-windows** comme plugin.

Si vous avez déjà installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), et que vous souhaitez ajouter ce plugin, alors :
  - Pour Windows, télécharger [`install_control-windows.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-control-windows/master/install_control-windows.bat&download=install_control-windows.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  - Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper :  
  `npm install assistant-control-windows@latest --save --loglevel error && npm run-script postinstall`

## Configuration

Aucune configuration requise.

## Utilisation

Il faut créer une applet IFTTT pour chacune des actions souhaitées. On va commencer par la template de base :

  1. Créer une nouvelle *applet* dans IFTTT : [https://ifttt.com/create](https://ifttt.com/create)  
  2. Cliquer sur **this** puis choisir **Google Assistant**  
  3. Choisir la carte **Say a simple phrase** (ou autre, selon votre cas)  
  4. Dans *« What do you want to say? »* mettre la phrase qui va déclencher l'action (par exemple : *baisse le volume du PC*, ou *ouvre le navigateur*, ou *ouvre le lecteur CD*, etc...)  
  5. Remplir les autres champs de la carte  
  6. Maintenant, cliquer sur **that** puis choisir **Pushbullet**  
  7. Choisir la carte **Push a Note**  
  8. Dans le champs *« Title »*, mettre `Assistant`  
  9. Dans le champs *« Message »*, mettre `control-windows_` suivi par une **commande spéciale** (voir plus bas)  
  10. Enregistrer puis cliquer sur **Finish**  
  11. Dites : « OK Google » suivi de la phrase fournie au point 4)  
  
Voici les actions possibles : 

  - **'volume X'** : cela va mettre le volume de l'ordinateur au niveau X % défini (exemple : `control-windows_volume 50` va mettre le volume à 50%)
  - **'volume_up X'** : cela va augmenter le volume de l'ordinateur de X % (exemple : `control-windows_volume_up 10` va augmenter le volume de 10%)
  - **'volume_down X'** : cela va baisser le volume de l'ordinateur de X % (exemple : `control-windows_volume_down 20` va baisser le volume de 20%)
  - **'mute'** : pour couper le son de l'ordinateur (exemple : `control-windows_mute`)
  - **'unmute'** : pour remettre le son de l'ordinateur (exemple : `control-windows_unmute`)
  - **'shutdown'** : cela va éteindre l'ordinateur (exemple : `control-windows_shutdown`)
  - **'key X'** : pour simuler une touche du clavier, avec X qui est l'une des touches suivantes :  
    - De `a` à `z`, de `0` à `9`
    - De `F1` à `F24` (pour les touches spéciales)
    - Les touches `shift`, `ctrl`, `alt`, `enter`, `esc`, `leftshift`, `rightshift`, `leftctrl`, `rightctrl`, `leftmenu`, `rightmenu`, `spc` (pour la touche espace), `down`, `up`, `left`, `right`, `home`, `end`, `insert`, `delete`, `plus`, `comma`, `minus`, `period`, `lwin`, `rwin` (pour la touche Windows), `apps`, `pageup`, `pagedown`, `tab`, `multiply`, `add`, `subtract`, `seperator`, `divide`, `backspace`, `pause`, `capslock`, `numlock`, `scroll`, `printscreen`  
  Par exemple pour mettre en pause une vidéo qui est lue en plein écran on utilise la barre d'espace ; du coup on pourra utiliser la commande `control-windows_key spc`  
  - **'cmd X'** : il est possible d'exécuter toutes les commandes fournies par [http://nircmd.nirsoft.net/](http://nircmd.nirsoft.net/)... Voici quelques exemples :  
    - Pour [verrouiller la session de Windows](http://nircmd.nirsoft.net/lockws.html) : `control-windows_cmd lockws`  
    - Pour [ouvrir le lecteur CD de l'ordinateur](http://nircmd.nirsoft.net/cdrom.html) : `control-windows_cmd cdrom open K:` (si le lecteur CD est sur la lettre K)  
    - Fermer le programme actif (on utilise alt+F4) : `control-windows_key alt+F4`  
    - Activer [l'écran de veille](http://nircmd.nirsoft.net/screensaver.html) : `control-windows_screensaver`
    - Pour [lancer Google Chrome](http://nircmd.nirsoft.net/exec.html) : `control-windows_cmd exec max "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"`
    
Idée originale de [ABOATDev](https://github.com/ABOATDev/).
