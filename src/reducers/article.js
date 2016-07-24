import * as types from '../actions/types'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
	isFetching:false,
	isMore:true,
    items:[]
});

export const articleList = createReducer(initialState,{
    [types.ARTICLE_LIST_REQUEST]:(state,action) => state.set('isFetching',true),
    [types.ARTICLE_LIST_SUCCESS]:(state,action) => {
        // debugger;
        // console.log(!(action.json.data.length < action.itemsPerPage))
        
        return state.merge({
            isFetching:false,
            isMore: !(action.json.data.length < action.itemsPerPage),
            items: action.isAdd?state.get('items').concat(action.json.data):action.json.data
        })
    }
});

export const articleDetail = createReducer(fromJS({}),{
    [types.ARTICLE_DETAIL_SUCCESS]:(state,action) => {return state.merge(action.articleDetail)},
    [types.ARTICLE_DETAIL_FAILURE]:(state,action) => state,
    [types.TOGGLE_LIKE_SUCCESS]:(state,action) => {


        return state.merge({
            isLike:action.isLike,
            like_count:action.like_count
        })
    },
    [types.TOGGLE_LIKE_FAILURE]:(state,action) => state,
    [types.TOGGLE_LIKE_EXBUG]:(state,{liked}) => state.set('isLike',liked)
})