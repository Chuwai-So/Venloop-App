import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        back: vi.fn(),
        push: vi.fn(),
        replace: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
    }),
}));


vi.mock("@/app/Component/NavBar", () => ({
    default: () => <div data-testid="mock-navbar" />,
}));


vi.mock("@/app/Component/TeamBar", () => ({
    default: ({ team, isExpanded, onToggle }) => (
        <div data-testid={`team-${team.id}`}>
            <p>{team.name}</p>
            <button onClick={onToggle}>
                {isExpanded ? "Collapse" : "Expand"}
            </button>
        </div>
    ),
}));

// Mock the team service
vi.mock("@/app/TeamService/teamService", () => ({
    default: {
        getAllTeams: vi.fn().mockResolvedValue([
            { id: 1, name: "Team A", score: 10 },
            { id: 2, name: "Team B", score: 15 },
        ]),
    },
}));

import TeamMenu from "@/app/team-edit/page";

describe("TeamMenu", () => {
    it("renders all core components and team bars", async () => {
        render(<TeamMenu />);

        // Wait for team-detail to load
        await waitFor(() => {
            expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
            expect(screen.getByText("Team A")).toBeInTheDocument();
            expect(screen.getByText("Team B")).toBeInTheDocument();
        });

        expect(screen.getByTestId("team-1")).toBeInTheDocument();
        expect(screen.getByTestId("team-2")).toBeInTheDocument();
    });

    it("toggles expand/collapse on a team", async () => {
        render(<TeamMenu />);

        const toggleButtons = await screen.findAllByRole("button", { name: /expand/i });
        expect(toggleButtons).toHaveLength(2);
        
        fireEvent.click(toggleButtons[0]);

        const collapseButton = await screen.findByRole("button", { name: /collapse/i });
        expect(collapseButton).toBeInTheDocument();

        fireEvent.click(collapseButton);

        const expandButtons = await screen.findAllByRole("button", { name: /expand/i });
        expect(expandButtons.length).toBeGreaterThan(0);
    });

});
