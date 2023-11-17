import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const initialState={
    ItemsPerCategory : [
        
      ]
}

const productReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'ADD':
            
            let ItemsInCategory=[...state.ItemsPerCategory,{
                key: uuidv4(),
                desc: action.data.description,
                category: action.data.category,
                img: action.data.img,
                price: action.data.price,
              }]
             
            return{
                ...state,
                ItemsPerCategory:ItemsInCategory
            }
            
        case 'REMOVE':
            
            let NewItemsInCategory=state.ItemsPerCategory.filter(item=>{
                return action.id!==item.key
            });
            return {
                ...state,
                ItemsPerCategory:NewItemsInCategory
            }

        case 'FILTER':
            let FiteredCategory=state.ItemsPerCategory.filter(item=>{
                return action.key!==item.key
            });
            return {
                ...state,
                ItemsPerCategory:FiteredCategory
            }
    
        default:
            
            return state;
    }
    
};

export default productReducer;