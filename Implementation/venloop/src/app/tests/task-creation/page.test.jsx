import { render, screen, fireEvent } from '@testing-library/react';
import TaskCreation from '@/app/task-creation/page';
import TaskFeatureDescription from '@/app/components/TaskFeatures/TaskFeatureDescription';
import TaskFeatureTimer from '@/app/components/TaskFeatures/TaskFeatureTimer';
import TaskFeatureInput from '@/app/components/TaskFeatures/TaskFeatureInput';
import TaskFeatureChoiceEditor from '@/app/components/TaskFeatures/TaskFeatureChoiceEditor';
import { vi } from 'vitest';

// ✅ Fix: Return default keys when mocking
vi.mock('@/app/components/NavBars/NavBar', () => ({
    default: () => <div data-testid="navbar" />
}));

vi.mock('@/app/ProtectedRoute', () => ({
    default: ({ children }) => <>{children}</>
}));

describe('Task Creation Page and Feature Components', () => {
    // ✅ Test: Task name input
    it('renders task name input and allows typing', () => {
        render(<TaskCreation />);
        const input = screen.getByPlaceholderText('Task Name');
        fireEvent.change(input, { target: { value: 'New Task' } });
        expect(input.value).toBe('New Task');
    });

    // ✅ Test: Toggle description
    it('toggles the description feature block', () => {
        render(<TaskCreation />);
        const toggleButton = screen.getByText('Add Description');
        fireEvent.click(toggleButton);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // ✅ Test: TaskFeatureDescription component
    it('updates TaskFeatureDescription on typing', () => {
        const handleChange = vi.fn();
        render(<TaskFeatureDescription value="" onChange={handleChange} />);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Updated description' } });
        expect(handleChange).toHaveBeenCalledWith('Updated description');
    });

    // ✅ Test: TaskFeatureTimer component
    it('updates TaskFeatureTimer on number input', () => {
        const handleChange = vi.fn();
        render(<TaskFeatureTimer value="30" onChange={handleChange} />);
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '60' } });
        expect(handleChange).toHaveBeenCalledWith('60');
    });

    // ✅ Test: TaskFeatureInput component
    it('updates TaskFeatureInput on input', () => {
        const handleChange = vi.fn();
        render(<TaskFeatureInput value="" onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'My answer' } });
        expect(handleChange).toHaveBeenCalledWith('My answer');
    });

    // ✅ Test: TaskFeatureChoiceEditor component
    it('adds a new choice in TaskFeatureChoiceEditor', () => {
        const onChange = vi.fn();
        render(<TaskFeatureChoiceEditor value={[]} correctAnswer="" onChange={onChange} />);
        const input = screen.getByPlaceholderText(/Add choice/i);
        fireEvent.change(input, { target: { value: 'Choice A' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onChange).toHaveBeenCalled();
    });
});
