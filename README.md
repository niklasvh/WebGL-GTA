***WebGL GTA***

This experiment parses the game files (in their original format) and builds the maps and some of the game objects from the game through WebGL. Some very basic game mechanics and physics are implemented, but there isn't really anything else than pedestrian movement possible in this version.

The game files used are from the original GTA game's demo from 1997, freely available for download <a href="http://www.rockstargames.com/gta/demos/gta24.zip">here</a>. The full version is also available for free from <a href="http://www.rockstargames.com/classics/?id=1">Rockstar Games</a> or for purchase at <a href="http://store.steampowered.com/app/12170/">Steam store</a>.

**Browser support & Issues**

Currently only works on Google Chrome/Firefox and requires a half decent graphics card. There are a number of graphical glitches present, such as problems with palette transparancy and some slopes applied with wrong angle. This implementation parses the game files as they were used in the original games, and as such they are far from an optimal format used in this experiment, and especially the sprites and color palettes require far more computing that would be necessary with a more optimal format.

**Future plans**

I created this experiment just for the purpose of testing some aspects of WebGL and to see how well larger static environments perform and currently have no plans of continuing developing this any further in the near future. It currently parses most files used by the game (including maps, sprites, game objects, spawn points, missions, etc. ) but only uses a small portion of that data in its current implementation.

<a href="https://niklasvh.github.io/WebGL-GTA/">Try it</a>
