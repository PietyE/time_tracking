import {
    SET_CURRENT_PAGE,
    SET_PAGE_SIZE,
    SET_CURRENT_ITEMS,
    SET_TOTAL_ITEMS_COUNT

} from  'constants/actions-constant';

export const setCurrentPage=(payload)=>{
    return{
        type:SET_CURRENT_PAGE,
        payload
    }
}

export const setCurrentItems=(payload)=>{
    return{
        type:SET_CURRENT_ITEMS,
        payload
    }
}

export const  setPageSize=(payload)=>{
    return{
        type:SET_PAGE_SIZE,
        payload
    }
}

export const setTotalItemsCount=(payload)=>{
    return{
        type:SET_TOTAL_ITEMS_COUNT,
        payload
    }
}