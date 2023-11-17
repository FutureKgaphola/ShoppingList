import { createContext, useRef, useState } from "react";

const CameraContext=createContext();
const CameraProvider=({children})=>{
    
    var count = useRef('category');
    const [image, setImage] = useState(null);
    const [category, setcategory] = useState(null);
    const [bought, setbought] = useState([]);
    
    var newCat=count.current=category;
    return(
        <CameraContext.Provider value={{
            image, setImage,
            category, setcategory,
            newCat,
            bought, setbought
        }}>
            {children}
        </CameraContext.Provider>
    )
}
export { CameraContext, CameraProvider };