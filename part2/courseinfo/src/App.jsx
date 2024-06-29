const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => {
  const total = sum.reduce((acc,part) => acc + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  parts.map(subject => { 
    return (
      <>
        <Header course={subject.name} />
        {subject.parts.map(part => {
          return (
            <>
              <Part part={part}/>
            </>
          )
        })}
        <Total sum={subject.parts} />
      </>
    );
  });

const Course = ({ course }) => {

  var result = course.map(subject => ({id: subject.id, name: subject.name, parts: subject.parts}))
  return(
     <>
       <Content parts={result} />
     </>
  )
}

const App = () => {
  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
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
      id: 2,
      name: 'Node.js',
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
  return <Course course={course}/>
}

export default App