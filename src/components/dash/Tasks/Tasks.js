import React from 'react';
import TaskList from "./TaskList/TaskList";
import './Tasks.scss';

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
    return (
        <>
            <div className={'task-mapContainer'}>
                <h2>These are the tasks:</h2>
                {tasks.length === 0 ? (
                    <>
                        <div>No tasks to display.</div>
                        <br/>
                    </>
                ) : (
                    tasks.map((task, index) => (
                        <TaskList
                            key={index}
                            task={task}
                            onStatusChange={onStatusChange}
                            onTaskRemove={onTaskRemove}
                        />
                    ))
                )}
            </div>
            <button onClick={onClearTasks}>Clear Tasks</button>
        </>
    );
}

export default Tasks;