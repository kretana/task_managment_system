import { useEffect, useState } from "react";

const useTaskEstimation = (taskData) => {
    const [estimation, setEstimation] = useState("");

    useEffect(() => {
        if (taskData.createdAt && taskData.completedAt) {
            const createdDate = new Date(taskData.createdAt);
            const completedDate = new Date(taskData.completedAt);
            const diffTime = completedDate.getTime() - createdDate.getTime();

            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            setEstimation(diffDays > 0 ? `${diffDays} day(s)` : '');
        } else {
            setEstimation('');
        }
    }, [taskData.createdAt, taskData.completedAt]);

    return estimation;
};

export default useTaskEstimation;
