export default async function Dashboard() {

  const tasks = await fetch(process.env.URL + '/api/tasks');
  const taskData = await tasks.json();
  return (
    <div>
      This is the dashboard

      <ol>
        {taskData.map((task:{id:number, name:string, description:string}) =>
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </li>
        )}
      </ol>
    </div>
  );
}
