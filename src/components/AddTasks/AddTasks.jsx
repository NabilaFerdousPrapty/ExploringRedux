import React from 'react';
import { useForm } from 'react-hook-form';

const AddTask = ({ handleTaskUpload }) => {
    const { register, handleSubmit, reset } = useForm();

    // Handle form submission
    const onSubmit = (data) => {
        handleTaskUpload(data);  // Pass form data to handleTaskUpload in Home
        reset();  // Reset the form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-4">
            <input
                type="text"
                placeholder="Task Name"
                {...register('fileName', { required: true })}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="File status"
                {...register('fileStatus', { required: true })}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Uploaded By"
                {...register('uploadedBy', { required: true })}
                className="border p-2 rounded"
            />
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Upload Task
            </button>
        </form>
    );
};

export default AddTask;
