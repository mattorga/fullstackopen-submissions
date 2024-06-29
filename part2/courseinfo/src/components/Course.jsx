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
      <div key={subject.id}>
        <Header key={subject.id} course={subject.name} />
        {subject.parts.map(part => {
          return (
            <div key={part.id}>
              <Part key={part.id} part={part}/>
            </div>
          )
        })}
        <Total sum={subject.parts} />
      </div>
    );
});


const Course = ({ course }) => <Content parts={course} />

export default Course