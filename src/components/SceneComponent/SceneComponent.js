import { Engine, Scene} from '@babylonjs/core';
import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import React, { useEffect, useRef } from 'react';
import "./sceneComponent.css";
// import car from "../assets/Renault_Alpine_blendswap_cc0.glb";

export default function SceneComponent (props) {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            
            //passes in camera, mesh, and light info from function in props
            if (scene.isReady()) {
                props.onSceneReady(scene)
            } else {
                scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
            }

        //TRYING TO LOAD MODEL FROM MEMORY WITHIN USEEFFECT:
        // async function loadFromMemory (){
        //     const assetArrayBuffer = await BABYLON.Tools.LoadFileAsync("../assets/Renault_Alpine_blendswap_cc0.glb", true);
        //     const assetBlob = new Blob([assetArrayBuffer]);
        //     const assetUrl = URL.createObjectURL(assetBlob);
        //     await BABYLON.SceneLoader.AppendAsync(assetUrl, undefined, scene, undefined, ".glb");
        // }
        // loadFromMemory();



            //passes in animation y rotate function in from function in props
            //runRenderLoop which code gets continuously executed
            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            })



            //window resize

            const resize = () => {
                scene.getEngine().resize();
            }
            if (window) {
                window.addEventListener('resize', resize);
            }


            return () => {
                scene.getEngine().dispose();
                if (window) {
                    window.removeEventListener('resize', resize);
                }
            }
        }
    }, [reactCanvas])

    return (
        //<canvas ref={reactCanvas} {...rest} />
        <canvas className="canvas" ref={reactCanvas} {...rest} />
    );
}

