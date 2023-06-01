import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import {reset,answerExam} from '../../features/corporateTrainee/corporateTraineeSlice'

function Exam() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector(
      (state) => state.auth
  )
  
  var questions = []
  

  const {  isLoading, isError, message,isSuccess,courses,registeredCourses,solvingExam, answers } = useSelector(
    (state) => state.corporateTrainee
)
var bool = (!solvingExam)
const [answerList,setAnswerList] = React.useState(new Array(bool? 0: (solvingExam.questions.length+1)));
const [showAnswer,setShowAnswer] = React.useState(false);

useEffect(() => {
  if (isError) {
      toast.error(message)
  }

  if (!user) {
      navigate('/login')
  }

  if(solvingExam){
    if(answerList.length===0){
      setAnswerList(new Array(solvingExam.questions.length+1))
    }
    }
  
    if(answers && !showAnswer){
      console.log("I entered this part")
      setShowAnswer(true)
      setAnswerList(answers)
    }




  // return () => {
  //     dispatch(reset())
  // }
}, [user, navigate, dispatch,isSuccess,isError,message,solvingExam,answerList,answers, showAnswer])

  
  // const question =[]
  


  function changeAnswer(qNumber,value){
    if(!showAnswer){
    setAnswerList(prev=> {
      var helper =[]
      for(let i =0;i<prev.length;i++){
        if(i===qNumber){
          helper.push(value)
        }else{
          helper.push(prev[i])
        }
      }
      return helper
    })
  }

  }

  async function onSubmit(){

    for(let i =1;i<answerList.length;i++){
      if(answerList[i]== null){
        toast.error("Please answer all questions")
        return;
      }
    }
    setShowAnswer(true)

   await dispatch(answerExam({
      course_id:solvingExam.courseID,
      exam_id:solvingExam.examID,
      answerList:answerList,
    }))


  }


  if(solvingExam){
    questions = solvingExam.questions.map((q => {
      return (
          <div key={q._id}>
          <h3><b>{q.number})</b> {q.text}</h3> 
          <h3>A: {q.choiceA}  
              <input
                type="radio"
                id='a'
                value="a"
                checked={answerList[q.number] === "a"}
                onClick={() => {changeAnswer(q.number,'a')}}
                
              />
              </h3> 
              <h3>B: {q.choiceB} 
              <input
                type="radio"
                id='b'
                value="b"
                checked={answerList[q.number] === "b"}
                onClick={() => {changeAnswer(q.number,'b')}}
  
              />
              </h3> 
              <h3>C: {q.choiceC}
              <input
                type="radio"
                id='c'
                value="c"
                checked={answerList[q.number] === "c"}
                onClick={() => {changeAnswer(q.number,'c')}}
              />
              </h3> 
              <h3>D: {q.choiceD}
              <input
                type="radio"
                id='d'
                value="d"
                checked={answerList[q.number] === "d"}
                onClick={() => {changeAnswer(q.number,'d')}}
              />
              </h3> 
              <br/>

              {showAnswer && (
                <div>
                {q.answer===answerList[q.number] ? "Correct" : "Wrong answer"} <br/> 
                {q.answer!==answerList[q.number] && (<>The correct answer is : {q.answer}</>)}  
                </div>
    
    )}


          </div>
      )
  }))
  }

  return (
    <>
    <div className='box-form' style={{width:'1500px'}}>
    <h1>Solving the Exam: {solvingExam.title}</h1> 

    {questions}
    {!showAnswer &&(
    <button className='btn' onClick={() => {onSubmit()}}>Submit Answers</button>
    )}

    </div>

    </>
  )
}

export default Exam