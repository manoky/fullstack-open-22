const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  return (
    <div>
      <b>Number of exercises {total}</b>
    </div>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, curr) => sum + curr.exercises, 0);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
