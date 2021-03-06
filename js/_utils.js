(function() {

    DTD.updateGolds = function(nb) {
        storage.goldCoins.set(storage.goldCoins.get() + 1);
        $('#goldCount').html(storage.goldCoins.get());
        $('#goldCoin').effect("shake", {
            distance : 5,
            times : 1
        }, 100);
    };

    DTD.makeMatrix = function() {
        var cols = 9;
        var rows = 6;
        for(var cols_i = 1; cols_i <= cols; cols_i++) {
            for(var rows_i = 1; rows_i <= rows; rows_i++) {
                Crafty.e("Cell").attr({
                    x : 65 + (cols_i * 65) - 65,
                    y : 90 + (rows_i * 70) - 70
                });
            }
        }
    };

    DTD.isInViewPort = function(component) {
        return component.x < DTD.viewPort.w && component.x > 0 && component.y < DTD.viewPort.h && component.y > 0;
    };

    DTD.attachSpriteTo = function(mainComponent, spriteComponent) {
        mainComponent._spriteComponent = spriteComponent;
        spriteComponent.bind("EnterFrame", function() {
            this.attr({
                x : mainComponent.x - this._mainComponentAttr.x,
                y : mainComponent.y - this._mainComponentAttr.y
            });
        });
    };

    DTD.waveParser = function(waveString) {
        var lines = [];
        for( i = 0; i < 6; i++) {
            var enemy = waveString[i];
            switch(waveString[i]) {
                case 'p':
                    enemy = "Pig";
                    break;
                case 'r':
                    enemy = "Ridding";
                    break;
                case 'g':
                    enemy = "Granny";
                    break;
                case '!':
                    enemy = "Nobody";
                    break;
                default:
                    enemy = "Nobody";
            }
            lines[i] = enemy;
        }
        return lines;
    };

    DTD.monsterCount = function(waves) {
        monsterCount = 0;
        _.each(waves, function(item) {
            for( i = 0; i < 6; i++) {
                if(item.wave[i] != "!") {
                    monsterCount++;
                }
            }
        });
        return monsterCount;
    };

    DTD.rolling = function(percent) {
        return Crafty.math.randomInt(1, 100) > 100 - percent;
    };

    DTD.pauseGame = function() {
        /*Crafty.stop();*/
    };

    DTD.createKeyHelper = function(component, keyBind) {
        $("body").append('<div id="keyHelper' + keyBind + '" class="keyHelper battleFieldUI">' + keyBind + '</div>');
        $('#keyHelper' + keyBind).css("top", component._y).css("left", component._x);
    };

    DTD.damagesFor = function(skillName) {
        var level;

        switch(skillName) {
            case "ThrowingAxe":
                level = storage.axeSkill.get();
                break;

            case "ThrowingBtrick":
                level = storage.rockSkill.get();
                break;

            default:
                level = 0;
                break;
        }

        var dmgMin = (DTD.gameType == "story") ? DTD.skillList[skillName].stats[level].damageMin : DTD.skillList[skillName].stats[2].damageMin;
        var dmgMax = (DTD.gameType == "story") ? DTD.skillList[skillName].stats[level].damageMax : DTD.skillList[skillName].stats[2].damageMax;
        return Crafty.math.randomInt(dmgMin, dmgMax);
    };
    
})();
