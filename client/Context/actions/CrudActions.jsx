export const AddProducts=(category,price,description,img)=>(
    {
        type:'ADD',
        data:{category,price,description,img}
    }
)

export const RemoveProducts=(id)=>(
    {
        type:'REMOVE',
        id: id,
    }
)

export const FilterProducts=()=>(
    {
        type:'FILTER'
    }
)