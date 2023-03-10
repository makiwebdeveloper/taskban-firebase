import { FC, useState } from "react";
import styles from "./EditTask.module.scss";
import { EditTaskDataType } from "./edit-task-data.type";
import { ITask, PriorityType } from "../../../../interfaces/task.interface";
import { Button, DateInput, Popup } from "../../../ui";
import SelectPriority from "../select-priority/SelectPriority";
import { statuses } from "../tasks.data";
import { useTasks } from "../../../../contexts/TasksContext";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  selectedTask: ITask | null;
  setIsEditTask: (v: boolean) => void;
}

const EditTask: FC<Props> = ({ selectedTask, setIsEditTask }) => {
  const { editTask, removeTask } = useTasks();
  const [editTaskData, setEditTaskData] = useState<EditTaskDataType>({
    dateOfCompletion: selectedTask?.dateOfCompletion,
    status: selectedTask?.status,
    priority: selectedTask?.priority,
  });

  const editTaskHandler = () => {
    if (selectedTask) {
      editTask(editTaskData, selectedTask.id);
      setIsEditTask(false);
    }
  };

  const removeTaskHandler = () => {
    if (selectedTask) {
      removeTask(selectedTask.id);
      setIsEditTask(false);
    }
  };

  return (
    <Popup setValue={setIsEditTask} className="w-[550px]">
      <div className={styles.editTask}>
        <div>
          <h1 className={styles.title}>Edit Task</h1>
          <h3 className="text-dark-gray mb-5">
            Task title:{" "}
            <span className={styles.taskTitle}>{selectedTask?.title}</span>
          </h3>
        </div>
        <div>
          <p className="text-dark-gray text-sm mb-2">
            Status: {selectedTask?.status && `(now: ${selectedTask?.status})`}
          </p>
          <ul className={styles.statuses}>
            {statuses.map((status) => (
              <li
                key={status.name}
                className={
                  status.name !== editTaskData.status
                    ? styles.statusItem
                    : styles.activeStatusItem
                }
                onClick={() =>
                  setEditTaskData({ ...editTaskData, status: status.name })
                }
              >
                {status.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-dark-gray text-sm mb-2">
              Priority:{" "}
              {selectedTask?.priority && `(now: ${selectedTask?.priority})`}
            </p>
            <SelectPriority
              value={editTaskData.priority}
              setValue={(value: PriorityType) =>
                setEditTaskData({ ...editTaskData, priority: value })
              }
            />
          </div>
          <div>
            <p className="text-dark-gray text-sm mb-2">Date of completion:</p>
            <DateInput
              type="date"
              value={editTaskData.dateOfCompletion}
              onChange={(e) =>
                setEditTaskData({
                  ...editTaskData,
                  dateOfCompletion: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={editTaskHandler} className="p-2 w-full">
            Edit Task
          </Button>
          <Button onClick={removeTaskHandler} red className="px-3">
            <FiTrash2 />
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default EditTask;
