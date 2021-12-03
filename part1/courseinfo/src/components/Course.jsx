import Content from './Content';

export default function Course({ course }) {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((course) => {
        return (
          <Content
            key={course.id}
            name={course.name}
            exercise={course.exercises}
          />
        );
      })}
      <h4>
        total of {course.parts.reduce((sum, val) => sum + val.exercises, 0)}
      </h4>
    </div>
  );
}
