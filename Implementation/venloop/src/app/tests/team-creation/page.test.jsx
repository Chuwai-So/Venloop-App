import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";


vi.mock("@/app/Component/NavBar", () => ({
    default: () => <div data-testid="mock-navbar" />,
}));


vi.mock("@/app/TeamService/teamAdapter", () => ({
    TeamAdapter: {
        createTeam: vi.fn().mockResolvedValue(1),
    },
}));


import CreateTeamsPage from "@/app/team-creation/page";

describe("CreateTeamsPage", () => {
    it("renders core components", () => {
        render(<CreateTeamsPage />);

        expect(screen.getByText("Create Teams")).toBeInTheDocument();
        expect(screen.getByLabelText(/select number of teams/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    it("displays correct number of inputs when team count is selected", () => {
        render(<CreateTeamsPage />);
        fireEvent.change(screen.getByLabelText(/select number of teams/i), {
            target: { value: "3" },
        });

        const inputs = screen.getAllByPlaceholderText(/enter team name/i);
        expect(inputs).toHaveLength(3);
    });

    it("submits team names and displays success message", async () => {
        render(<CreateTeamsPage />);
        fireEvent.change(screen.getByLabelText(/select number of teams/i), {
            target: { value: "2" },
        });

        const inputs = screen.getAllByPlaceholderText(/enter team name/i);
        fireEvent.change(inputs[0], { target: { value: "Alpha" } });
        fireEvent.change(inputs[1], { target: { value: "Beta" } });

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/2 team\(s\) created successfully\./i)).toBeInTheDocument();
        });
    });

    it("disables the submit button while loading", async () => {
        render(<CreateTeamsPage />);
        fireEvent.change(screen.getByLabelText(/select number of teams/i), {
            target: { value: "1" },
        });

        const input = screen.getByPlaceholderText(/enter team name/i);
        fireEvent.change(input, { target: { value: "Gamma" } });

        const button = screen.getByRole("button", { name: /submit/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(button).toHaveTextContent("Creating...");
            expect(button).toBeDisabled();
        });

        await waitFor(() => {
            expect(screen.getByText(/1 team\(s\) created successfully\./i)).toBeInTheDocument();
        });
    });
});
