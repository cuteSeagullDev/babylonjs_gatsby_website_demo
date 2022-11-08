import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as MATERIALS from '@babylonjs/materials';
import "@babylonjs/loaders/glTF";

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
let car;
let isSpinning = false;  

const onSceneReady = scene => {
    //uncomment this to view BJS inspector
    // scene.debugLayer.show();

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
        "dome",
        "/shanghai-bund.jpg",
        {
            resolution: 32,
            size: 1000
        },
        scene
    );


    // //GUI
    // const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    // const panel = new GUI.StackPanel("stackPanel");
    // panel.isVertical = false;
    // panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    // panel.height = "150px";
    // advancedTexture.addControl(panel);
    // const slider = new GUI.Slider();
    // slider.minimum = 0;
    // slider.maximum = 210;
    // slider.value = 0;
    // slider.height = "20px";
    // slider.width = "200px";
    // slider.color = "orange";
    // slider.paddingRight = "20px";
    // slider.thumbColor = "orange";
    // slider.isHighlighted = true;
    // slider.isThumbClamped = true;
    // panel.addControl(slider);
    // const button = new GUI.Button.CreateSimpleButton("spinButton", "Spin");
    // button.width = "100px";
    // button.height = "30px";
    // button.color = "black";
    // button.background = "orange";
    // panel.addControl(button);
    // button.onPointerClickObservable.add(function(){
    //     isSpinning = !isSpinning;
    //     console.log(isSpinning);
    // })
    
    //imports glTF into scene
    BABYLON.SceneLoader.Append(
        "/", 
        "Renault_Alpine_blendswap_cc0.glb", 
        scene, 
        function (scene) {
            car = scene.getMeshByID("__root__");
            car.position.z = 200;
            car.rotation = new BABYLON.Vector3(0, Math.PI*2, 0);
            // slider.onValueChangedObservable.add(function(value) {
            //     value = 200 - value;
            //     car.position.z = value;
            // });
        }
    )

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height: 500}, scene);
    const groundMat = new MATERIALS.GridMaterial("grid", scene);
    ground.material = groundMat;

}


function onRender (scene) {
    const carOnRender = scene.getMeshByID("__root__");
    if (carOnRender && isSpinning) {
        var deltaTimeInMillis2 = scene.getEngine().getDeltaTime();
        const rpm = 5;
        carOnRender.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis2 / 1000));
    }
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