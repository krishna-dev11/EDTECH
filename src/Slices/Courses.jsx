import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Step:1,
   course:null,
   editCourse : false , 
   userBuyedCoursesDataForCard : null,
   videoUrl: null,
   RatingAndReviewData:[]
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
            // console.log(state.course)
         },
         setEditCourse(state , action){
            state.editCourse = action.payload
         },
         setUserBuyedCoursesDataForCard(state , action){
            state.userBuyedCoursesDataForCard = action.payload
         },
         setCurrectVideoUrl(state , action){
            state.videoUrl = action.payload
         },
         setRatingAndReviewData(state , action){
            state.RatingAndReviewData = action.payload
         },
      }
      })

  export const {setStep , setCourse , setRatingAndReviewData , setEditCourse , setUserBuyedCoursesDataForCard ,setCurrectVideoUrl} = CourseSlice.actions
  export default CourseSlice.reducer