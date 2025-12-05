import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
    tasks: {
        'app-1': { id: 'app-1', content: 'Alice Johnson', role: 'Frontend Dev' },
        'app-2': { id: 'app-2', content: 'Bob Smith', role: 'Frontend Dev' },
        'app-3': { id: 'app-3', content: 'Charlie Day', role: 'Frontend Dev' },
    },
    columns: {
        'pending': {
            id: 'pending',
            title: 'Pending',
            taskIds: ['app-1', 'app-2'],
        },
        'reviewed': {
            id: 'reviewed',
            title: 'Reviewed',
            taskIds: ['app-3'],
        },
        'shortlisted': {
            id: 'shortlisted',
            title: 'Shortlisted',
            taskIds: [],
        },
        'rejected': {
            id: 'rejected',
            title: 'Rejected',
            taskIds: [],
        },
    },
    columnOrder: ['pending', 'reviewed', 'shortlisted', 'rejected'],
};

const ApplicantCard = ({ task, index }) => (
    <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`mb-3 rounded-xl border p-4 shadow-sm transition-all ${snapshot.isDragging
                        ? 'bg-blue-600 border-blue-500 rotate-2'
                        : 'bg-slate-800 border-white/5 hover:border-white/20'
                    }`}
            >
                <h4 className="font-bold text-white">{task.content}</h4>
                <p className="text-xs text-slate-400">{task.role}</p>
            </div>
        )}
    </Draggable>
);

const ApplicantKanban = () => {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        // Moving within same column
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = { ...start, taskIds: newTaskIds };
            setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
            return;
        }

        // Moving to different column
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setData({
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        });

        // TODO: Call API to update status
        console.log(`Moved ${draggableId} to ${destination.droppableId}`);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-[calc(100vh-200px)] gap-6 overflow-x-auto pb-4">
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                    return (
                        <div key={column.id} className="flex h-full w-80 flex-shrink-0 flex-col rounded-2xl bg-slate-900/50 p-4 border border-white/5">
                            <h3 className="mb-4 text-sm font-bold uppercase text-slate-400">{column.title} ({tasks.length})</h3>
                            <Droppable droppableId={column.id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex-1 overflow-y-auto"
                                    >
                                        {tasks.map((task, index) => (
                                            <ApplicantCard key={task.id} task={task} index={index} />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
};

export default ApplicantKanban;
