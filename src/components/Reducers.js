
const initialState ={books:[],
                     createbook:{},
                     }

export default (state =initialState ,action)=>{
    
    switch(action.type){
        case 'add':
            return {...state,books:[...action.payload]}
        case 'delete' :
            return {...state,books:state.books.filter((e)=>e.id!== action.payload.id)} 
        case 'create':
            return {...state,books:[...state.books,action.payload]}
        case 'triger':
            return {...state,books:[...state.books,action.payload]}
        default :
           return state ;
    }
}
