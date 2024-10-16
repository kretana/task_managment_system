import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {TaskBoard} from "../components/tasks/TaskBoard";

export const Dashboard = () =>{
    return(
        <DndProvider backend={HTML5Backend}>
            <div className=" bg-gray-100 min-h-screen">
                <TaskBoard />
            </div>
        </DndProvider>
    )
}