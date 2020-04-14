import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part part={part} key={part.id} />
        )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <div>
        {part.name} {part.exercises}
      </div>
    )
  }
  
  const Total = ({ course }) => {
    const exercises = course.parts.map(part => part.exercises)
    const total = exercises.reduce( ( accumulator, currentValue ) => accumulator + currentValue)
    return (
      <div>
        <strong>total of {total} exercises</strong>
      </div>
    )
  }

  export default Course