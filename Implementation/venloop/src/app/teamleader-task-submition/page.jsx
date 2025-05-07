'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskAdapter } from '@/app/TaskService/taskAdapter';

import TaskFeatureDescription from '@/app/Component/TaskFeatureDescription';
import TaskFeatureTimer from '@/app/Component/TaskFeatureTimer';
import TaskFeaturePicture from '@/app/Component/TaskFeaturePicture';
import TaskFeatureInput from '@/app/Component/TaskFeatureInput';
import TaskFeatureChoice from '@/app/Component/TaskFeatureChoice';
import NavBar from '@/app/Component/NavBars/NavBar';

export default function TeamLeaderTemplateSelector() {
    const [templates, setTemplates] = useState([]);
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [formData, setFormData] = useState({});
    const [filterType, setFilterType] = useState('all');
    const router = useRouter();

    useEffect(() => {
        const fetchTemplates = async () => {
            const allTasks = await TaskAdapter.getAllTasks();
            const templateList = Object.values(allTasks || {}).filter(t => t.isTemplate);
            setTemplates(templateList);
        };
        fetchTemplates();
    }, []);

    const handleSelectTemplate = (template) => {
        setActiveTemplate(template);
        setFormData({
            name: template.name + " (filled)",
            description: '',
            timer: '30',
            input: '',
            choice: template.choices || [],
            picture: null,
            selectedAnswer: ''
        });
    };

    const handleFormChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const { name, description, picture, timer, input, choice, selectedAnswer } = formData;

        let base64Image = null;
        if (picture instanceof File) {
            base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(picture); // Convert to base64
            });
        }

        const payload = {
            name,
            description: activeTemplate.features.description ? description : null,
            picture: activeTemplate.features.picture ? base64Image : null,
            timer: activeTemplate.features.timer ? timer : null,
            answer: activeTemplate.features.choice ? selectedAnswer : input || null,
            choices: activeTemplate.features.choice ? choice : [],
            isTemplate: false
        };

        try {
            await TaskAdapter.updateTask(activeTemplate.id, payload);
            alert("Task successfully filled!");
            router.push(`/admin-edit-task-template/view?id=${activeTemplate.id}`);
        } catch (err) {
            console.error("Failed to fill task:", err);
            alert("Something went wrong.");
        }
    };

    const filteredTemplates = templates.filter(t =>
        filterType === 'all' ? true : t.type === filterType
    );

    const groupedTemplates = {
        image: filteredTemplates.filter(t => t.type === 'image'),
        choice: filteredTemplates.filter(t => t.type === 'choice'),
        text: filteredTemplates.filter(t => t.type === 'text')
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            <NavBar backTo="/team-landing" />
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#1F2A60]">Choose a Task Template</h1>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {['all', 'image', 'choice', 'text'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded ${
                                filterType === type ? 'bg-[#3CA9E2]' : 'bg-gray-300'
                            } text-white font-semibold`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Template List */}
                {!activeTemplate && (
                    <div className="space-y-4">
                        {Object.entries(groupedTemplates).map(([type, group]) => (
                            <div key={type}>
                                <h2 className="text-lg font-bold text-[#1F2A60] capitalize mb-2">{type} Templates</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {group.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => handleSelectTemplate(template)}
                                            className="bg-white shadow border border-gray-300 rounded p-4 text-left hover:scale-105 transition-transform"
                                        >
                                            <p className="font-semibold">{template.name}</p>
                                            <p className="text-sm text-gray-500 mt-1">Type: {template.type}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Template Fill UI */}
                {activeTemplate && (
                    <div className="flex flex-col md:flex-row mt-6 gap-6">
                        {/* Phone Preview */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-[360px] h-[640px] bg-white border rounded-[40px] shadow p-4 overflow-y-auto">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full hidden md:block" />
                                <div className="pt-[50px] space-y-3">
                                    <h2 className="text-center text-lg font-semibold">{formData.name}</h2>

                                    {activeTemplate.features.description && activeTemplate.description && (
                                        <div className="bg-white border rounded p-2 shadow text-sm text-center whitespace-pre-line">
                                            <p className="font-semibold mb-1 text-gray-800">Description</p>
                                            <p className="text-gray-600">{activeTemplate.description}</p>
                                        </div>
                                    )}

                                    {activeTemplate.features.picture && (
                                        <TaskFeaturePicture
                                            file={formData.picture}
                                            onChange={(file) => handleFormChange('picture', file)}
                                        />
                                    )}

                                    {activeTemplate.features.choice && (
                                        <TaskFeatureChoice
                                            value={formData.choice}
                                            onChange={(choices, selectedAnswer) =>
                                                handleFormChange("selectedAnswer", selectedAnswer)
                                            }
                                            readOnly={true}
                                        />
                                    )}

                                    {activeTemplate.features.timer && (
                                        <TaskFeatureTimer
                                            value={formData.timer}
                                            onChange={(val) => handleFormChange('timer', val)}
                                        />
                                    )}

                                    {activeTemplate.features.input && (
                                        <TaskFeatureInput
                                            value={formData.input}
                                            onChange={(val) => handleFormChange('input', val)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="w-full md:w-1/2">
                            <h3 className="text-lg font-semibold mb-2 text-[#1F2A60]">Fill in Task Data</h3>
                            <button
                                className="mt-4 bg-[#D86F27] text-white px-4 py-2 rounded hover:scale-105 transition-transform"
                                onClick={handleSubmit}
                            >
                                Submit Task
                            </button>
                            <button
                                className="mt-2 text-sm text-blue-600 underline"
                                onClick={() => setActiveTemplate(null)}
                            >
                                ← Back to Templates
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
