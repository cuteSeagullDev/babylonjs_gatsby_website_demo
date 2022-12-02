
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as MATERIALS from '@babylonjs/materials';
import "@babylonjs/loaders/glTF";
import backgroundImage from "../assets/shanghai-bund.jpg";
import car from "../assets/Renault_Alpine_blendswap_cc0.glb";



//for cannonjs physics engine: 
if (typeof window !== 'undefined') { 
    window.CANNON = require('cannon');
}

//for BJS inspector:
if (typeof document !== 'undefined') {
    require("@babylonjs/core/Debug/debugLayer");
    require("@babylonjs/inspector");
}

//needed for both onSceneReader and onRender functions

const onSceneReady = scene => {
    //uncomment this to view BJS inspector
    scene.debugLayer.show();

    //this line must be here or canvas will throw not defined error when attaching camera control;
    const canvas = scene.getEngine().getRenderingCanvas();

    //camera & lighting
    const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, -10, new BABYLON.Vector3(0, 0, 0), scene)
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.setPosition(new BABYLON.Vector3(20, 7, -40));
    camera.attachControl(canvas, true);   /*uncomment to allow user to move camera*/
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //skyline background image
    const dome = new BABYLON.PhotoDome(
        "dome",
        backgroundImage,
        {
            resolution: 32,
            size: 1000
        },
        scene
    );

    // LOAD FROM MEMORY. this returns a promise.
    async function loadFromMemory (){
        const assetArrayBuffer = await BABYLON.Tools.LoadFileAsync(car, true);
        const assetBlob = new Blob([assetArrayBuffer]);
        const assetUrl = URL.createObjectURL(assetBlob);
        await BABYLON.SceneLoader.AppendAsync(assetUrl, undefined, scene, undefined, ".glb");
    }

    //access and transform the loaded meshes within the "".then" resolved function
    //attached to the returned promise.  use scene debugger to check mesh name if needed
    loadFromMemory().then(
        ()=>{
            const loadedCar = scene.getMeshByName("__root__");
            loadedCar.position.x += 14;

            console.log(scene.getTransformNodeByName("Renault_Alpine"));
        }
    );

    //grid ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height: 500}, scene);
    const groundMat = new MATERIALS.GridMaterial("grid", scene);
    ground.material = groundMat;
    ground.position.y -= 1;

}


function onRender (scene) {
}


export {onSceneReady, onRender};





/* onSceneReady and onRender functions in this file should be imported
into index.js (or any another js file within src/pages). 
(They are already passed to the corresponding SceneComponent properties. 
SceneComponent creates a new Babylon.js scene and passes it to both functions.) 

OnRender is used for the render loop. (ie, animations; objects that are rerendered continuously with changes). 
Since not all Babylon.js scenes necessarily contain objects that are animated, 
onRender may be left blank. 
*/