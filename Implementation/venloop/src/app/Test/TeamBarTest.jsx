import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamBar from './TeamBar'; // Adjust path if needed
import TeamService from '@/app/TeamService/teamService';

// Mock TeamService methods
jest.mock('@/app/TeamService/teamService', () => ({
    updateTeam: jest.fn(),
    deleteTeam: jest.fn(),
}));

describe('TeamBar Component', () => {
    const fakeTeam = { id: '1', name: 'Team Alpha', tasks: { task1: {}, task2: {} } };
    const refreshTeams = jest.fn();
    const onToggle = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('allows updating the team name', async () => {
        render(<TeamBar team={fakeTeam} refreshTeams={refreshTeams} onToggle={onToggle} />);

        fireEvent.click(screen.getByText('Update'));
        const input = screen.getByDisplayValue('Team Alpha');
        fireEvent.change(input, { target: { value: 'New Team Name' } });

        fireEvent.click(screen.getByText('Save'));

        expect(screen.getByText('Saving...')).toBeInTheDocument();

        // Simulate service success
        await waitFor(() => {
            expect(TeamService.updateTeam).toHaveBeenCalledWith('1', { name: 'New Team Name' });
        });

        expect(refreshTeams).toHaveBeenCalled();
    });

    it('asks for confirmation before deleting', async () => {
        // Mock window.confirm
        window.confirm = jest.fn(() => true);

        render(<TeamBar team={fakeTeam} refreshTeams={refreshTeams} onToggle={onToggle} />);

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete team "Team Alpha"?');
            expect(TeamService.deleteTeam).toHaveBeenCalledWith('1');
            expect(refreshTeams).toHaveBeenCalled();
        });
    });

    it('does not delete if user cancels confirmation', async () => {
        window.confirm = jest.fn(() => false);

        render(<TeamBar team={fakeTeam} refreshTeams={refreshTeams} onToggle={onToggle} />);

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(TeamService.deleteTeam).not.toHaveBeenCalled();
            expect(refreshTeams).not.toHaveBeenCalled();
        });
    });
});
