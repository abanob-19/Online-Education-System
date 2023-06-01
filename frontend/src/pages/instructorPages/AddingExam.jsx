import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

import {
  addExam,
  reset,
  logOutReset,
} from "../../features/instructor/instructorSlice";

function AddingExam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { currCourse, courses, isLoading, isError, message, isSuccess } =
    useSelector((state) => state.instructor);

  const [questionList, setQusetionList] = useState([]);

  const [formData, setFormData] = useState({
    examTitle: "",
    text: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    answer: "no_answer",
  });

  const { text, choiceA, choiceB, choiceC, choiceD, answer, examTitle } =
    formData;

  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingNumber, setEditingNumber] = useState(0);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }
    if (!user.Accepted) {
      navigate("/instructor/acceptContract");
    }

    // if(isSuccess){
    //     toast.success('Exam added succefully')
    //   }

    if (!currCourse) {
      navigate("/instructor/home");
    }

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    isError,
    message,
    dispatch,
    questionList,
    formVisible,
    currCourse,
    editing,
  ]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function onClick() {
    setFormVisible(false);
    setEditing(false);
  }

  function onClickAddQuestion() {
    setFormVisible(true);
  }

  function onClickEdit() {
    setEditing((prev) => !prev);
  }

  function addExamClick() {
    if (examTitle === "") {
      toast.error("Please enter a exam Title");
    } else {
      if (questionList.length === 0) {
        toast.error("Please add at least one question");
      } else {
        const exam = {
          number: currCourse.exams.length + 1,
          courseID: currCourse._id,
          title: examTitle,
          questionList: questionList,
        };
        toast.success("Exam Added successfuly");
        dispatch(addExam(exam));
        dispatch(logOutReset());
        navigate("/instructor/home");
      }
    }
  }

  function onSubmit() {
    if (
      text === "" ||
      choiceA === "" ||
      choiceB === "" ||
      choiceC === "" ||
      choiceD === ""
    ) {
      toast.error("Please add all feilds");
    } else {
      toast.success("Qusetion Added");

      setQusetionList((prev) => [
        ...prev,
        {
          number: prev.length + 1,
          text: text,
          choiceA: choiceA,
          choiceB: choiceB,
          choiceC: choiceC,
          choiceD: choiceD,
          answer: answer,
        },
      ]);
    }

    setFormData((prev) => ({
      examTitle: prev.examTitle,
      text: "",
      choiceA: "",
      choiceB: "",
      choiceC: "",
      choiceD: "",
      answer: "no_answer",
    }));
  }

  function onSubmitEdit() {
    if (
      text === "" ||
      choiceA === "" ||
      choiceB === "" ||
      choiceC === "" ||
      choiceD === ""
    ) {
      toast.error("Please add all feilds");
    } else {
      toast.success("Qusetion Edited");
      setEditing(false);

      setQusetionList((prev) =>
        prev.map((q) => {
          if (q.number === editingNumber)
            return {
              number: editingNumber,
              text: text,
              choiceA: choiceA,
              choiceB: choiceB,
              choiceC: choiceC,
              choiceD: choiceD,
              answer: answer,
            };
          return q;
        })
      );

      setFormData((prev) => ({
        examTitle: prev.examTitle,
        text: "",
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        answer: "no_answer",
      }));
    }
  }

  function deleteQuestion(number) {
    const qL = [];
    var num = 1;
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].number !== number) {
        qL.push({
          number: num++,
          text: questionList[i].text,
          choiceA: questionList[i].choiceA,
          choiceB: questionList[i].choiceB,
          choiceC: questionList[i].choiceC,
          choiceD: questionList[i].choiceD,
          answer: questionList[i].answer,
        });
      }
    }
    setQusetionList(qL);
  }

  function editQuestion(number) {
    setEditing(true);
    setEditingNumber(number);
    setFormVisible(false);

    setFormData((prev) => ({
      examTitle: prev.examTitle,
      text: questionList[number - 1].text,
      choiceA: questionList[number - 1].choiceA,
      choiceB: questionList[number - 1].choiceB,
      choiceC: questionList[number - 1].choiceC,
      choiceD: questionList[number - 1].choiceD,
      answer: questionList[number - 1].answer,
    }));
  }

  const questions = questionList.map((q) => {
    return (
      <>
        <h1>{q.number}</h1>
        <h2>{q.text}</h2>
        <h3>A: {q.choiceA}</h3>
        <h3>B: {q.choiceB}</h3>
        <h3>C: {q.choiceC}</h3>
        <h3>D: {q.choiceD}</h3>
        <h3>Answer: {q.answer}</h3>
        <button
          onClick={() => {
            deleteQuestion(q.number);
          }}
        >
          {" "}
          Delete this
        </button>
        <button
          onClick={() => {
            editQuestion(q.number);
          }}
        >
          {" "}
          Edit this
        </button>
      </>
    );
  });
  // var chosenCourseExams = [];
  // for(let i =0;i<courses.length;i++){
  //     if(courses[i]._id===currCourse)
  //         chosenCourseExams = courses[i].exams;
  // }

  if (isLoading) return <Spinner />;
  // console.log(questions)
  return (
    <>
    <div class='box-form' style={{width:'1500px'}}>
      {/* {exams} */}
      <div className="form-group">
        <label> Exam Title : </label>
        <input
          type="text"
          className="form-control"
          id="examTitle"
          name="examTitle"
          value={examTitle}
          placeholder="examTitle"
          onChange={onChange}
        />
      </div>
      {questions}

      {(formVisible || editing) && (
        <section className="form">
          <div className="form-group">
            <label> Text : </label>
            <input
              type="text"
              className="form-control"
              id="text"
              name="text"
              value={text}
              placeholder="text"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label> A : </label>
            <input
              type="text"
              className="form-control"
              id="choiceA"
              name="choiceA"
              value={choiceA}
              placeholder="choiceA"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label> B : </label>
            <input
              type="text"
              className="form-control"
              id="choiceB"
              name="choiceB"
              value={choiceB}
              placeholder="choiceB"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label> C : </label>
            <input
              type="text"
              className="form-control"
              id="choiceC"
              name="choiceC"
              value={choiceC}
              placeholder="choiceC"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label> D : </label>
            <input
              type="text"
              className="form-control"
              id="choiceD"
              name="choiceD"
              value={choiceD}
              placeholder="choiceD"
              onChange={onChange}
            />
          </div>

          <fieldset>
            <legend>Answer</legend>

            <div className="radio">
              <input
                type="radio"
                id="no_answer"
                name="answer"
                value="no_answer"
                checked={formData.answer === "no_answer"}
                onClick={onChange}
              />
              <label htmlFor="full-time">No Answer</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="a"
                name="answer"
                value="a"
                checked={formData.answer === "a"}
                onClick={onChange}
              />
              <label htmlFor="full-time">A</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                id="b"
                name="answer"
                value="b"
                checked={formData.answer === "b"}
                onClick={onChange}
              />
              <label htmlFor="full-time">B</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                id="c"
                name="answer"
                value="c"
                checked={formData.answer === "c"}
                onClick={onChange}
              />
              <label htmlFor="full-time">C</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                id="d"
                name="answer"
                value="d"
                checked={formData.answer === "d"}
                onClick={onChange}
              />
              <label htmlFor="full-time">D</label>
            </div>
          </fieldset>
          <br />

          {/* <div className='form-group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='answer'
                                    name='answer'
                                    value={answer}
                                    placeholder='answer'
                                    onChange={onChange}
                                />
                            </div> */}

          <div className="form-group">
            {formVisible && (
              <button onClick={onSubmit} className="btn btn-block">
                Add Question
              </button>
            )}

            {editing && (
              <button onClick={onSubmitEdit} className="btn btn-block">
                Edit Question
              </button>
            )}
          </div>
          <div className="form-group">
            <button onClick={onClick} className="btn btn-block">
              Cancel
            </button>
          </div>
        </section>
      )}

      {!formVisible && (
        <button class='btn' onClick={onClickAddQuestion}> Add a new Question </button>
      )}
      <br/>

      <button class='btn btn-block' onClick={addExamClick}> Add Exam </button>
      </div>
    </>
  );
}

export default AddingExam;
