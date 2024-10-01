"use client"

import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";

type ImageData = {
    src: string;
}

type HomeContextData = {
    images: ImageData[];
    upperText: string;
    lowerText: string;
    canvasRef: RefObject<HTMLCanvasElement>
    setUpperText: (value:string) => void;
    setLowerText: (value:string) => void;
    onDrop: (selectedFiles: File[]) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type HomeContextProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: HomeContextProviderProps) => {
    const [upperText, setUpperText] = useState("");
    const [lowerText, setLowerText] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<ImageData[]>([]);

    useEffect(() =>{
        if(images.length){
            const canvas = canvasRef.current;
            if (!canvas) return;
            const context = canvas.getContext("2d");
            if (!context) return;
            var image = new Image();
            
            image.onload = () => {
                canvas.height = image.height;
                canvas.width = image.width;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                context.strokeStyle = "black";
                context.font = "15pt Impact";
                context.lineWidth = 4;
                context.fillStyle = "white";
                context.strokeText(upperText, 50, 20);
                context.fillText(upperText, 50, 20);
                context.strokeText(lowerText, 50, 140);
                context.fillText(lowerText, 50, 140);
            }
            
            image.src = images[images.length - 1].src;

        }
    }, [images, upperText, lowerText])
    
    const onDrop = (selectedFiles: File[]) => {
        selectedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const updateImages: ImageData[] = [...images, {src: `${e.target?.result}`}]
                setImages(updateImages);
            }
            reader.readAsDataURL(file);
            return file;
        });
    }
    
    return (
        <HomeContext.Provider value={{
            upperText,
            lowerText,
            setUpperText,
            setLowerText,
            canvasRef,
            images,
            onDrop
        }}>
           {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;