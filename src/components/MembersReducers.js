const initial =[];

export default (state=initial,action)=>{
    switch(action.type){
        case 'Add_Members':
            return action.payload;
        default :
          return state;    
    }
}