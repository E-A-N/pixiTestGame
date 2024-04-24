/**
*    This is a game object that can only be generated by a playerShip
*    @param {object} spr - reference to sprite to be dynamically expanded into bullet
*/

var playerBullet = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.spd = 5;
    spr.speedBonus = scoreBoard.score > 10000 ? 1 : 0;
    spr.distance = 0;
    spr.name = "playerBullet";
    spr.lifeTime = 100;
    spr.mySound = _ost.fireBullet;
    spr.boundsOffsetX = 0.3;
    spr.boundsOffsetY = 0.3;
    spr.boundsOffsetW = 0.4;
    spr.boundsOffsetH = 0.4;
    /**
    *    This method needs to be fired to adabt object to immediate game settings
    */
    spr.create = function(){
        // spr.mySound.play();
        spr.intangible = false;
        spr.vx = Math.cos(spr.rotation) * spr.spd;
        spr.vy = Math.sin(spr.rotation) * spr.spd;
    }

    /**
    *    @param {number} delta - A time value that helps keep the game in sync
    */
    spr.update = function(delta){
        if (DEBUG_MODE){
            spr.drawBounds(); 
        }
        if (spr.alive) {

            if (--spr.lifeTime < 0){
                spr.destroySelf();
                spr.alive = false;
            }

            //Check for any collisions
            spr.singleCollisionCheck(GameMaster.spriteList, function(self, spr2){
                if (spr2.name === "asteroidRock"){
                    spr.alive = false;
                    //spr.parent.debugMsg(spr.distance);
                    spr.destroySelf();
                    spr2.explode();
                }
            });
        }

        spr.screenWrap();
        spr.x += spr.vx * (delta + spr.speedBonus);
        spr.y += spr.vy * (delta + spr.speedBonus);
        spr.distance += spr.spd;
    }
}
