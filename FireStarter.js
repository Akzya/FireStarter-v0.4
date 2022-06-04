// utils.h.js

class Utils
{
    getRootElement      = null; // args: void
    getRootObject       = null; // args: void
    getRenderElement    = null; // args: void
    getRandomArbitrary  = null; // args: void

    isNotOpenChat       = null; // args: void
    isParkourMode       = null; // args: void
    isNotKillZone       = null; // args: 1 - world, 2 - position {x, y, z}
    isGameReady         = null; // args: void

    errorLog            = null; // args: 1 - text
}

utilsObjects =
{
    rootElement: null,
    rootObject: null
}

// utils.c.js

Utils.getRootElement = function ()
{
    if (utilsObjects.rootElement)
    {
        return utilsObjects.rootElement;
    }

    return utilsObjects.rootElement = document.getElementById("root")._reactRootContainer;
}

Utils.getRootObject = function ()
{
    if (utilsObjects.rootObject)
    {
        return utilsObjects.rootObject;
    }

    if (!this.getRootElement().hasOwnProperty("_internalRoot"))
    {
        return null;
    }

    return utilsObjects.rootObject = this.getRootElement()._internalRoot.current.memoizedState.
        element.type.prototype;
}

Utils.getRenderElement = function ()
{
    return document.getElementsByClassName("sc-bwzfXH hjlOfi").item(0);
}

Utils.getRandomArbitrary = function (min, max)
{
    return Math.random() * (max - min) + min;
}

Utils.isNotOpenChat = function ()
{
    return (document.getElementsByClassName("sc-bwzfXH iokmvL").item(0) == null);
}

Utils.isParkourMode = function ()
{
    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.isParkourMode;
}

Utils.isNotKillZone = function (world, position)
{
    if (!this.isParkourMode())
    {
        return true;
    }

    if (!world)
        return false;

    let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

    if (!bounds)
        return false;

    if (position.x != 0 && (position.x >= bounds.maxX || position.x <= bounds.minX))
        return false;

    if (position.y != 0 && (position.y >= bounds.maxY || position.y <= bounds.minY))
        return false;

    return true;

    if (position.z != 0 && (position.z >= bounds.maxZ || position.z <= bounds.minZ))
        return false;

    return true;
}

Utils.isGameReady = function ()
{
    let renderElement = this.getRenderElement();

    if (!renderElement)
        return false;

    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.battleLoaded;
}

Utils.errorLog = function (text)
{
}

// gameObjects.h.js

class GameObjects
{
    // World
    getWorld                = null; // args: void
    getGameActions          = null; // args: void
    getMines                = null; // args: void

    // Tank
    getLocalPlayer          = null; // args: void
    getPhysicsComponent     = null; // args: void
    getHealthComponent      = null; // args: void
    getCamera               = null; // args: void

    // Weapon
    getStrikerComponent     = null; // args: void
}

gameObjects =
{
    localPlayer: null,
    world: null,
    gameActions: null,
    mines: null,
    physicsComponent: null,
    healthComponent: null,
    camera: null,
    strikerComponent: null
}

// gameObjects.c.js

GameObjects.getWorld = function ()
{
    if (gameObjects.world)
    {
        return gameObjects.world;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.world = localPlayer.at(0).world;
}

GameObjects.getGameActions = function ()
{
    if (gameObjects.gameActions)
    {
        return gameObjects.gameActions;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.gameActions = Array.from(world.inputManager.input.gameActions_0.map);
}

GameObjects.getMines = function ()
{
    if (gameObjects.mines)
    {
        return gameObjects.mines;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.mines = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(15);
}

GameObjects.getLocalPlayer = function ()
{
    if (gameObjects.localPlayer)
    {
        return gameObjects.localPlayer;
    }

    let rootObject = Utils.getRootObject();

    if (!rootObject)
    {
        return null;
    }

    let subs = rootObject.store.subscribers.array_hd7ov6$_0;

    if (!subs)
    {
        return null;
    }

    for (let i = 0; i < subs.length; i++)
    {
        if (subs.at(i).hasOwnProperty("tank") && subs.at(i).tank.tag == "LocalTank")
            return gameObjects.localPlayer = subs.at(i).tank.components_0.array;
    }

    return null;
}

GameObjects.getPhysicsComponent = function ()
{
    if (gameObjects.physicsComponent)
    {
        return gameObjects.physicsComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("tankPhysicsComponent_tczrao$_0"))
            return gameObjects.physicsComponent = localPlayer.at(i).tankPhysicsComponent_tczrao$_0;
    }

    return null;
}

// ПЕРЕДЕЛАТЬ
GameObjects.getHealthComponent = function ()
{
    if (gameObjects.healthComponent)
    {
        return gameObjects.healthComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.healthComponent = localPlayer.at(1);
}

GameObjects.getCamera = function ()
{
    if (gameObjects.camera)
    {
        return gameObjects.camera;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("followCamera_w8ai3w$_0"))
            return gameObjects.camera = localPlayer.at(i).followCamera_0.currState_0;
    }

    return null;
}

GameObjects.getStrikerComponent = function ()
{
    if (gameObjects.strikerComponent)
    {
        return gameObjects.strikerComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("strikerWeapon_jjsiik$_0"))
            return gameObjects.strikerComponent = localPlayer.at(i).strikerWeapon_jjsiik$_0;
    }

    return null;
}

// airBreak.h.js

class AirBreak
{
    process = null; // args: 1 - localPlayer
}

const airBreak =
{
    isShiftPressed: false,
    antiAim: false,
    state: false,
    speed: 50,
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
}

// airBreak.c.js

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 16 && e.location == 2 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.isShiftPressed = true;
    }
})

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 74 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.antiAim = !airBreak.antiAim;
    }
})

AirBreak.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    if (!bodies)
    {
        return;
    }

    if (airBreak.isShiftPressed)
    {
        airBreak.isShiftPressed = false;

        airBreak.state = !airBreak.state;

        if (airBreak.state)
        {
            airBreak.position.x = physicsComponent.body.state.position.x;
            airBreak.position.y = physicsComponent.body.state.position.y;
            airBreak.position.z = physicsComponent.body.state.position.z;

            airBreak.velocity.x = 0;
            airBreak.velocity.y = 0;
            airBreak.velocity.z = 0;
        }
        else
        {
            physicsComponent.body.state.velocity.x = 0;
            physicsComponent.body.state.velocity.y = 0;
            physicsComponent.body.state.velocity.z = 0;

            physicsComponent.body.state.angularVelocity.x = 0;
            physicsComponent.body.state.angularVelocity.y = 0;
            physicsComponent.body.state.angularVelocity.z = 0;

            for (let i = 0; i < bodies.length; i++)
            {
                bodies.at(i).movable = true;
            }
        }
    }

    if (!airBreak.state)
        return;

    let direction = camera.direction;

    airBreak.velocity.x = 0;
    airBreak.velocity.y = 0;

    if (KeyPressing.isKeyPressed(87 /*key: W*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y + airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(83 /*key: S*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y - airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(65 /*key: A*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y - airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(68 /*key: D*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y + airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(81 /*key: Q*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z += airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(69 /*key: E*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z -= airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(37 /*key: LEFT*/) && Utils.isNotOpenChat())
    {
        if (airBreak.speed > 1)
            airBreak.speed -= 2;
    }

    if (KeyPressing.isKeyPressed(39 /*key: RIGHT*/) && Utils.isNotOpenChat())
    {
        airBreak.speed += 2;
    }
    if(airBreak.speed >= 100) {
        airBreak.speed = 100
}

    if (Utils.isParkourMode())
    {
        for (let i = 0; i < bodies.length; i++)
        {
            bodies.at(i).movable = false;
        }

        if (airBreak.antiAim)
        {
            let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

            physicsComponent.interpolatedPosition.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
            physicsComponent.interpolatedPosition.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
            physicsComponent.interpolatedPosition.z = Utils.getRandomArbitrary(bounds.maxZ + 500, bounds.maxZ + 500);
        }

        physicsComponent.body.state.position.x = airBreak.position.x;
        physicsComponent.body.state.position.y = airBreak.position.y;
    }
    else
    {
        physicsComponent.body.state.velocity.x = airBreak.velocity.x;
        physicsComponent.body.state.velocity.y = airBreak.velocity.y;
    }

    physicsComponent.body.state.position.z = airBreak.position.z;
    physicsComponent.body.state.velocity.z = airBreak.velocity.z;

    physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.x = 0;
    physicsComponent.body.state.orientation.y = 0;

    physicsComponent.body.state.angularVelocity.x = 0;
    physicsComponent.body.state.angularVelocity.y = 0;
    physicsComponent.body.state.angularVelocity.z = 0;
}

// clicker.h.js

class Clicker
{
    process = null; // args: 1 - localPlayer
}

// clicker.c.js


    let repair = false

    document.addEventListener('keyup', (r) =>
{
        if (r.keyCode == 49 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        repair = !repair;
    }
})

    let armor = false

    document.addEventListener('keyup', (a) =>
{
        if (a.keyCode == 50 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        armor = !armor;
    }
})

    let damage = false
    document.addEventListener('keyup', (d) =>
{
    if (d.keyCode == 51 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        damage = !damage;
    }
})

    let nitro = false
    document.addEventListener('keyup', (n) =>
{
    if (n.keyCode == 52 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        nitro = !nitro;
    }
})

let mines = false

document.addEventListener('keyup', (m) =>
{
    if (m.keyCode == 53 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        mines = !mines;
    }
})

Clicker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let gameActions = GameObjects.getGameActions();

    if (!gameActions)
    {
        return;
    }

    let healthComponent = GameObjects.getHealthComponent();

    if (!healthComponent)
    {
        return;
    }

    if (Utils.isParkourMode() && !healthComponent.isFullHealth() && healthComponent.alive)
    {
        gameActions.at(5).at(1).wasPressed = true;
        gameActions.at(5).at(1).wasReleased = true;
        gameActions.at(9).at(1).wasPressed = true;
        gameActions.at(9).at(1).wasReleased = true;

        world.frameStartTime_0 += 5000000;

        world.inputManager.input.processActions_0();

        world.frameStartTime_0 -= 5000000;
    }


    if (mines)
    {
        gameActions.at(9).at(1).wasPressed = true;
        gameActions.at(9).at(1).wasReleased = true;
    }

    if (repair)
    {
        gameActions.at(5).at(1).wasPressed = true;
        gameActions.at(5).at(1).wasReleased = true;
    }


    if (armor)
    {
    gameActions.at(6).at(1).wasPressed = true;
    gameActions.at(6).at(1).wasReleased = true;
    }


    if (damage)
    {
    gameActions.at(7).at(1).wasPressed = true;
    gameActions.at(7).at(1).wasReleased = true;
    }


    if (nitro)
    {
    gameActions.at(8).at(1).wasPressed = true;
    gameActions.at(8).at(1).wasReleased = true;
    }


}

// removeMines.h.js

class RemoveMines
{
    process = null; // args: 1 - localPlayer
}

// removeMines.c.js

RemoveMines.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let mines = GameObjects.getMines();

    if (!mines)
    {
        return;
    }

    var n;
    for (n = mines.minesByUser_0.keys.iterator(); n.hasNext();)
    {
        var o = n.next();
        mines.removeAllMines_0(o)
    }

}

// striket.h.js

class Striker
{
    init = null; // args: 1 - localPlayer
    process = null; // args: 1 - localPlayer
}

// striker.c.js

let shellCache = null;
let state = false;
let salvoRocketsCount = 8;
let targetId;

Striker.init = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    let targetingSystem = striker.targetingSystem_0.targetingSystem_0;
    let targetingSectorsCalculator = targetingSystem.directionCalculator_0.targetingSectorsCalculator_0;

    targetingSectorsCalculator.maxElevationAngle_0 = 100000;
    targetingSectorsCalculator.minElevationAngle_0 = -100000;

    salvoRocketsCount = striker.salvoRocketsCount;

    striker.__proto__.lockTarget_gcez93$ = function (t, e, n)
    {
        this.lockTarget_gcez93$$default(t, e);
        targetId = e;
        return true;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            shellCache = localPlayer.at(i).shellCache_0.itemsInUse_123ot1$_0.array_hd7ov6$_0;
            break;
        }
    }
}


Striker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    if (KeyPressing.isKeyPressed(82 /*key: R*/) && Utils.isNotOpenChat())
    {
        striker.explodeRockets();
    }

    if (shellCache)
    {
        if (shellCache.length == salvoRocketsCount)
        {
            setTimeout(() => { state = true; }, 1500);
        }

        if (state)
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).maxSpeed_0 = 35000;
                shellCache.at(i).components_0.array.at(1).minSpeed_0 = 2000;
            }

            if (shellCache.length == 0)
            {
                state = false;
            }
        }
        else
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).maxSpeed_0 = 0;
                shellCache.at(i).components_0.array.at(1).minSpeed_0 = 0;
            }
        }
    }
}

class commons{
getRoot = null
getReactRoot = null
searchObject = null
}


class game{
getTank = null
getLaser = null
}


class hacks{

noLaser = null

}






commons.searchObject = function(object,item){
try {
for(let i=0; i<object.length;i++){
if(object[i].hasOwnProperty(item))
return object[i]

}
} catch (error) {

}
}
commons.getRoot = function(){
root = document.querySelector("#root")
return root
}

commons.getReactRoot = function(){
return root._reactRootContainer._internalRoot.current.memoizedState.element.type.prototype.store.subscribers.array_hd7ov6$_0

}


game.getTank = function(){
return commons.searchObject(commons.getReactRoot(),"tank").tank

}

game.getLaser = function(){

return commons.searchObject(game.getTank().components_0.array,"laserDirectionMessage_0")

}



hacks.noLaser = function(){
try {
game.getLaser().turnOffLaser_0()

} catch (error) {

}

}

let LR = setInterval(hacks.noLaser,10)


// wallHack.h.js

class WallHack
{
    process = null; // args: 1 - localPlayer
}

// wallHack.c.js

colorEnemy = 16711680;
colorTarget = 0;

function drawEsp(player, color)
{
    let weaponSkin = player.at(7).weaponSkin_3qscef$_0.root_s4vp75$_0;
    let weaponChildren = weaponSkin.children_ich852$_0.array;

    let hullSkin = player.at(7).weaponSkin_3qscef$_0.hullSkinComponent_p2c7jk$_0.hull_tmiccz$_0;
    let hullChildren = hullSkin.children_ich852$_0.array;

    weaponSkin.outlined = true;
    weaponSkin.outlineBold = false;
    weaponSkin.outlineColor = color;

    hullSkin.outlined = true;
    hullSkin.outlineBold = false;
    hullSkin.outlineColor = color;

    for (let i = 0; i < weaponChildren.length; i++)
    {
        weaponChildren.at(i).outlined = true;
        weaponChildren.at(i).outlineBold = false;
        weaponChildren.at(i).outlineColor = color;
    }

    for (let i = 0; i < hullChildren.length; i++)
    {
        hullChildren.at(i).outlined = true;
        hullChildren.at(i).outlineBold = false;
        hullChildren.at(i).outlineColor = color;
    }
}

WallHack.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    for (let i = 0; i < bodies.length; i++)
    {
        if (bodies.at(i).data.components_0.array.at(0).hasOwnProperty("team_1h5i78$_0") &&
        bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.hasOwnProperty("name$"))
        {
            if ((localPlayer.at(0).team_1h5i78$_0.name$ !=
            bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.name$) ||
            localPlayer.at(0).team_1h5i78$_0.name$ == "NONE")
            {
                let color = colorEnemy;

                if (bodies.at(i).data.components_0.array.at(4).userId == targetId)
                {
                    color = colorTarget;
                }

                drawEsp(bodies.at(i).data.components_0.array, color);
            }
        }
    }
}



let cheatMenuCode = `
<div class="shizoval" id="shizoval_window">

	<style>
        .shizoval {
            left: 1%;
            top: 25%;
            position: fixed;
            z-index: 1000;
            display: flex;
        }

        .shizoval__content {
            padding: 15px;
            background: #000001;
            box-shadow: 0 5px 15px black;
            font-family: 'Roboto', sans-serif;
            color: white;
            font-size: 0.9375rem;
            font-weight: 500;
            border-radius: 15px;
        }
	</style>

	<div class="shizoval__content">
		<center>FireStarter v0.4</center><hr>

		<div id="gameStates" style="display: none;">
			<p>AirWalk: <font id="airBreakStateColor" color="red"><label id="airBreakState">OFF</label></font></p>
			<p>AirWalk Speed: <font color="#9500ff"><label id="airBreakSpeed">100</label></font></p>
			<p>Anti-Aim: <font id="antiAimStateColor" color="red"><label id="antiAimState">OFF</label></font></p>
			<p>Repair-Kits: <font id="repairStateColor" color="red"><label id="repairState">OFF</label></font></p>
            <p>Boosted-Armor: <font id="armorStateColor" color="red"><label id="armorState">OFF</label></font></p>
            <p>Boosted-Damage: <font id="damageStateColor" color="red"><label id="damageState">OFF</label></font></p>
            <p>Speed-Boost: <font id="nitroStateColor" color="red"><label id="nitroState">OFF</label></font></p>
            <p>Mines: <font id="minesStateColor" color="red"><label id="minesState">OFF</label></font></p>
		</div>

		<div id="infoWindow">
            <p>To Hide HotKeys Press 'Home'</p>
			<p>Press 'Insert' To Toggle UI</p>
			<p>Made By Akz</p>
		</div>


<div class="hotkeys" id="hotkey_window">

	<style>
        .hotkeys {
            left: 89%;
            top: 25%;
            position: fixed;
            z-index: 1000;
            display: flex;
        }

        .hotkey__content {
            padding: 15px;
            background: #000001;
            box-shadow: 0 5px 15px black;
            font-family: 'Roboto', sans-serif;
            color: white;
            font-size: 0.9375rem;
            font-weight: 500;
            border-radius: 15px;
        }
	</style>

	<div class="hotkey__content">
		<center>FireStarter v0.4 HotKeys</center><hr>

        <div id="hotkeysWindow" style="display: block;">
        <p>AirWalk Toggle: Right Shift</p>
        <p>AirWalk Height:</p>
        <p>Q: Increase Height</p>
        <p>E: Decrease Height</p>
        <p>WASD: Drive, Use Mouse To Aim</p>
        <p>AirWalk Speed:</p>
        <p>Right Arrow: Increase Speed</p>
        <p>Left Arrow: Decrease Speed</p>
        <p>J: Anti-Aim Toggle</p>
        <p>R: Explode Rockets</p>
        <p>Supply Hotkeys:</p>
        <p>1: Toggle Repairs</p>
        <p>2: Toggle Armor</p>
        <p>3: Toggle Damage</p>
        <p>4: Toggle Nitro</p>
        <p>5: Toggle Mines</p>
        </div>

	</div>

	<script>
		document.addEventListener('keyup', function (evt)
		{
			if (evt.keyCode === 45)
			{
				if (document.getElementById("shizoval_window").style.display == "none")
				{
					document.getElementById("shizoval_window").style.display = "";
				}
				else
				{
					document.getElementById("shizoval_window").style.display = "none";
				}
			}
		});

        		document.addEventListener('keyup', function (evt)
		{
			if (evt.keyCode === 36)
			{
				if (document.getElementById("hotkey_window").style.display == "block")
				{
					document.getElementById("hotkey_window").style.display = "none";
				}
				else
				{
					document.getElementById("hotkey_window").style.display = "block";
				}
			}
		});
	</script>

</div>
`;
// cheatMenu.h.js

class CheatMenu
{
    init = null; // args: void
    setStates = null; // args: void
}

// cheatMenu.c.js

let airBreakObj;
let clickerObj;

CheatMenu.init = function ()
{
    $("body").append(cheatMenuCode);

    airBreakObj =
    {
        airBreakState:
        {
            color: document.getElementById("airBreakStateColor"),
            label: document.getElementById("airBreakState")
        },

        airBreakSpeed:
        {
            label: document.getElementById("airBreakSpeed")
        },

        antiAimState:
        {
            color: document.getElementById("antiAimStateColor"),
            label: document.getElementById("antiAimState")
        }
    };

    clickerObj =
    {

        repair:
        {
            color: document.getElementById("repairStateColor"),
            label: document.getElementById("repairState")
        },

        armor:
        {
            color: document.getElementById("armorStateColor"),
            label: document.getElementById("armorState")
        },

        damage:
        {
            color: document.getElementById("damageStateColor"),
            label: document.getElementById("damageState")
        },

        nitro:
        {
            color: document.getElementById("nitroStateColor"),
            label: document.getElementById("nitroState")
        },
        mines:
        {
            color: document.getElementById("minesStateColor"),
            label: document.getElementById("minesState")
        }
    };
}

CheatMenu.setStates = function ()
{
    if (airBreakObj.airBreakState.label.textContent == "OFF" && airBreak.state == true)
    {
        airBreakObj.airBreakState.label.textContent = "ON";
        airBreakObj.airBreakState.color.color = "green";
    }

    if (airBreakObj.airBreakState.label.textContent == "ON" && airBreak.state == false)
    {
        airBreakObj.airBreakState.label.textContent = "OFF";
        airBreakObj.airBreakState.color.color = "red";
    }

    if (airBreakObj.airBreakSpeed.label.textContent != airBreak.speed)
    {
        airBreakObj.airBreakSpeed.label.textContent = airBreak.speed;
    }

    if (airBreakObj.antiAimState.label.textContent == "OFF" && airBreak.antiAim == true)
    {
        airBreakObj.antiAimState.label.textContent = "ON";
        airBreakObj.antiAimState.color.color = "green";
    }

    if (airBreakObj.antiAimState.label.textContent == "ON" && airBreak.antiAim == false)
    {
        airBreakObj.antiAimState.label.textContent = "OFF";
        airBreakObj.antiAimState.color.color = "red";
    }

    if (clickerObj.repair.label.textContent == "OFF" && repair == true)
    {
        clickerObj.repair.label.textContent = "ON";
        clickerObj.repair.color.color = "green";
    }

    if (clickerObj.repair.label.textContent == "ON" && repair == false)
    {
        clickerObj.repair.label.textContent = "OFF";
        clickerObj.repair.color.color = "red";
    }

    if (clickerObj.armor.label.textContent == "OFF" && armor == true)
    {
        clickerObj.armor.label.textContent = "ON";
        clickerObj.armor.color.color = "green";
    }

    if (clickerObj.armor.label.textContent == "ON" && armor == false)
    {
        clickerObj.armor.label.textContent = "OFF";
        clickerObj.armor.color.color = "red";
    }

    if (clickerObj.damage.label.textContent == "OFF" && damage == true)
    {
        clickerObj.damage.label.textContent = "ON";
        clickerObj.damage.color.color = "green";
    }

    if (clickerObj.damage.label.textContent == "ON" && damage == false)
    {
        clickerObj.damage.label.textContent = "OFF";
        clickerObj.damage.color.color = "red";
    }

    if (clickerObj.nitro.label.textContent == "OFF" && nitro == true)
    {
        clickerObj.nitro.label.textContent = "ON";
        clickerObj.nitro.color.color = "green";
    }

    if (clickerObj.nitro.label.textContent == "ON" && nitro == false)
    {
        clickerObj.nitro.label.textContent = "OFF";
        clickerObj.nitro.color.color = "red";
    }

    if (clickerObj.mines.label.textContent == "OFF" && mines == true)
    {
        clickerObj.mines.label.textContent = "ON";
        clickerObj.mines.color.color = "green";
    }

    if (clickerObj.mines.label.textContent == "ON" && mines == false)
    {
        clickerObj.mines.label.textContent = "OFF";
        clickerObj.mines.color.color = "red";
    }
}

// content.c.js

// Data
let init = false;

CheatMenu.init();

function reset()
{
    init = false;
    airBreak.state = false;

    document.getElementById("infoWindow").style.display = "";
    document.getElementById("gameStates").style.display = "none";

    gameObjects =
    {
        localPlayer: null,
        world: null,
        gameActions: null,
        mines: null,
        physicsComponent: null,
        healthComponent: null,
        camera: null,
        strikerComponent: null,

    };

    utilsObjects =
    {
        rootElement: null,
        rootObject: null
    };
}

// Main event (call after initialization)
function mainEvent()
{
    try
    {
        if (!init && Utils.isGameReady())
        {
            init = true;

            // init code
            document.getElementById("infoWindow").style.display = "none";
            document.getElementById("gameStates").style.display = "";

            let localPlayer = GameObjects.getLocalPlayer();

            Striker.init(localPlayer);

            localPlayer.at(0).entity.unpossess = function ()
            {
                this.isPossessed = !1;
                reset();
            }
        }
        else if (init && !Utils.isGameReady())
        {
            reset();
        }

        if (init)
        {
            let localPlayer = GameObjects.getLocalPlayer();

            // process functions
            AirBreak.process(localPlayer);
            Clicker.process(localPlayer);
            Striker.process(localPlayer);
            RemoveMines.process(localPlayer);
            WallHack.process(localPlayer);

            CheatMenu.setStates();
        }
    }
    catch (e)
    {
        Utils.errorLog(e);
        reset();
    }

    requestAnimationFrame(mainEvent);
}

requestAnimationFrame(mainEvent);

console.clear();
console.log("[FireStarter] The cheat has been loaded");
