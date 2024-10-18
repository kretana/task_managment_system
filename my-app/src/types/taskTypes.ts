
export interface Task {
    id?: number;
    name: string;
    status: string;
    description: string;
    title: string;
    createdAt: Date;
    completedAt: Date;
    file:File;
    comment:string;
    estimation:string;
    assignedTo:string;
}

export interface TasksState {
    tasks: Task[];
    selectedTask?: Task;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export interface TaskUpdate {
    id: number;
    status: string;
}


