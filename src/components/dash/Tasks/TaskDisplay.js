import React, {useEffect, useState} from 'react';
import MainMenu from "../MainMenu/MainMenu";
import TaskForm from "./Form/TaskForm";
import {collection, deleteDoc, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";
import Tasks from "./Tasks";
import './Tasks.scss';

const TaskDisplay = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    //load the data from the firestore database
    useEffect(() => {
        //IIFE - Immediately Invoked Function Expression
        (async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "tasks"));
                const fetchedTasks = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const handleClearTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const deletePromises = querySnapshot.docs.map(async doc => {
                await deleteDoc(doc.ref);
            });
            await Promise.all(deletePromises);
            setTasks([]);
        } catch (error) {
            console.error("Error clearing tasks:", error);
        }
    };

    const handleStatusChange = (id) => {
        const updatedTasks = [...tasks];
        updatedTasks.forEach((task) => {
            if (task.id === id) {
                task.done = !task.done;
            }
        });
        setTasks(updatedTasks);
    }

    const handleTaskRemove = (id) => {
        const filteredTasks = tasks.filter(
            (task) => task.id !== id
        );
        setTasks(filteredTasks);
    }

    //Adding a new task
    const handleAddTask = (description, taskId, status) => {
        setTasks([
            ...tasks,
            {
                description: description,
                id: taskId,
                done: status === 'completed'
            }
        ]);
    }

    return (
        <>
            <MainMenu/>
            <div className="app-container">
                {loading ? (
                    <>
                    <p>Loading...</p>
                    </>
                ) : (
                    <>
                        <div className="form-container">
                            <TaskForm onAddTask={handleAddTask}/>
                        </div>

                        <div className="tasks-container">
                            <Tasks
                                tasks={tasks}
                                onStatusChange={handleStatusChange}
                                onTaskRemove={handleTaskRemove}
                                onClearTasks={handleClearTasks}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default TaskDisplay;