// components/MeetingScheduler.tsx
'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

const MeetingScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !email) {
      setResponseMessage('Please select a date and enter your email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: selectedDate, email, name }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.status === 200) {
        setResponseMessage('Meeting scheduled successfully');
        await sendReplyEmail(); // Call the function to send the reply email
        setSelectedDate(null);
        setName('');
        setEmail('');
      } else {
        setResponseMessage('Failed to schedule meeting: ' + result.message);
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setLoading(false);
      setResponseMessage('Failed to schedule meeting');
    }
  };

  const sendReplyEmail = async () => {
    const url = `/api/sendReply`;
    const requestData = {
      email: email,
      name: name,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Reply email sent successfully");
    } catch (error) {
      console.error("Error sending reply email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsModalOpen(true)}
        className=" bg-blue-900 text-white hover:text-black hover:bg-blue-200   py-2 px-4 rounded-md  transition-colors"
      >
        Schedule a Meeting
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-6 text-center">Schedule a Meeting</h2>
            <form onSubmit={handleSubmit} className='w-full'>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date and Time:
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholderText="Select Date and Time"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10V0C4.477 0 0 4.477 0 12h2zm2 0a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    'Schedule Meeting'
                  )}
                </button>
              </div>
            </form>
            {responseMessage && (
              <div className={`mt-4 p-2 ${responseMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingScheduler;
