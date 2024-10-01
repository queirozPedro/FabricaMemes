"use client"

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const {
    upperText,
    lowerText,
    images,
    canvasRef,
    setUpperText,
    setLowerText,
    onDrop
  } = useContext(HomeContext);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"]
    }}
  )

  return (
    <main className="w-[60vw] m-auto">
      <h1 className="w-full text-center bg-[#dddddd]">Criador de Memes</h1>
      
      <canvas className="h-[70vh] w-full  bg-[#dddddd] mt-[10px]"
          {...getRootProps()} ref={canvasRef}>
            <div {...getInputProps()}></div>
      </canvas>

      <label htmlFor="superior">Informe o  texto superior</label>
      <textarea className={`border-[1px] border-black max-w-full h-${images[0]}`}
          id="superior"
          name="superior"
          value={upperText}
          onChange={ e => setUpperText(e.target.value)}
      />
      <label htmlFor="inferior">Informe o  texto inferior</label>
      <textarea className="border-[1px] border-black w-full"
          id="inferior"
          name="inferior"
          value={lowerText}
          onChange={ e => setLowerText(e.target.value)}
      />
    </main>
  );
}