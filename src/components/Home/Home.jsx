import React, { useState } from 'react';
import AddTask from '../AddTasks/AddTasks';


const Home = () => {
    const [uploadedTasks, setUploadedTasks] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Function to handle task upload
    const handleTaskUpload = (newTask) => {
        // Add timestamps to the task data
        const taskWithDate = {
            ...newTask,
            dateUploaded: new Date().toLocaleDateString(),
            lastUpdated: new Date().toLocaleDateString(),
        };

        // Update state with the new task
        setUploadedTasks([...uploadedTasks, taskWithDate]);
        setShowForm(false); // Hide the form after a successful upload
    };

    // Toggle form visibility
    const toggleFormVisibility = () => {
        setShowForm((prev) => !prev);
    };

    return (
        <div>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Files uploaded</h2>

                    <div className="flex items-center gap-x-3">
                        <button className="px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                            Download all
                        </button>

                        <button
                            onClick={toggleFormVisibility} // Toggle form visibility
                            className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                            >
                                <g clipPath="url(#clip0_3098_154395)">
                                    <path
                                        d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                                        stroke="currentColor"
                                        strokeWidth="1.67"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3098_154395">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>{showForm ? 'Close Form' : 'Upload'}</span> {/* Toggle button text */}
                        </button>
                    </div>
                </div>

                {/* Conditionally render AddTask component */}
                {showForm && <AddTask handleTaskUpload={handleTaskUpload} />}

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                    />
                                                    <span>File name</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Date uploaded
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Last updated
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Uploaded by
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {uploadedTasks.map((task, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    {task.fileName}
                                                </td>
                                                <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    {task.fileStatus}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    {task.dateUploaded}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    {task.lastUpdated}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    {task.uploadedBy}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    <button className="text-blue-500 hover:underline">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
