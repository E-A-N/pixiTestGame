//setup keyboard controls

var playerBullet = function(spr){
    spr.anchor.x = 0.5;
    spr.anchor.y = 0.5;
    spr.spd = 3.5;
    spr.name = "playerBullet";
    spr.lifeTime = 120;

    /**
    *    This method needs to be fired to adabt object to immediate game settings
    */
    spr.create = function(){
        spr.vx = Math.cos(spr.rotation) * spr.spd;
        spr.vy = Math.sin(spr.rotation) * spr.spd;
    }

    /**
    *    @param {number} delta - A time value that helps keep the game in sync
    */
    spr.update = function(delta){
        if (spr.alive) {

            if (--spr.lifeTime < 0){
                spr.destroySelf();
                spr.alive = false;
            }

            //Check for any collisions
            spr.singleCollisionCheck(_gameMaster.spriteList, function(self, spr2){
                if (spr2.name === "asteroidRock"){
                    spr.alive = false;
                    spr.destroySelf();
                    spr2.explode();
                }
            });
        }

        spr.screenWrap();
        spr.x += spr.vx * delta;
        spr.y += spr.vy * delta;
    }
}
