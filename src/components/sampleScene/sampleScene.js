
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as MATERIALS from '@babylonjs/materials';
import "@babylonjs/loaders/";
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
    camera.setPosition(new BABYLON.Vector3(-7, 4, -20));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //skyline background image
    const dome = new BABYLON.PhotoDome(
        "dome",//  src/components/sampleScene/shanghai-bund.jpg
        backgroundImage,
        {
            resolution: 32,
            size: 1000
        },
        scene
    );


    
    //IMPORT USING APPEND
    // BABYLON.SceneLoader.Append(
    //     "../assets/", 
    //     "Renault_Alpine_blendswap_cc0.glb", 
    //     scene, 
    //     null
    // )


    // TRYING TO IMPORT WTIH ASSET MANAGER
    // const assetsManager = new BABYLON.AssetsManager(scene);
    // const meshTask = assetsManager.addMeshTask("car task", "", "../assets/", "Renault_Alpine_blendswap_cc0.glb");
    // meshTask.onSuccess = function (task) {
    //     task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    // }	
    // assetsManager.load();


    //TRYING TO LOAD FROM MEMORY
    // async function loadFromMemory (){
    //     const assetArrayBuffer = await BABYLON.Tools.LoadFileAsync(car, true);
    //     //loading from the static folder doesn't work anymore either
    //     const assetArrayBuffer = await BABYLON.Tools.LoadFileAsync("/Renault_Alpine_blendswap_cc0.glb", true);
    //     const assetBlob = new Blob([assetArrayBuffer]);
    //     const assetUrl = URL.createObjectURL(assetBlob);
    //     await BABYLON.SceneLoader.AppendAsync(assetUrl, undefined, scene, undefined, ".glb");
    // }
    // loadFromMemory();


    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height: 500}, scene);
    const groundMat = new MATERIALS.GridMaterial("grid", scene);
    ground.material = groundMat;

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