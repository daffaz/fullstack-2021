import Header from "./components/Header";
import Part from "./components/Part";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const total = parts.reduce((total, current) => {
    return total + current.exercises;
  }, 0);

  const listPart = parts.map((part) => (
    <Part key={part.exercises} content={part.name} />
  ));

  return (
    <div>
      <Header title={course} />
      {listPart}
      <Part content={`total course = ${total}`} />
    </div>
  );
};

export default App;
