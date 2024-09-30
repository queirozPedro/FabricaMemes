import { createContext, ReactNode, RefObject, useRef, useState } from "react";

type ImageData = {
    src: string;
}

type HomeContextData = {
    images: ImageData[];
    upperText: string;
    lowerText: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    setUpperText: (value:string) => void;
    setLowerText: (value:string) => void;
    onDrop: (selectedFiles: File[]) => void;
}

export const HomeContext = createContext({} as HomeContextData)

type HomeContextProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: HomeContextProviderProps) => {
    const [upperText, setUpperText] = useState("");
    const [lowerText, setLowerText] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<ImageData[]>([]);

    const onDrop = (selectedFiles: File[]) => {
        alert("Chegou no onDrop" + selectedFiles.length)
        selectedFiles.map(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const updateImages: ImageData[] = [...images, {src: '${e.target?.result}'}];
                setImages(updateImages)
            }
            reader.readAsDataURL(file)
            return file
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

        </HomeContext.Provider>        
    )
}