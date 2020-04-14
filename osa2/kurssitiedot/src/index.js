import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course, id) => 
      <Course course={course} key={id} />
      )}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
