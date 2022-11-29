import React from "react";
import SceneComponent from "../components/SceneComponent/SceneComponent";
import {onSceneReady, onRender} from '../components/sampleScene/sampleScene';
import "@babylonjs/loaders/glTF";

export default function Home() {
  return (
    <div className="main">
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
    </div> 
  )
}