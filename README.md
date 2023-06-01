
# Online Learning System

## Description

This project is a web application that allows individuals to attend pre-recorded courses online and access educational content at their own pace. Users could register for courses, watch pre-recorded lectures, complete quizzes, and receive a certificate of completion. The application has a user-friendly interface, allowing users to easily navigate and search for courses, and have features such as note-taking while watching lectures and downloading them as a pdf.

## Table of Contents
1. [Motivation](#motivation)
2. [Build Status](#build-status)
3. [Code Style](#code-style)
4. [Screenshots](#screenshots)
5. [Tech/Framework](#tech/framework)
6. [Features](#features)
7. [Code Examples](#code-examples)
8. [Installation](#installation)
9. [API Reference](#api-reference)
10. [Tests](#tests)
11. [How To Use?](#how-to-use)
12. [Contributing](#contributing)
13. [Credits](#credits)
14. [License](#license)
## Motivation

We created this project because we believe that education should be accessible to everyone, regardless of their location or schedule. With the rise of technology, it has become easier for individuals to learn new skills and acquire knowledge from the comfort of their own homes. We wanted to create a platform that made it easy for people to access high-quality educational content on a variety of topics. By creating a web application that allows users to attend pre-recorded courses online, we hope to empower individuals to take control of their own learning and pursue their interests and passions.
## Build Status


The build status of this project is currently: **Active development**

We are continuously working on improving and adding new features to the application. We are also testing and fixing any bugs that may be found during the development process.

If you would like to contribute to the project or report any issues, please visit our GitHub repository: https://github.com/AhmedKayed/Online_Learning_System

Please note that this application is under development and may not be fully functional at this time. We appreciate your patience and feedback as we work to improve and finalize the application.

## Code Style

This project follows the Flux pattern for code organization and data flow management. The Flux architecture is a pattern for managing the data flow in web applications that helps to keep the application's state predictable and easy to debug.

The project uses slices and services to separate the frontend and backend code, with the frontend responsible for handling the user interface and user interactions, and the backend responsible for handling data and API calls.

We are using *Redux* to implement the Flux pattern in the project. This library provides a set of tools for managing the state of the application and handling data flow.

We encourage contributions to follow this code style and to use the provided libraries to maintain consistency and ease of development.

## Screenshots

![Login]([https://ibb.co/99Jdc8N)
![Register]([https://ibb.co/DftLDLK)
![Registered courses]([https://ibb.co/CJJXv0M)
![Report problem](https://ibb.co/7tc4bNP)
![Help](https://ibb.co/DgVxjGS)
![Edit Course](https://ibb.co/DgVxjGS)




## Tech/Framework

This project uses the MERN stack (MongoDB, Express.js, React, and Node.js) for building full-stack web applications:

- MongoDB: A NoSQL database that is used to store data in a JSON format.
- Express.js: A web application framework for Node.js that is used to handle routing and other back-end logic.
- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime that allows for server-side execution of JavaScript code.
The MERN stack is a popular choice for building web applications because it provides a complete set of technologies that work seamlessly together. This allows developers to focus on building the features of their application without having to worry about setting up and configuring different technologies.

We encourage contributions to use the same stack and maintain consistency and ease of development.

## Features

- User registration and login: Users can create an account and log in to access the courses and materials.
- Course catalog: Users can browse and search through a catalog of available courses, filtering them based on price, rating, and topic.
- Pre-recorded lectures: Users can watch pre-recorded lectures and other course materials at their own pace.
- Quizzes and assignments: Users can complete quizzes and assignments to test their understanding of the course material.
- Certificate of completion: Users will receive a certificate of completion after finishing the course.
- User-friendly interface: The application has a user-friendly interface that makes it easy for users to navigate and search for courses, and have features such as bookmarking, note-taking, and video playback controls.
- Progress tracking: Users can track their progress through the course and pick up where they left off.
- Refunding a course: Users can request a refund for a course they have purchased if they are not satisfied with it.
- Rating a course and instructor: Users can rate a course and instructor after completing the course to provide feedback and help others make informed decisions.
- Most Popular courses: Users can view the most popular courses among other users.

Our project stands out from the rest by providing a user-friendly interface that makes it easy for users to navigate and find the courses they are interested in. Additionally, the progress tracking, refunding, rating, and filtering features allow users to have a personalized experience and make informed decisions about the courses they choose. The most popular courses feature allows users to see what other users are interested in. All of these features aim to make the user experience as smooth and enjoyable as possible.
# Code Examples

## Server-side code of Instructor adding a Course

// @route   POST /instructor/addCourse
// @access  Private

const addCourse = asyncHandler(async (req, res) => {
  const { title, price, hours, summary, subject, courseVideoPreview } =
    req.body;

  if (
    !title ||
    !price ||
    !hours ||
    !summary ||
    !subject ||
    !courseVideoPreview
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if course exists
  const courseExists = await Course.findOne({ title });
  if (courseExists) {
    res.status(400);
    throw new Error("Course already exists");
  }
  let token = req.headers.authorization.split(" ")[1];
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");
  // Create course
  const course = await Course.create({
    title: title,
    subtitles: subtitles,
    price: price,
    hours: hours,
    summary: summary,
    instructorId: user._id + "",
    instructorName: user.firstname + " " + user.lastname,
    instructorRating: user.rating,
    subject: subject,
    courseVideoPreview: courseVideoPreview,
    exams: [],
  });
  if (course) {
    res.status(201).json({
      title: title,
      subtitles: subtitles,
      price: price,
      hours: hours,
      summary: summary,
      instructorId: user._id + "",
      instructorName: user.firstname + " " + user.lastname,
      instructorRating: user.rating,
      subject: subject,
      courseVideoPreview: courseVideoPreview,
    });
    try {
      await course.save();
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});


## Server-side code of Instructor adding an Exam

// @route   POST /instructor/addExam
// @access  Private

const addExam = asyncHandler(async (req, res) => {
  const { courseID, title, questionList, number } = req.body;

  if (!courseID || !questionList || !title || !number) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if course exists
  var courseExists = await Course.findOne({ _id: courseID });

  if (!courseExists) {
    res.status(400);
    throw new Error("Course does not exist");
  }

  var oldExams = courseExists.exams;

  const newExam = {
    number: number,
    title: title,
    questions: questionList,
  };

  if (!oldExams) {
    oldExams = [];
  }
  oldExams.push(newExam);
  const courseUptaded = await Course.findOneAndUpdate(
    { _id: courseID },
    { exams: oldExams },
    { new: true }
  );
  if (courseUptaded) {
    res.status(200).json(courseUptaded);
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});



## Server-side code of Individual Trainee filtering Courses

// @route   POST /individualTrainee/addExam
// @access  Private

const filterCourses = asyncHandler(async (req, res) => {
  try {
    let match = {};
    // match.instructor_id = user._id+"", "i";
    if (req.body.subject !== "") {
      match.subject = new RegExp(req.body.subject, "i");
    }

    if (
      req.body.startPrice !== null &&
      req.body.startPrice !== "" &&
      req.body.endPrice !== null &&
      req.body.endPrice !== ""
    ) {
      match.price = {
        $gte: parseInt(req.body.startPrice, 10),
        $lte: parseInt(req.body.endPrice, 10),
      };
    } else if (req.body.startPrice !== null && req.body.startPrice !== "") {
      match.price = {
        $gte: parseInt(req.body.startPrice, 10),
      };
    } else if (req.body.endPrice !== null && req.body.endPrice !== "") {
      match.price = {
        $lte: parseInt(req.body.endPrice, 10),
      };
    }
    var response = await Course.aggregate([{ $match: match }]);
    var helper = [];
    for (let i = 0; i < response.length; i++) {
      let sum = 0;
      for (let j = 0; j < response[i].rating.length; j++) {
        sum += parseInt(response[i].rating[j], 10);
      }
      var avg;
      if (response[i].rating.length === 0) {
        avg = 0;
      } else {
        avg = sum / response[i].rating.length;
      }
      if (
        req.body.startRate !== null &&
        req.body.startRate !== "" &&
        req.body.endRate !== null &&
        req.body.endRate !== ""
      ) {
        if (avg >= req.body.startRate && avg <= req.body.endRate) {
          helper.push(response[i]);
        }
      } else if (req.body.startRate !== null && req.body.startRate !== "") {
        if (avg >= req.body.startRate) {
          helper.push(response[i]);
        }
      } else if (req.body.endRate !== null && req.body.endRate !== "") {
        if (avg <= req.body.endRate) {
          helper.push(response[i]);
        }
      }
    }
    if (
      (req.body.startRate !== null && req.body.startRate !== "") ||
      (req.body.endRate !== null && req.body.endRate !== "")
    ) {
      res.send(helper);
    } else {
      res.send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


## Server-side code of Individual Trainee Registering for a Course

// @route   PUT /individualTrainee/registerCourse
// @access  Private

const registerCourse = asyncHandler(async (req, res) => {
  const { courseID } = req.body;

  if (!courseID) {
    res.status(400).send("Please add all fields");
  }
  // Check if user exists
  let token = req.headers.authorization.split(" ")[1];

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from the token
  const user = await users.findById(decoded.id).select("-password");

  var userRegisteredCourses = user.registeredCourses;

  for (let i = 0; i < userRegisteredCourses.length; i++) {
    if (userRegisteredCourses[i] === courseID) {
      return res.status(400).send("You are already registered to this course");
    }
  }

  userRegisteredCourses.push(courseID);

  await users.findOneAndUpdate(
    { _id: user._id },
    { registeredCourses: userRegisteredCourses },
    { new: true }
  );

  const table = await Course.find(
    { _id: userRegisteredCourses },
    {
      title: 1,
      subtitles: 1,
      rating: 1,
      hours: 1,
      hourspsubtitle: 1,
      price: 1,
      discount: 1,
    }
  );
  var course = await Course.findOne({ _id: courseID });
  await Course.findOneAndUpdate(
    { _id: courseID },
    { numOfTrainees: course.numOfTrainees + 1 }
  );

  var realInst = await users.findOne({ _id: course.instructor_id });
  var realInstWallet = realInst.wallet ? realInst.wallet : 0;
  if (course.price == 0) {
    realInstWallet += 1;
  } else {
    realInstWallet += Math.round(
      course.price * (1 - course.discount / 100.0) * 0.9
    );
  }
  await users.findOneAndUpdate(
    { _id: course.instructor_id },
    { wallet: realInstWallet }
  );

  res.status(201).send(table);
});


## Server-side code of Individual Trainee Rating an Instructor

// @route   PUT /individualTrainee/rateInstructor
// @access  Private

const rateInstructor = asyncHandler(async (req, res) => {
  const { Instructor_id, CourseId, newRating } = req.body;

  if (!Instructor_id) {
    res.status(400).send("Please add all fields");
  }
  const inst = await users.findById(Instructor_id);
  const cour = await Course.findById(CourseId);
  const AddedRating = inst.rating;
  AddedRating.push(newRating);

  const AddedRating2 = cour.instructorRating;
  AddedRating2.push(newRating);

  const updatedUser = await users.findOneAndUpdate(
    { _id: Instructor_id },
    { rating: AddedRating },
    { new: true }
  );

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: CourseId },
    { instructorRating: AddedRating2 },
    { new: true }
  );

  res.status(201).send(updatedUser);
});


## Server-side code of Corporate Trainee requesting a Course

// @route   PUT /corporateTrainee/requestCourse
// @access  Private

const requestCourse = asyncHandler(async (req, res) => {
  const { courseID, issuerID } = req.body;

  if (!courseID || !issuerID) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const courseRequest = await CourseRequest.create({
    courseID: courseID,
    issuerID: issuerID,
  });

  if (courseRequest) {
    res.status(200).send(courseRequest);
  } else {
    res.status(400).send("Error while inserting");
    return;
  }
});


## Server-side code of Admin adding an Instructor

// @route   POST /admin/addInstructor
// @access  Private

const addInstructor = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).send("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username,
    password: hashedPassword,
    role: "Instructor",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid user data");
  }
});


## Server-side code of Admin setting the Discount on Courses

// @route   PUT /admin/setDiscountCourses
// @access  Private

const setDiscountCourses = asyncHandler(async (req, res) => {
  const { courseIDs, discount } = req.body;

  if (!courseIDs || !discount) {
    res.status(400).send("Please add all fields");
  }

  var courseUptaded;

  for (let i = 0; i < courseIDs.length; i++) {
    courseUptaded = await Course.findOneAndUpdate(
      { _id: courseIDs[i] },
      { discount: discount },
      { new: true }
    );
  }

  res.status(200).send(courseUptaded);
});


## Server-side code of Authenticating a User

// @route   POST /login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Please fill all the feilds");
  }
  // Check for user email
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      registeredCourses: user.registeredCourses,
      reviews: user.reviews,
      rating: user.rating,
      Accepted: user.Accepted,
      PaymentPolicyAccepted: user.PaymentPolicyAccepted,
      wallet: user.wallet,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
});


## Server-side code of a User paying for a Course

// @route   POST /payment
// @access  Private

const payment = asyncHandler(async (req, res) => {
  const { amount, id } = req.body;

  if (!amount || !id) {
    res.status(400).send("Please add all fields");
    return;
  }

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Online Learning System",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});


## Client-side code for displaying a Regitered Course for an Individual Trainee

<div>
      {registeredCourses.map((c) => {
        {
          //var sum = 1;
          var number = 0;
          for (let i = 0; i < c.rating.length; i++) {
            number = number + parseInt(c.rating[i], 10);
          }
          number = Math.round((number / c.rating.length) * 10) / 10;

          //var sum = 1;
          var number2 = 0;
          for (let i = 0; i < c.instructorRating.length; i++) {
            number2 = number2 + parseInt(c.instructorRating[i], 10);
          }
          number2 = Math.round((number2 / c.instructorRating.length) * 10) / 10;
        }
        return (
          <div key={c._id}>
            -------------------------------------
            <div>
              <p>Rate this course:</p>
              <StarRating cID={c._id} onChanged={starComponentChange} />
            </div>
            <h2>Title: {c.title}</h2>
            <h2>Course rating: {isNaN(number) ? "--" : number}</h2>
            <h2>Hours: {c.hours}</h2>
            <h2>Exams : </h2>
            <iframe
              width="560"
              height="315"
              src={c.courseVideoPreview}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
              {console.log(c)}
            </iframe>
            <h2>Hours: {c.hours}</h2>
            <h2>Exams : </h2>
            <p>Rate this instructor:</p>
            <StarRatingInst
              instId={c.instructor_id}
              cID={c._id}
              onChanged={starComponentChange2}
            />
            <h2>Instructor: {c.instructorName}</h2>
            <h2>Instructor rating: {isNaN(number2) ? "--" : number2}</h2>
            <button
              className="btn btn-block"
              onClick={() => {
                reviewInstructor(c.instructorId);
              }}
            >
              {" "}
              Review this instructor{" "}
            </button>
            <button
              className="btn btn-block"
              onClick={() => {
                reviewCourse(c._id);
              }}
            >
              {" "}
              Review this course{" "}
            </button>
            <button
              className="btn btn-block"
              onClick={() => {
                viewSubtitle(c._id, c.subtitles, c.title);
              }}
            >
              {" "}
              View Subtitles{" "}
            </button>
            <button
              className="btn btn-block"
              onClick={() => {
                requestRefund1(c._id);
              }}
            >
              {" "}
              Request refund{" "}
            </button>
            <ul>
              {c.exams.map((e) => {
                if (e.public) {
                  var solved = false;
                  var solvedIndex = -1;
                  for (let i = 0; i < solvedExams.length; i++) {
                    if (solvedExams[i].examID == e._id) {
                      solved = true;
                      solvedIndex = i;
                      break;
                    }
                  }
                  return (
                    <div key={e._id}>
                      <h3>{e.title}</h3>
                      {solved && (
                        <p>
                          You scored {solvedExams[solvedIndex].score} out of{" "}
                          {e.questions.length} (
                          {(solvedExams[solvedIndex].score /
                            e.questions.length) *
                            100}
                          %)
                        </p>
                      )}
                      {solved && (
                        <button
                          className="btn"
                          onClick={() => {
                            viewPrevExamClick(
                              c._id,
                              e._id,
                              solvedExams[solvedIndex].answerList
                            );
                          }}
                        >
                          View your previous answers
                        </button>
                      )}
                      {!solved && (
                        <button
                          className="btn"
                          onClick={() => {
                            solveExamClick(c._id, e._id);
                          }}
                        >
                          Click Here to solve
                        </button>
                      )}
                    </div>
                  );
                }
              })}
            </ul>
            {/* <h2>Price:{c.price}</h2> */}
            {/* <button className='btn' onClick={() => {registerCourseClick(c._id)}}> Register to this course </button> */}
            <br />
          </div>
        );
      })}
    </div>


## Client-side code for displaying a Course for an Individual Trainee

<div>
      {courses.map((c, index) => {
        if (c.closed) {
          return;
        }

        var alreadyRegistered = false;
        for (let i = 0; i < user.registeredCourses.length; i++) {
          if (user.registeredCourses[i] == c._id) {
            alreadyRegistered = true;
            break;
          }
        }

        var number = 0;
        for (let i = 0; i < c.rating.length; i++) {
          number = number + parseInt(c.rating[i], 10);
        }
        number = Math.round((number / c.rating.length) * 10) / 10;
        var pricex = c.price;
        var discounted = false;
        if (c.discount != 0 && c.price != 0) {
          pricex = Math.round(c.price * (1 - parseInt(c.discount, 10) / 100.0));
          discounted = true;
        }
        var pricex2 = pricex;

        index++;
        return (
          <div key={c._id}>
            -------------------------------------
            <h2>Title: {c.title}</h2>
            <h2>Hours: {c.hours}</h2>
            <h2>Rating:{number}</h2>
            {discounted && (
              <>
                <h2>
                  Price:
                  <p style={{ textDecorationLine: "line-through" }}>
                    was {c.price}{" "}
                  </p>
                </h2>
                <h2>
                  now:
                  {Math.round(c.price * (1 - parseInt(c.discount, 10) / 100.0))}
                </h2>
                <h2>Discount: {c.discount} %</h2>
              </>
            )}
            {!discounted && (
              <>
                <h2>Price: {c.price}</h2>
              </>
            )}
            {!alreadyRegistered && payingList[index] && pricex2 > 0 && (
              <StripeContainer
                amount={pricex2 * 100}
                traineeID={user.token}
                method={() => registerCourseClick(c._id)}
                startLoad={() => setPayLoading(true)}
                endLoad={() => setPayLoading(false)}
              />
            )}
            {!alreadyRegistered && (
              <button
                className="btn"
                onClick={() => {
                  registerCourseClick2(c._id, pricex2, index);
                }}
              >
                {" "}
                {!payingList[index] ? "Register to this course" : "Cancel"}{" "}
              </button>
            )}
            {alreadyRegistered && <h3>You are registered to this course</h3>}
            <br />
          </div>
        );
      })}
    </div>


## Client-side code for displaying a question from an Exam for a Trainee

<div>
        {solvingExam.questions.map((q) => {
          return (
            <div key={q._id}>
              <h3>
                <b>{q.number})</b> {q.text}
              </h3>
              <h3>
                A: {q.choiceA}
                <input
                  type="radio"
                  id="a"
                  value="a"
                  checked={answerList[q.number] === "a"}
                  onClick={() => {
                    changeAnswer(q.number, "a");
                  }}
                />
              </h3>
              <h3>
                B: {q.choiceB}
                <input
                  type="radio"
                  id="b"
                  value="b"
                  checked={answerList[q.number] === "b"}
                  onClick={() => {
                    changeAnswer(q.number, "b");
                  }}
                />
              </h3>
              <h3>
                C: {q.choiceC}
                <input
                  type="radio"
                  id="c"
                  value="c"
                  checked={answerList[q.number] === "c"}
                  onClick={() => {
                    changeAnswer(q.number, "c");
                  }}
                />
              </h3>
              <h3>
                D: {q.choiceD}
                <input
                  type="radio"
                  id="d"
                  value="d"
                  checked={answerList[q.number] === "d"}
                  onClick={() => {
                    changeAnswer(q.number, "d");
                  }}
                />
              </h3>
              <br />

              {showAnswer && (
                <div>
                  {q.answer === answerList[q.number]
                    ? "Correct"
                    : "Wrong answer"}{" "}
                  <br />
                  {q.answer !== answerList[q.number] && (
                    <>The correct answer is : {q.answer}</>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>


## Client-side code for displaying the reviews on a Course give by the Instructor

<div>
      {allCourses.map((c) => {
        return (
          <div key={c._id}>
            -------------------------------------
            <h2>Reviews:</h2>
            {c.reviews.map((r) => {
              return (
                <>
                  {r}
                  <br />
                </>
              );
            })}
            <br />
          </div>
        );
      })}
    </div>


## Client-side code for displaying the registeration form

<>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              placeholder="First Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              placeholder="Last Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm Password"
              onChange={onChange}
            />
          </div>

          <p></p>
          <br />
          <fieldset>
            <legend>Gender</legend>
            <div className="radio">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onClick={onChange}
              />
              <label htmlFor="full-time">Male</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onClick={onChange}
              />
              <label htmlFor="full-time">Female</label>
            </div>
            <br />
          </fieldset>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
      <button className="btn" onClick={() => navigate("/guest/viewCourses")}>
        Continue as guest
      </button>
    </>


## Client-side code for displaying a Report to the Admin

<div>
      Title: {r.title}
      <br />
      Status: {r.status}
      <br />
      Type: {r.type}
      <br />
      Issued By: {r.issuerID}
      <br />
      Concerning the course: {r.courseID}
      <br />
      <fieldset>
        <legend>Text</legend>
        {r.text}
      </fieldset>
      Mark as: <br />
      {r.status !== "Pending" && (
        <button onClick={() => status(r._id, "Pending")}>Pending</button>
      )}
      {r.status !== "Resolved" && (
        <button onClick={() => status(r._id, "Resolved")}>Resolved</button>
      )}
      <br />
      <br />
    </div>


## Client-side code for reviewing a Course by the Corporate Trainee

    <>
      <h1>Add a review</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="reviews"
          name="reviews"
          value={reviews}
          placeholder="reviews"
          onChange={onChange}
        />
      </div>
      <br />
      <button onClick={addReviewCourse} className="btn btn-block">
        Add Review
      </button>
    </>
## Installation

To run this project, you will need to have Node.js and MongoDB installed on your machine.

1. Clone or download the repository to your local machine.

2. Install the necessary dependencies by running the following command in the project's root directory:

```bash
  npm install
```

This will install all the necessary Node modules, including Express.js, Mongoose, and any other dependencies for this project.

3. Start your MongoDB server.

4. Install the necessary front-end dependencies by running the following command in the client directory:

```bash
  npm install
```

This will install all the necessary Node modules, including React, React Router, and any other front-end dependencies for this project.

5. Run the following command to start the server and build the client:

```bash
  npm run dev
```

The server will start on http://localhost:3000 by default.

Open the browser and navigate to http://localhost:3000 to access the application.

Please make sure that you have the latest version of node and npm installed in your machine, and also make sure to install mongodb and run it on your machine before running the project.

## API Reference

# User Service
## Login
```http
  POST /login
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` |  Username of the user trying to Login |
| `password` | `Number` | Password of the user trying to Login |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id` | `string` |  ID of the User logging in |
| `name` | `string` |  Name of the User logging in |
| `email` | `string` |  Email of the User logging in |
| `role` | `string` |  Role of the User logging in |
| `token` | `jwt.Token` |  Token of the User logging in |
| `registeredCourses` | `Array` | Array of the Courses the user is registerded in |
| `reviews` | `Array` |  Array of the Reviews of the User logging in |
| `rating` | `Array` |  Array of the Ratings of the User logging in |
| `Accepted` | `Boolean` |  Indication of whether the user Accepted the terms and conditions |
| `PaymentPolicyAccepted` | `Boolean` |  Indication of whether the user Accepted the payment policy |
| `wallet` | `Integer` |  Wallet amount of the User logging in |


## Register
```http
  POST /register
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string`|  First Name of the user trying to Register |
| `lastname` | `string` |  Last Name of the user trying to Register |
| `email` | `string` |  Email of the user trying to Register |
| `usrename` | `string` |  Username of the user trying to Register |
| `password` | `Number` | Password of the user trying to Register |
| `gender` | `string` | Gender of the user trying to Register |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id` | `string` |  ID of the User registering |
| `name` | `string` |  Name of the User registering |
| `username` | `string` |  Username of the User registering |
| `email` | `string` |  Email of the User registering |
| `role` | `string` |  Role of the User registering |
| `token` | `jwt.Token` |  Token of the User registering |
| `registeredCourses` | `Array` | Array of the Courses the registering user is registerded in |
| `reviews` | `Array` |  Array of the Reviews of the User registering |
| `rating` | `Array` |  Array of the Ratings of the User registering |
| `Accepted` | `Boolean` |  Indication of whether the registering user Accepted the terms and conditions |
| `PaymentPolicyAccepted` | `Boolean` |  Indication of whether the registering user Accepted the payment policy |
| `wallet` | `Integer` |  Wallet amount of the User registering |



## Updating User Information 
**This service can only be accessed by a logged in users**

```http
  POST /updateUserInfo
```
### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id` | `string` |  ID of the Logged in User  |
| `name` | `string` |  Name of the Logged in User  |
| `email` | `string` |  Email of the Logged in  User  |
| `role` | `string` |  Role of the Logged in User  |
| `token` | `jwt.Token` |  Token of the Logged in User  |
| `registeredCourses` | `Array` | Array of the Courses the Logged in user is registerded in |
| `reviews` | `Array` |  Array of the Reviews of the Logged in User  |
| `rating` | `Array` |  Array of the Ratings of the Logged in User  |
| `Accepted` | `Boolean` |  Indication of whether the Logged in user Accepted the terms and conditions |
| `PaymentPolicyAccepted` | `Boolean` |  Indication of whether the Logged in user Accepted the payment policy |
| `wallet` | `Integer` |  Wallet amount of the Logged in User  |



## Paying for a course 
**This service can only be accessed by a logged in users**

```http
  POST /payment
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount` | `Number`|  Amount of money to be payed by the logged in user |
| `id` | `string` |  ID of the payment method |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `message` | `string` |  Message returned from payment  |
| `success` | `boolean` | Indicating whether the payment was successful  |

# Guest Service
## Get All Courses

```http
  GET /guest/viewAllCourses
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array`  | An array of all courses in the system. |


## View Course Price

```http
  GET /guest/viewPrice
```

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the course |
| `price` | `string`| Price of the course |

## View Course From Results

```http
  POST /guest/searchCourse
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course |
| `subtitles` | `array` |Subtitles of the course|
| `subject` | `string` | Subject of the course |
| `rating` | `string` | Rating of the course|
| `hours` | `string` |Hours of the course |
| `hourspsubtitle` | `string` | Hours per subtitle |
| `price` | `number` |Price of the course |
| `discount` | `number` | Discount available  |


## Update User Country

```http
  POST /guest/selectCountry
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  User id |
| `country` | `string` |  User Country |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  User id |
| `country` | `string` |  User Country |


## Search For a Course

```http
  GET /guest/searchCourse
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchQuery` | `string` | Search query to get desired courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` | An array of courses matching search query |


## Filter Courses

```http
  PUT /guest/filterCourses
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |


# Admin Service
## Add Admin

```http
  POST /admin/addAdmin
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. New Admin's Username |
| `password` | `string` | **Required**. New Admin's Password |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | New Admin's id|
| `username` | `string` |New Admin's username|
| `password` | `string` | New Admin's password |
| `role` | `string` |New Admin's role |
| `token` | `jwt.token` | New Admin's token |


## Add Instructor

```http
  POST /admin/addInstructor
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. New Instructor's Username |
| `password` | `string` | **Required**. New Instructor's Password |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | New Instructor's id|
| `username` | `string` |New Instructor's username|
| `password` | `string` | New Instructor's password |
| `role` | `string` |New Instructor's role |
| `token` | `jwt.token` | New Instructor's token |

## Add Corporate Trainee

```http
  POST /admin/addCorporateTrainee
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. New Corporate Trainee's Username |
| `password` | `string` | **Required**. New Corporate Trainee's Password |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | New Corporate Trainee's id|
| `username` | `string` |New Corporate Trainee's username|
| `password` | `string` | New Corporate Trainee's password |
| `role` | `string` |New Corporate Trainee's role |
| `token` | `jwt.token` | New Corporate Trainee's token |

## Get All Courses

```http
  GET /admin/viewAllCourses
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` | An array of all courses in the system. |

## Filter Courses

```http
  PUT /admin/filterCourses
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |

## Setting Course Discount

```http
  PUT /admin/setDiscountCourses
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseIDs` | `Array` |  ID's of the courses to set a discount on |
| `discount` | `Integer` |  Discount percentage to be placed on the courses |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseUptaded`  | `Array` |An array of the updated courses |

## Get All Reports

```http
  GET /admin/viewAllReports
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problems`  | `Array` | An array of all reports in the system|

## Get All Unseen Reports

```http
  GET /admin/viewUnseenReports
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problems`  | `Array` | An array of all unseen reports in the system |

## Setting a Problem's Status

```http
  PUT /admin/setStatus
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the problem to change its status |
| `status` | `string` |  New status of the problem |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the changed problem |
| `status` | `string` |  Status of the changed problem |



## Get All Refund Requests

```http
  GET /admin/viewRequests
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `requests`  | `Array` | An array of all refund requests in the system |


## Reject a Refund Request

```http
  PUT /admin/rejectRefundRequest
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the refund request to reject |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the rejected refund request |

## Accept a Refund Request

```http
  PUT /admin/acceptRefundRequest
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the refund request to accept |
| `amount` | `Number` |  Amount of money to be refunded |
| `instructor` | `string` |  ID of the instructor giving the course to be refunded |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the accepted refund request |


## Get All Course Access Requests

```http
  GET /admin/viewCourseRequests
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `requests`  | `Array` | An array of all course Access requests in the system |



## Respond to a Course Access Request

```http
  PUT /admin/courseRequestResponse
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `instructorID` | `string` |  ID of the Corporate Trainee that made the request |
| `courseID` | `Number` |  ID of the requested Course |
| `allow` | `boolean` | Indication of whether to accept the request or not |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `issuerID` | `string` |  ID of the Corporate Trainee that made the request |
| `courseID` | `string` |  ID of the requested Course |


# Instructor Service
**All of the  following services can only be accessed by a logged in Instructor**
## Get All Courses

```http
  GET /instructor/viewAllCourses
```
### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` | An array of all courses in the system. |


## Get Courses of Instructor

```http
  GET /instructor/viewMyCourses
```
### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` | An array of all courses in the system created by the logged in Instructor |


## Get Prices of all Courses

```http
  GET /instructor/viewPrice
```
### Response
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` | An array of all titles of the courses in the system along with their price |


## Paying for a course 

```http
  POST /instructor/addCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course to be added |
| `price` | `Number` |  Price of the course to be added |
| `hours` | `Number` |  Credit Hours of the course to be added |
| `summary` | `string` |  Summary of the course to be added |
| `subject` | `string` |  Subject of the course to be added |
| `courseVideoPreview` | `string` |  Video path of the course to be added |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the added course |
| `subtitles` | `string` |  Subtitles of the added course |
| `price` | `Number` |  Price of the added course |
| `hours` | `Number` |  Credit Hours of the added course |
| `summary` | `string` |  Summary of the added course |
| `instructorId` | `string` |  ID of the instructor that added the course |
| `instructorName` | `string` |  Name of the instructor that added the course |
| `instructorRating` | `Array` |  Array of the Ratings of the instructor that added the course |
| `subject` | `string` |  Subject of the added course |
| `courseVideoPreview` | `string` |  Video path of the added course |


## Adding subtitle to a Course 

```http
  POST /instructor/addLinktoSubtitle
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course to add subtitles to |
| `subtitles` | `string` |  Subtitle title  to be added |
| `link` | `string` | Path to the video of the subtitle |
| `description` | `string` |  Description of the subtitle to be added |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `subtitle` | `string` |  Title of the added Subtitle |
| `link` | `string` |Path to the video of the added Subtitle |
| `description` | `string` |  Description of the added Subtitle |


## Adding Video Link to a Course 

```http
  POST /instructor/addLinktoCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course to add video link to |
| `courseVideoPreview` | `string` | Path to the video to be added of the course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the course the video link is added to |
| `courseVideoPreview` | `string` | Path to the added Video link of the course |


## Get a specific Course 

```http
  POST /instructor/filterMyCourses  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |

## Get a specific Course 
```http
  POST /instructor/filterCourses  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |


## Filter Courses given by Instructor

```http
  PUT /instructor/filterMyCourses  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses given by the logged in Instructor |


## Filter All Courses

```http
  PUT /instructor/filterCourses  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |


## Get a specific Course 
```http
  POST /instructor/searchCourse  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |


## Update User Country
```http
  POST /instructor/selectCountry  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the logged in Instructor |
| `country` | `string` |  Country chosen by the instructor |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the logged in Instructor |
| `country` | `string` |  Country set for the instructor |


## Update User Country
```http
  GET /instructor/searchCourse  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the logged in Instructor |
| `country` | `string` |  Country chosen by the instructor |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the logged in Instructor |
| `country` | `string` |  Country set for the instructor |


## Get a specific Course 
```http
  POST /instructor/inssearchCourse  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |



## Add an Exam to a Course 
```http
  POST /instructor/addExam  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` |  ID of the course to add an exam to |
| `title` | `string` |  Title of the Exam to be added |
| `questionList` | `Array` |  Array of the Exam Questions|
| `number` | `string` |  Number of the Exam to be added |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course that the Exam was added to |
| `subtitles` | `array` |Subtitles of the course that the Exam was added to|
| `subject` | `string` | Subject of the course that the Exam was added to |
| `rating` | `string` | Rating of the course that the Exam was added to|
| `hours` | `string` |Hours of the course that the Exam was added to |
| `price` | `number` |Price of the course that the Exam was added to |
| `discount` | `number` | Discount available of the course that the Exam was added to |
| `exams` | `Array` | Exams of the course that the Exam was added to|


## Edit Exam Answers of a Course
```http
  PUT /instructor/addExam  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` |  ID of the course that has the Exam to be edited |
| `examNumber` | `Number` |  Number of the Exam to be edited|
| `updatedQuestionList` | `Array` |  Updated Array of the Exam Questions |
| `title` | `string` |  New Title of the Exam to be eddited |


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course of the edited Exam |
| `subtitles` | `array` |Subtitles of the course of the edited Exam|
| `subject` | `string` | Subject of the course of the edited Exam |
| `rating` | `string` | Rating of the course of the edited Exam|
| `hours` | `string` |Hours of the course of the edited Exam |
| `price` | `number` |Price of the course of the edited Exam |
| `discount` | `number` | Discount available of the course of the edited Exam |
| `exams` | `Array` | Exams of the course of the edited Exam|


## Delete a specific Exam
```http
  DELETE /instructor/deleteExam  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` |  ID of the course that has the Exam to be deleted |
| `number` | `Number` |  Number of the Exam to be deleted|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course of the deleted Exam |
| `subtitles` | `array` |Subtitles of the course of the deleted Exam|
| `subject` | `string` | Subject of the course of the deleted Exam |
| `rating` | `string` | Rating of the course of the deleted Exam|
| `hours` | `string` |Hours of the course of the deleted Exam |
| `price` | `number` |Price of the course of the deleted Exam |
| `discount` | `number` | Discount available of the course of the deleted Exam |
| `exams` | `Array` | Exams of the course of the deleted Exam|




## Edit Publicity of a specific Exam
```http
  PUT /instructor/home  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` |  ID of the course that has the Exam to be edited |
| `number` | `Number` |  Number of the Exam to be edited|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course of the edited Exam |
| `subtitles` | `array` |Subtitles of the course of the edited Exam|
| `subject` | `string` | Subject of the course of the edited Exam |
| `rating` | `string` | Rating of the course of the edited Exam|
| `hours` | `string` |Hours of the course of the edited Exam |
| `price` | `number` |Price of the course of the edited Exam |
| `discount` | `number` | Discount available of the course of the edited Exam |
| `exams` | `Array` | Exams of the course of the edited Exam|


## Report a Problem

```http
  POST /instructor/reportAproblem  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem report|
| `text` | `string` | Body text of the problem report|
| `type` | `string` | Type of the problem report|
| `courseID` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem reported|
| `text` | `string` | Body text of the problem reported|
| `type` | `string` | Type of the problem reported|
| `courseID` | `string` | ID of the course regarding the problem reported|
| `issuerID` | `string` | ID of the user reporting the problem|    

## View all Problems

```http
  POST /instructor/viewProblem  
```

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `problems` | `Array` | Array containing all Problems in the system|

## View a certain Problems

```http
  POST /instructor/followUp  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `issuerID` | `string` | ID of the wanted Problem|
| `id` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem |
| `text` | `string` | Body text of the problem |
| `type` | `string` | Type of the problem |
| `courseID` | `string` | ID of the course regarding the problem |
| `status` | `string` |  Status of the problem| 


# Corporate Trainee Service
**All of the  following services can only be accessed by a logged in Corporate Trainee**
## Get All Courses

```http
  GET /corporateTrainee/viewAllCourses
```
### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `array` | An array of all courses in the system. |


## Get All Courses

```http
  GET /corporateTrainee/viewAllCourses
```
### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `array` | An array of all courses in the system. |


## Update User Country

```http
  POST /corporateTrainee/selectCountry
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  User id |
| `country` | `string` |  User Country |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  User id |
| `country` | `string` |  User Country |

## Filter Courses

```http
  PUT /corporateTrainee/filterCourses
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |


## Search For a Course

```http
  GET /corporateTrainee/searchCourse
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchQuery` | `string` | Search query to get desired course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course |
| `subtitles` | `array` |Subtitles of the course|
| `subject` | `string` | Subject of the course |
| `rating` | `string` | Rating of the course|
| `hours` | `string` |Hours of the course |
| `price` | `number` |Price of the course |
| `discount` | `number` | Discount available |
| `exams` | `array` | Exams of the course|


## Get All Registered Courses

```http
  POST /corporateTrainee/viewAllRegisterdCourses
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `registeredIDs` | `array` | Array of all registered courses ids|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array`  | An array of all registered courses |

## Answer Exam questions

```http
  POST /corporateTrainee/answerExam
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of course containing the exam|
| `exam_id` | `string` | Id of the exam being solved|
| `answerList` | `array` | List of user answers|


## Register To a Course

```http
  PUT /corporateTrainee/registerCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of course to be registered into|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array`  | Add the course to the array of all registered courses |


## Get an Exam

```http
  POST /corporateTrainee/getCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of course containing the exam|
| `examID` | `string` | Id of the exam being searched for|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `public` | `boolean`  | Is the exam public or not |
| `title` | `string`  | Title of the exam |
| `number` | `number`  | Number of the exam |
| `questions` | `array`  | List of exam questions |
| `courseID` | `string`  | Id of the course |
| `examID` | `string`  | Id of the exam |


## Get Exam Correct Answers

```http
  GET /corporateTrainee/getsolvedExams
```

### Response

| Parameter  | Type      | Description                       |
| :--------  | :-------  | :-------------------------------- |
| `examAnswers` | `array` | List of exam correct answers |


## Get a Single Course

```http
  POST /corporateTrainee/openCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course |
| `subtitles` | `array` |Subtitles of the course|
| `subject` | `string` | Subject of the course |
| `rating` | `string` | Rating of the course|
| `hours` | `string` |Hours of the course |
| `price` | `number` |Price of the course |
| `discount` | `number` | Discount available |
| `exams` | `array` | Exams of the course|


## Rate a Course

```http
  PUT /corporateTrainee/rateCourses
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the course|
| `newRating` | `string` | Rate given to the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the course|
| `rating` | `string` | New rating of the course|


## Rate an Instructor

```http
  PUT /corporateTrainee/rateInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `CourseId` | `string` | Id of the course given by this instructor|
| `newRating` | `string` | Rate given to the instructor|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `rating` | `string` | New rating of the instructor|


## Review a Course

```http
  PUT /corporateTrainee/reviewCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the course|
| `newReview` | `string` | Review given to the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the course|
| `reviews` | `string` | Added review to the course|


## Review an Instructor

```http
  PUT /corporateTrainee/reviewInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `newReview` | `string` | Review given to the instructor|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `reviews` | `string` | Added review to the instructor|


## View Course Video

```http
  GET /corporateTrainee/viewVideoCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of the course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseID` | `string` | Id of the course|
| `courseVideoPreview` | `string` | Url of course video|


## View Video Subtitles

```http
  GET /corporateTrainee/viewVideoSubtitle
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of the course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseID` | `string` | Id of the course|
| `subtitles` | `string` | Url of the video subtitle|


## Get Reviewed Course

```http
  PUT /corporateTrainee/getReviewCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the reviewed course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the reviewed course|


## Get Reviewed Instructor

```http
  PUT /corporateTrainee/getReviewInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the reviewed instructor|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the reviewed instructor|


## Request a Course

```http
  PUT /corporateTrainee/requestCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `issuerID` | `string` | Id of the user who issued the request|
| `courseID` | `string` | Id of the requested course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `issuerID` | `string` | Id of the user who issued the request|
| `courseID` | `string` | Id of the requested course|


## View Requested Courses

```http
  GET /corporateTrainee/viewMyRequests
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `issuerID` | `string` | Id of the logged in user|
| `courseID` | `string` | Id of the requested course|


## View Most Popular Course

```http
  GET /corporateTrainee/mostPopular
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course with most trainees|
| `subtitles` | `array` |Subtitles of the course with most trainees|
| `subject` | `string` | Subject of the course with most trainees|
| `rating` | `string` | Rating of the course with most trainees|
| `hours` | `string` |Hours of the course with most trainees|
| `price` | `number` |Price of the course with most trainees|
| `discount` | `number` | Discount available on the course with most trainees|
| `exams` | `array` | Exams of the course with most trainees|


## Accept the Payment Policy

```http
  PUT /corporateTrainee/acceptPolicy  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname` | `string` | First name of the logged in user |
| `lastname` | `string` |Last name of the logged in user|
| `username` | `string` |Username of the logged in user|
| `email` | `string` |Email of the logged in user|
| `registeredCourses` | `array` |Array of the registered Courses of the logged in user|
| `examAnswers` | `array` |Array of the exam Answers of the logged in user|
| `reviews` | `array`| Array of the Reviews of the logged in user|
| `rating` | `array` |Array of the Ratings of the logged in user|
| `Accepted` | `boolean` |Indicates whether the logged in user has accepted the Terms and Conditions|
| `PaymentPolicyAccepted` | `boolean` |Indicates whether the logged in user has accepted the Payment Policy|
| `wallet` | `Number` |Wallet amount of the logged in user|
| `biography` | `string` |Biography of the logged in user|

## View the First Name of the Corporate Trainee

```http
  GET /corporateTrainee/getfirstName  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname` | `string` | First name of the logged in Corporate Trainee |

## View the Last Name of the Corporate Trainee

```http
  GET /corporateTrainee/getlastName  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lastname` | `string` | Last name of the logged in Corporate Trainee |

## Send Completion Certificate to Corporate Trainee

```http
  PUT /corporateTrainee/sendEmail  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cname` | `string` | Name of the completed Course|

## Report a Problem

```http
  POST /corporateTrainee/reportAproblem  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem report|
| `text` | `string` | Body text of the problem report|
| `type` | `string` | Type of the problem report|
| `courseID` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem reported|
| `text` | `string` | Body text of the problem reported|
| `type` | `string` | Type of the problem reported|
| `courseID` | `string` | ID of the course regarding the problem reported|
| `issuerID` | `string` | ID of the user reporting the problem|    

## View all Problems

```http
  POST /corporateTrainee/viewProblem  
```

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `problems` | `Array` | Array containing all Problems in the system|

## View a certain Problems

```http
  POST /corporateTrainee/followUp  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `issuerID` | `string` | ID of the wanted Problem|
| `id` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem |
| `text` | `string` | Body text of the problem |
| `type` | `string` | Type of the problem |
| `courseID` | `string` | ID of the course regarding the problem |
| `status` | `string` |  Status of the problem|  
 


# Individual Trainee Service
**All of the  following services can only be accessed by a logged in Individual Trainee**

## Get all Courses
http
  GET /individualTrainee/viewAllCourses  


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array` | Array of the all the Courses in the system |

## Get prices of all Courses
http
  GET /individualTrainee/viewPrice  


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array` | Array of the all the Courses Title and Price in the system |


## Filter All Courses
http
  GET /individualTrainee/filterCourses  


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |



## Get a specific Course
http
  POST /individualTrainee/filterCourses  


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the wanted Course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |

## Get a specific Course
http
  POST /individualTrainee/searchCourse  


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` |  Title of the wanted Course |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` |  Title of the fetched course |
| `subtitles` | `string` |  Subtitles of the fetched course |
| `subject` | `string` |  Subject of the fetched course |
| `hours` | `Number` |  Credit Hours of the fetched course |
| `hourspsubtitle` | `Number` |  Hours per subtitle of the fetched course |
| `price` | `Number` |  Price of the fetched course |
| `discount` | `Number` |  Discount of the fetched course |


## Update User Country
http
  POST /individualTrainee/selectCountry  

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  ID of the logged in Individual Trainee |
| `country` | `string` |  Country chosen by the Individual Trainee |

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` |  ID of the logged in Individual Trainee |
| `country` | `string` |  Country set for the Individual Trainee |

## Search For a Course

```http
  GET /individualTrainee/searchCourse
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `searchQuery` | `string` | Search query to get desired course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course |
| `subtitles` | `array` |Subtitles of the course|
| `subject` | `string` | Subject of the course |
| `rating` | `string` | Rating of the course|
| `hours` | `string` |Hours of the course |
| `price` | `number` |Price of the course |
| `discount` | `number` | Discount available |
| `exams` | `array` | Exams of the course|


## Get All Registered Courses

```http
  POST /individualTrainee/viewAllRegisterdCourses
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `registeredIDs` | `array` | Array of all registered courses ids|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array`  | An array of all registered courses |


## Answer Exam questions

```http
  POST /individualTrainee/answerExam
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of course containing the exam|
| `exam_id` | `string` | Id of the exam being solved|
| `answerList` | `array` | List of user answers|

## Register To a Course

```http
  PUT /individualTrainee/registerCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of course to be registered into|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses` | `array`  | Add the course to the array of all registered courses |

## Get an Exam

```http
  POST /individualTrainee/getCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of course containing the exam|
| `examID` | `string` | Id of the exam being searched for|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `public` | `boolean`  | Is the exam public or not |
| `title` | `string`  | Title of the exam |
| `number` | `number`  | Number of the exam |
| `questions` | `array`  | List of exam questions |
| `courseID` | `string`  | Id of the course |
| `examID` | `string`  | Id of the exam |


## Get Exam Correct Answers

```http
  GET /individualTrainee/getsolvedExams
```

### Response

| Parameter  | Type      | Description                       |
| :--------  | :-------  | :-------------------------------- |
| `examAnswers` | `array` | List of exam correct answers |

## Get Reviewed Course

```http
  PUT /individualTrainee/getReviewCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the reviewed course|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the reviewed course|


## Get Reviewed Instructor

```http
  PUT /individualTrainee/getReviewInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the reviewed instructor|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the reviewed instructor|

## Rate a Course

```http
  PUT /individualTrainee/rateCourses
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the course|
| `newRating` | `string` | Rate given to the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the course|
| `rating` | `string` | New rating of the course|


## Rate an Instructor

```http
  PUT /individualTrainee/rateInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `CourseId` | `string` | Id of the course given by this instructor|
| `newRating` | `string` | Rate given to the instructor|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `rating` | `string` | New rating of the instructor|


## Review a Course

```http
  PUT /individualTrainee/reviewCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `course_id` | `string` | Id of the course|
| `newReview` | `string` | Review given to the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `course_id` | `string` | Id of the course|
| `reviews` | `string` | Added review to the course|


## Review an Instructor

```http
  PUT /individualTrainee/reviewInstructor
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `newReview` | `string` | Review given to the instructor|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Instructor_id` | `string` | Id of the instructor|
| `reviews` | `string` | Added review to the instructor|

## Filter Courses

```http
  PUT /individualTrainee/filterCourses
```

### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject` | `string` |  Subject of wanted courses |
| `startPrice` | `Integer` |   Lowest price of wanted courses |
| `endPrice` | `Integer` |  Highest price of wanted courses|
| `startRate` | `string` |   Lowest Rate of wanted courses|
| `endRate` | `string` |   Highest Rate of wanted courses|

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courses`  | `Array` |An array of filtered courses |


## Accept the Payment Policy

```http
  PUT /individualTrainee/acceptPolicy  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname` | `string` | First name of the logged in user |
| `lastname` | `string` |Last name of the logged in user|
| `username` | `string` |Username of the logged in user|
| `email` | `string` |Email of the logged in user|
| `registeredCourses` | `array` |Array of the registered Courses of the logged in user|
| `examAnswers` | `array` |Array of the exam Answers of the logged in user|
| `reviews` | `array`| Array of the Reviews of the logged in user|
| `rating` | `array` |Array of the Ratings of the logged in user|
| `Accepted` | `boolean` |Indicates whether the logged in user has accepted the Terms and Conditions|
| `PaymentPolicyAccepted` | `boolean` |Indicates whether the logged in user has accepted the Payment Policy|
| `wallet` | `Number` |Wallet amount of the logged in user|
| `biography` | `string` |Biography of the logged in user|


## Get Instructor Ratings

```http
  PUT /individualTrainee/getInstructorRatings
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `instructorId` | `string` | Id of the instructor|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `rating` | `array` | List of instructor ratings |


## Request a Refund

```http
  POST /individualTrainee/requestRefund
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount` | `number` | Price of the course |
| `percent` | `number` | Percent of course completion|
| `issuerID` | `string` | Id of usered who issued the request |
| `courseID` | `string` | Id of the requested course|
| `userName` | `string` |First and last name of the issuer |
| `courseName` | `string` |Name of the course |


## Get a Single Course

```http
  POST /individualTrainee/openCourse
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `string` | Id of the course|


### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | Title of the course |
| `subtitles` | `array` |Subtitles of the course|
| `subject` | `string` | Subject of the course |
| `rating` | `string` | Rating of the course|
| `hours` | `string` |Hours of the course |
| `price` | `number` |Price of the course |
| `discount` | `number` | Discount available |
| `exams` | `array` | Exams of the course|

## View the First Name of the Individual Trainee

```http
  GET /individualTrainee/getfirstName  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname` | `string` | First name of the logged in Individual Trainee |

## View the Last Name of the Individual Trainee

```http
  GET /individualTrainee/getlastName  
```

### Response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lastname` | `string` | Last name of the logged in Individual Trainee |

## Send Completion Certificate to Individual Trainee

```http
  PUT /individualTrainee/sendEmail  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cname` | `string` | Name of the completed Course|

## Report a Problem

```http
  POST /individualTrainee/reportAproblem  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem report|
| `text` | `string` | Body text of the problem report|
| `type` | `string` | Type of the problem report|
| `courseID` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem reported|
| `text` | `string` | Body text of the problem reported|
| `type` | `string` | Type of the problem reported|
| `courseID` | `string` | ID of the course regarding the problem reported|
| `issuerID` | `string` | ID of the user reporting the problem|    

## View all Problems

```http
  POST /individualTrainee/viewProblem  
```

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `problems` | `Array` | Array containing all Problems in the system|

## View a certain Problems

```http
  POST /individualTrainee/followUp  
```
### Request

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `issuerID` | `string` | ID of the wanted Problem|
| `id` | `string` | ID of the course regarding the problem report|

### Response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | Title of the problem |
| `text` | `string` | Body text of the problem |
| `type` | `string` | Type of the problem |
| `courseID` | `string` | ID of the course regarding the problem |
| `status` | `string` |  Status of the problem|  
 








# Tests
##### Testing was done using Postman API to test the backend behaviour prior to the development of the frontend


## Logging in


POST http://localhost:8000/login

### Using Invalid Credentials
### Body



    "username": "User11",
    "password": "12345",



### Response


Invalid credentials

### Using Valid Credentials
### Body



    "username": "User11",
    "password": "1234",



### Response




    "_id": "638e407dc457af2d1255409c",
    "email": "a@bc.com",
    "role": "Individual Trainee",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGU0MDdkYzQ1N2FmMmQxMjU1NDA5YyIsImlhdCI6MTY3Mzk2NjYwMCwiZXhwIjoxNjc2NTU4NjAwfQ.w5MN_n0qmoyxqKt3y-wMFnpAXVKq2p8wyoEFNa6OlQ0",
    "registeredCourses": [
        "636555bd40fa76e3a2d9478b",
        "6367c5f429efeb8eb8c9d90d",
        "636ad7159f9f81564d15974b",
        "636ad9759f9f81564d15974d",
        "6386821eff32c92c96ca6bbd",
        "63b1d2c081d34e30f711c760",
        "63935967fd512083439abba2",
        "63936f1363d407ecd3b76866",
        "63a1941ba05675a59a605c3c",
        "6367cc3155b85b97b62ed46b",
        "639900fbd422a9824f05c99e",
        "63b6eaa65637f10f90866921",
        "63b6f033061b9d265ef249fa",
        "63b6f1b509f3bc174a220b7a",
        "639904a3d422a9824f05c9f2",
        "6395c1733d69fe4094b31ebe",
        "636ad87f9f9f81564d15974c"
    ],
    "reviews": [],
    "rating": [],
    "Accepted": false,
    "PaymentPolicyAccepted": true,
    "wallet": 530



## Instructor filtering his Courses


PUT http://localhost:8000/instructor/filterMyCourses

### Body


    "startPrice": "50",
    "endPrice": "250"



### Response



    {
        "_id": "63a9ed5cd1c3d32bc6ca069a",
        "instructor_id": "63932dbdf0c913be6d458d0e",
        "instructor_name": "Joe Ahmed",
        "title": "Science Course",
        "price": 250,
        "discount": 0,
        "summary": "Course about Science",
        "hours": "13",
        "rating": [
            "0"
        ],
        "reviews": [],
        "subject": "Science",
        "courseVideoPreview": "Test video preview",
        "exams": [],
        "subtitles": [],
        "createdAt": "2022-12-26T18:52:12.059Z",
        "updatedAt": "2023-01-15T14:28:10.764Z",
        "__v": 0
    },

    {
        "_id": "63b1c8ab2ff0f4ebe6d233c8",
        "instructor_id": "63932dbdf0c913be6d458d0e",
        "instructor_name": "Joe Ahmed",
        "title": "newTestCourse",
        "price": 200,
        "discount": 0,
        "summary": "summarytest",
        "hours": "13",
        "rating": [
            "0"
        ],
        "reviews": [],
        "subject": "newTest",
        "courseVideoPreview": "test",
        "exams": [],
        "subtitles": [],
        "createdAt": "2023-01-01T17:53:47.673Z",
        "updatedAt": "2023-01-15T14:28:10.870Z",
        "__v": 0
    }


## Instructor viewing his Ratings and Reviews


GET http://localhost:8000/instructor/viewMyRatingAndReviews



### Response


    "rating": [
        "2",
        "4",
        "5",
        "1",
        "3",
        "4",
        "1",
        "4",
        "5",
        "3",
        "5",
        "3",
        "5",
        "5",
        "5",
        "5",
        "3"
    ],
    "reviews": [
        "Best Instructor",
        "Average Instructor",
        "best joe",
        "best joe from corp"
    ]


## Instructor viewing his Courses' Ratings and Reviews


PUT http://localhost:8000/instructor/viewMyCoursesRatingAndReviews

### Body


    "id": "63b1d2c081d34e30f711c760",
   


### Response


    {
        "_id": "63b1d2c081d34e30f711c760",
        "rating": [
            "0",
            "5",
            "5"
        ],
        "reviews": [
            "best course",
            "best course from corp"
        ]
    }


## Instructor deleting an Exam


DELETE http://localhost:8000/instructor/deleteExam

### Body


    "courseID": "6386821eff32c92c96ca6bbd",
    "number": "1",
   


### Response


    {
    "instructorRating": [],
    "reviews": [],
    "closed": false,
    "_id": "6386821eff32c92c96ca6bbd",
    "instructor_id": "63867f00ee6e953504512149",
    "title": "Course about History2",
    "subtitles": [
        {
            "0": "h",
            "1": "i",
            "2": "s",
            "3": "t",
            "4": "o",
            "5": "r",
            "6": "y",
            "7": "2",
            "8": ",",
            "9": "3",
            "10": ",",
            "11": "4",
            "_id": "63c6ce82ce4da90ce0d8b920"
        }
    ],
    "price": 250,
    "summary": "a short fun course",
    "hours": "14",
    "rating": [
        "3",
        "3",
        "3",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "3",
        "3"
    ],
    "subject": "math",
    "exams": [
        {
            "number": 1,
            "title": "Histo1234",
            "questions": [
                {
                    "number": 1,
                    "text": "Q3",
                    "choiceA": "ABC",
                    "choiceB": "NN",
                    "choiceC": "33",
                    "choiceD": "NJN",
                    "answer": "b",
                    "_id": "63924faa74b2efee32932f06"
                },
                {
                    "number": 2,
                    "text": "Q495",
                    "choiceA": "123",
                    "choiceB": "123",
                    "choiceC": "123",
                    "choiceD": "D",
                    "answer": "d",
                    "_id": "63924faa74b2efee32932f07"
                }
            ],
            "public": false,
            "_id": "63c6ce82ce4da90ce0d8b919"
        },
        {
            "number": 2,
            "title": "Histo12345678",
            "questions": [
                {
                    "number": 1,
                    "text": "Q12",
                    "choiceA": "ABC",
                    "choiceB": "ABC",
                    "choiceC": "ABC",
                    "choiceD": "D",
                    "answer": "d",
                    "_id": "63924fdb74b2efee32932f51"
                },
                {
                    "number": 2,
                    "text": "Q12344",
                    "choiceA": "1234",
                    "choiceB": "1234",
                    "choiceC": "1234",
                    "choiceD": "DDDD",
                    "answer": "d",
                    "_id": "63924fdb74b2efee32932f52"
                }
            ],
            "public": false,
            "_id": "63c6ce82ce4da90ce0d8b91c"
        }
    ],
    "createdAt": "2022-11-29T22:05:18.657Z",
    "updatedAt": "2023-01-17T16:36:18.741Z",
    "__v": 0,
    "discount": 0,
    "numOfTrainees": 1,
    "courseVideoPreview": "https://www.youtube.com/embed/-0exw-9YJBo",
    "public": true
}


## Instructor editing publicity of Course


POST http://localhost:8000/instructor/editPublicityCourse

### Body


    "courseID": "63b1ccc3fabd3ba39643ce6a"


### Response


    "numOfTrainees": 0,
    "closed": false,
    "_id": "63b1ccc3fabd3ba39643ce6a",
    "instructorId": "63932dbdf0c913be6d458d0e",
    "instructorName": "Joe Ahmed",
    "title": "test2",
    "price": 200,
    "discount": 0,
    "summary": "testsum",
    "hours": "17",
    "rating": [
        "0",
        "5"
    ],
    "reviews": [],
    "subject": "test",
    "courseVideoPreview": "test",
    "exams": [],
    "subtitles": [],
    "createdAt": "2023-01-01T18:11:15.543Z",
    "updatedAt": "2023-01-17T16:45:30.753Z",
    "__v": 0,
    "instructorRating": [
        "5",
        "5"
    ],
    "public": true


## Instructor following up on a reported problem


POST http://localhost:8000/instructor/followUp


### Body



    "id": "63aa23be1c8492d7f0c4d6d8",
    "issuerID": "638e407dc457af2d1255409c",



### Response



    "_id": "63aa23be1c8492d7f0c4d6d8",
    "type": "financial",
    "title": "Sec Problem",
    "text": "Lorem",
    "status": "Pending",
    "courseID": "635acd2e36a221bfaebcf130"



## Individual Trainee requesting a Course Refund


POST http://localhost:8000/individualTrainee/requestRefund

### Body




    "CourseId": "636555bd40fa76e3a2d9478b",



### Response


{

    "amount": 100,
    "percent": 40,
    "issuerID": "638e407dc457af2d1255409c",
    "courseID": "636555bd40fa76e3a2d9478b",
    "userName": "Ahmed Kayed",
    "courseName": "course2"
}


## Individual Trainee reviewing a Course


PUT http://localhost:8000/individualTrainee/reviewCourse

### Body



    "course_id": "63b1d2c081d34e30f711c760",
    "newReview": "Fantastic Course",



### Response



    "numOfTrainees": 0,
    "public": false,
    "closed": false,
    "_id": "63b1d2c081d34e30f711c760",
    "instructorId": "63932dbdf0c913be6d458d0e",
    "instructorName": "Joe Ahmed",
    "instructorRating": [
        "5",
        "3"
    ],
    "title": "test3",
    "price": 300,
    "discount": 0,
    "summary": "testsum3",
    "hours": "16",
    "rating": [
        "0",
        "5",
        "5"
    ],
    "reviews": [
        "best course",
        "best course from corp",
        "Fantastic Course",
    ],
    "subject": "test3",
    "courseVideoPreview": "test",
    "exams": [],
    "subtitles": [],
    "createdAt": "2023-01-01T18:36:48.654Z",
    "updatedAt": "2023-01-17T16:37:33.635Z",
    "__v": 0



## Individual Trainee getting the reviews of an Instructor


PUT http://localhost:8000/individualTrainee/getReviewInstructor

### Body



    "Instructor_id": "63932dbdf0c913be6d458d0e",



### Response



    "PaymentPolicyAccepted": false,
    "wallet": 0,
    "_id": "63932dbdf0c913be6d458d0e",
    "firstname": "Joe",
    "lastname": "Ahmed",
    "username": "joe91",
    "password": "$2a$10$v/gtNoKvBRitHbuRb6F/1.b/DBNeCGdncZKlH5Pm0uBR1j/sj1o1u",
    "email": "nourrhan.hazem@gmail.com",
    "gender": "male",
    "role": "Instructor",
    "registeredCourses": [],
    "reviews": [
        "Best Instructor",
        "Average Instructor",
        "best joe",
        "best joe from corp"
    ],
    "rating": [
        "5",
        "5",
        "5",
        "3"
    ],
    "examAnswers": [],
    "createdAt": "2022-12-09T12:44:45.311Z",
    "updatedAt": "2023-01-14T01:37:59.522Z",
    "__v": 0,
    "Accepted": true



## Individual Trainee viewing all Courses


GET http://localhost:8000/individualTrainee/viewAllCourses


### Response



    {
        "closed": false,
        "_id": "63659c3eed53970a35e980e4",
        "title": " TEST FARAH2",
        "hours": "8",
        "rating": [
            "0"
        ],
        "discount": 0
    },
    {
        "closed": false,
        "_id": "636ad7159f9f81564d15974b",
        "title": "MET",
        "price": 200,
        "hours": "8",
        "rating": [
            "0",
            "4"
        ],
        "discount": 0
    },
    {
        "closed": false,
        "_id": "636ad87f9f9f81564d15974c",
        "title": "Mechatronics",
        "hours": "6",
        "rating": [
            "0"
        ],
        "discount": 0
    },
    {
        "closed": false,
        "_id": "63b1d2c081d34e30f711c760",
        "title": "test3",
        "price": 300,
        "discount": 0,
        "hours": "16",
        "rating": [
            "0",
            "5",
            "5"
        ]
    },
    {
        "closed": false,
        "_id": "63b6eaa65637f10f90866921",
        "title": "AKCourse",
        "price": 120,
        "discount": 0,
        "hours": "4",
        "rating": [
            "0",
            "4"
        ]
    },
    {
        "closed": false,
        "_id": "63b6f033061b9d265ef249fa",
        "title": "AKCourse 2",
        "price": 100,
        "discount": 0,
        "hours": "4",
        "rating": [
            "0"
        ]
    }


## Admin add Instructor


POST http://localhost:8000/admin/addInstructor


### Body


    "username": "Abanob",
    "issuerID": "1234",

### Response



    "_id": "63c6d2a8e54c4e15967e0c03",
    "username": "Abanob",
    "password": "$2a$10$Xc0/MThK/NAQIx9owU6EKuYbzCf5XjpDF8H5Yp5V/cNWILfC2fOGu",
    "role": "Instructor",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzZkMmE4ZTU0YzRlMTU5NjdlMGMwMyIsImlhdCI6MTY3Mzk3NDQ0MCwiZXhwIjoxNjc2NTY2NDQwfQ.UECw96KhGBzCXg6yVP5R_hWMLTm6pu6hBAu_8AJjgpk"



## Admin view all Reports


GET http://localhost:8000/admin/viewAllReports



### Response

    {
        "_id": "63a9e9ac1c8492d7f0c4d6d1",
        "type": "other",
        "title": "testing a problem pt3",
        "text": "horrible course for me ",
        "status": "seen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130"
    },
    {
        "_id": "63aa23be1c8492d7f0c4d6d8",
        "type": "financial",
        "title": "Sec Problem",
        "text": "Lorem",
        "status": "Pending",
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "635acd2e36a221bfaebcf130"
    },
    {
        "_id": "63c41654a4bbd8a33f3b93a5",
        "title": "testing a problem",
        "text": "horrible course for me ",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c416b00fedf7aa4f5c2ba5",
        "title": "testing a problem",
        "text": "horrible course for me pt2",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c416db58ebdaada4cf1486",
        "title": "testing a problem",
        "text": "horrible course for me pt3",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c416f29165075b80053bee",
        "title": "testing a problem",
        "text": "horrible course for me pt4",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c41752a203584bc429f6f4",
        "title": "testing a problem",
        "text": "horrible course for me pt5",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c433ac215a9db5a9a0d50f",
        "title": "testing a problem",
        "text": "horrible course for me pt6",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c433d2c1adea0969f476f0",
        "title": "testing a problem",
        "text": "horrible course for me pt7",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c43413fd62b405f4b482f9",
        "title": "testing a problem",
        "text": "horrible course for me pt8",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c43ffee37069af20724de7",
        "title": "testing a problem pt2",
        "text": "horrible course for me ",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c4405e675e58b62ad8ee93",
        "title": "testing a problem pt2",
        "text": "horrible course for me ",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c4410a8c63a779ab206fc9",
        "title": "testing a problem pt3",
        "text": "horrible course for me ",
        "type": "other",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "635acd2e36a221bfaebcf130",
        "__v": 0
    },
    {
        "_id": "63c60355782ea3ec67c60a7b",
        "title": "testing fr",
        "text": "hello World",
        "type": "Technical",
        "status": "Unseen",
        "issuerID": "6395c12a3d69fe4094b31eb9",
        "courseID": "6395c1733d69fe4094b31ebe",
        "__v": 0
    },
    {
        "_id": "63c68742782ea3ec67c617a5",
        "title": "testing individual",
        "text": "hello World",
        "type": "Technical",
        "status": "Unseen",
        "issuerID": "639b2f2645fab6b17a630e4d",
        "courseID": "639900fbd422a9824f05c99e",
        "__v": 0
    }



## Admin viewing Course Refund Requests


Get http://localhost:8000/admin/viewRequests


### Response



    {
        "_id": "63b48936d058de3ff13a1b03",
        "text": "faqadt el sha8af",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4a3374a725b7f2c1d0d67",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4a7522f4a257281a377cc",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4a7a9a3a1e85f4fce561f",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4a88ca3a1e85f4fce580c",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4a8fd297c9fa509825f72",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4ad47efdd7a44cb9c2b43",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63b4af62efdd7a44cb9c2d32",
        "amount": 0,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63a1941ba05675a59a605c3c",
        "userName": "Ahmed Kayed",
        "courseName": "New Course",
        "__v": 0
    },
    {
        "_id": "63b4b3af24a0811ed8b59497",
        "amount": 300,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "63b1d2c081d34e30f711c760",
        "userName": "Ahmed Kayed",
        "courseName": "test3",
        "__v": 0
    },
    {
        "_id": "63c6c4234ff3be3356851d61",
        "amount": 100,
        "percent": 40,
        "issuerID": "638e407dc457af2d1255409c",
        "courseID": "636555bd40fa76e3a2d9478b",
        "userName": "Ahmed Kayed",
        "courseName": "course2",
        "__v": 0
    }


## Admin viewing Course Requests


GET http://localhost:8000/admin/viewCourseRequests

### Response


    {
        "instructor": {
            "_id": "63b21f9e4462ea2ece55c70a"
        },
        "course": {
            "_id": "636ad9759f9f81564d15974d",
            "title": "IET",
            "price": 170
        }
    },
    {
        "instructor": {
            "_id": "63b21f9e4462ea2ece55c70a"
        },
        "course": {
            "_id": "6367cc3155b85b97b62ed46b",
            "title": "TestCourse2111234",
            "price": 120
        }
    }

## How To Use?

Using this project is easy. Once the project is set up and running, you can access the application by navigating to http://localhost:3000 in your web browser.

Here are some examples of how to use the project as an individual trainee:

- When the user first accesses the website, they have the option to either log in, signup or proceed as a guest user.
- Once the user completes the registration process, they will have access to all the features of the website.
- The user will be presented with a brief guide that assists them in navigating the website.
- A list of the user's enrolled courses will then be displayed, which will initially be empty.
- The user can access a list of all available courses by clicking the "View all courses" button, then they can search for the course they are interested in and proceed to enroll in it.
- When the user clicks the "Register to this course" button, if the course is free, it will be automatically added to their list of enrolled courses. If the course requires payment, a pop-up window will appear, where the user will be prompted to enter their credit card information to complete the payment. Once the payment is processed, the course will be added to their list of enrolled courses.
- The user can now access the pre-recorded videos of the course, take notes, and utilize other features such as quizzes, discussions and more.
- If at any point the user wishes to request a refund for a course, they can do so by clicking the "Send refund request" button and providing a reason for the request. Then, the admin will either accept or reject the request. However, this option is only available if the user has completed less than 50% of the course.
- Upon successfully completing a course, the user will be awarded a certificate of completion, which they can download as a pdf to keep as a record of their achievement by clicking the "Download as pdf" button, or choose to be sent to his email.

Here are some examples of how to use the project as an instructor:

- When the instructor first accesses the website, he needs to login to his pre-created account using the username and password.
- Once the instructor logs in, he will have access to all the features of the website.
- The instructor will be presented with a brief guide that assists him in navigating the website.
- Initially, the instructor will be viewed all his courses, and whether they have been published or not, and view all his ratings and reviews.
- He can search for any of his courses or filter them based on price or rating.
- The instructor will then have the ability to edit the visibility of any course, making it accessible to both individual and corporate trainees.
- After publishing a course, the instructor will have the capability to view the ratings and reviews left by other users for that course.
- Additionally, the instructor can add an exam to any of his courses by selecting the "Add an exam" button, which is visible for each course.
- The instructor will also have the ability to edit any of the current exams for his courses by clicking the "Edit exam" button.

Here are some examples of how to use the project as a corporate trainee:

- When the user first accesses the website, they have the option to either log in, signup or proceed as a guest user.
- Once the user completes the registration process, they will have access to all the features of the website.
- The user will be presented with a brief guide that assists them in navigating the website.
- A list of the user's enrolled courses will then be displayed, which will initially be empty.
- The user can access a list of all available courses by clicking the "View all courses" button, then they can search for the course they are interested in and proceed to enroll in it.
- When the user clicks the "Register to this course" button, if the course is free, it will be automatically added to their list of enrolled courses. If the course requires payment, a request will be sent to the admin to either accept and unlock the course free of charge to the user or reject his request.
- The user can now access the pre-recorded videos of the course, take notes, and utilize other features such as quizzes, discussions and more.
- Upon successfully completing a course, the user will be awarded a certificate of completion, which they can download as a pdf to keep as a record of their achievement by clicking the "Download as pdf" button, or choose to be sent to his email.
## Contributing

We welcome and appreciate any contributions to this project. If you would like to contribute, please follow these steps:

- Fork the repository and clone it to your local machine.

- Create a new branch for your changes and make your changes.

- Run the tests and ensure that they pass before submitting your pull request.

- Submit a pull request to the develop branch of the repository.

- The pull request will be reviewed and merged if it is deemed to be a good fit for the project.

- Please make sure that your code is well commented and follows the project's coding style.

- If you have any questions or concerns, please open an issue or contact the project maintainers.


Thank you for considering to contribute to this project!


## Credits

This project would not have been possible without the help and support of the following people and resources:

- Team members:
  - Ahmed Kayed
  - Youssef Ahmed Salah
  - Abanob Kamal
  - Farah Afifi
  - Nourhan Hegazy
- Dr. Mohamed Kapiel who was very helpful and supportive throughout the project.
- Full playlist explaining MERN Stack:
  - https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm
  
- Tutorials and documentation for Express.js:
  - https://expressjs.com/en/starter/installing.html

- Sample code and examples from other open-source projects that use Mongoose:
  - https://github.com/Automattic/mongoose

- Blog posts, articles, and forum discussions on topics related to React:
  - https://reactjs.org/tutorial/tutorial.html

- Stack Overflow and other Q&A forums that provide solutions to common problems encountered during development:
  - https://stackoverflow.com/questions/tagged/javascript

We would like to express our gratitude to all those who have contributed to this project in any way.

We also would like to thank the customers, users, and testers for trying our app and providing feedback and suggestions.
## License

MIT License: Permits free use, distribution, and modification of software with the condition that the original copyright notice and the license's disclaimer are included in the modified versions of the software.

[MIT](https://choosealicense.com/licenses/mit/)

Apache License: Allows for free use, distribution, and modification of software, but also allows for the use of the software in closed-source projects as long as the original copyright notice is included.

[Apache](https://www.apache.org/licenses/LICENSE-2.0)
