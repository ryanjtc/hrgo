import React from 'react';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from "../../../../firebase";
import {GoArrowSwitch, GoTasklist} from "react-icons/go";
import {RiTaskFill, RiTaskLine} from "react-icons/ri";
import {IoIosRemoveCircleOutline} from "react-icons/io";
import '../Tasks.scss';

function TaskList(props) {

    const handleStatusClick = async () => {
        const id = props.task.id;
        const taskRef = doc(db, "tasks", id);
        try {
            await updateDoc(taskRef, {
                done: !props.task.done
            });
            props.onStatusChange(id);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }

    const handleRemoveClick = async () => {
        const id = props.task.id;
        const taskRef = doc(db, "tasks", id);
        try {
            await deleteDoc(taskRef);
            props.onTaskRemove(id);
        } catch (error) {
            console.error('Error removing task:', error);
        }
    }

    return (
        <div className={'taskContainer'}>
            <div>
                <br/>
                <h3><GoTasklist size={30}/> {props.task.description}</h3>
                <hr/>
                <div>Id: {props.task.id}</div>
                <div className={'status'}>
                    Status: {props.task.done ? (
                    <>
                        <RiTaskFill size={25}/> Completed
                    </>
                ) : (
                    <>
                        <RiTaskLine size={25}/> Open
                    </>
                )}
                </div>
            </div>
            <hr/>
            <div className={'buttonContainer'}>
                <button onClick={handleStatusClick}><GoArrowSwitch/> Change Status</button>
                <button style={{backgroundColor: 'red', color: 'black'}} onClick={handleRemoveClick}><IoIosRemoveCircleOutline/> Remove Task</button>
                <hr/>
            </div>
        </div>
    );
}

export default TaskList;