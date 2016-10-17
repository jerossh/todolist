import { combineReducers } from 'redux'
import todos from './todos'


const rootReducer = combineReducers({
  todos
})

// 导出总体reducer
export default rootReducer
