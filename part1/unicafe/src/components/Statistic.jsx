export default function Statistic({ good, neutral, bad, total, average }) {
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <tr>
            <td>all</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{Number.isNaN(average) ? 0 : average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{Number.isNaN(average) ? 0 : (good / total) * 100} %</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
