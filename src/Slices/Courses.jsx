import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Step:1,
   course:null,
   editCourse : false , 
   userBuyedCoursesDataForCard : null
}



  const CourseSlice = createSlice({
    name:"Course",
    initialState,
    reducers : {
         setStep(state , action){
            state.Step = action.payload
         },
         setCourse(state , action){
            state.course = action.payload
            console.log(state.course)
         },
         setEditCourse(state , action){
            state.editCourse = action.payload
         },
         setUserBuyedCoursesDataForCard(state , action){
            state.userBuyedCoursesDataForCard = action.payload
         },
      }
      })

  export const {setStep , setCourse , setEditCourse , setUserBuyedCoursesDataForCard} = CourseSlice.actions
  export default CourseSlice.reducer