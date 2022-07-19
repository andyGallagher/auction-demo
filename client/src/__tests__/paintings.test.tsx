import "@testing-library/jest-dom";
// eslint-disable-next-line jest/no-mocks-import
import { mocks } from "__mocks__/graphql";
import { Paintings } from "components/Paintings";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { fireEvent, render, waitFor, screen } from "test-util";

test("renders paintings", async () => {
	mockAllIsIntersecting(true);
	render(<Paintings />);

	// Wait for first painting to load
	await waitFor(() =>
		screen.getByText(mocks[0].result.data.paintings.edges[0].node.name)
	);

	// Search for all mocks
	const items = await screen.findAllByText(/Token #[0-4]: /);
	expect(items).toHaveLength(5);
});

test("clicking painting", async () => {
	mockAllIsIntersecting(true);
	render(<Paintings />);

	// Wait for first painting to load
	await waitFor(() =>
		screen.getByText(mocks[0].result.data.paintings.edges[0].node.name)
	);

	// Search for all mocks
	const tokenLabel = await screen.findByText("Token #0");
	fireEvent.click(tokenLabel);

	// Wait for first painting to load
	await waitFor(() =>
		screen.getByText(mocks[0].result.data.paintings.edges[0].node.name)
	);

	// Check for recent activity
	const recentActivity = await screen.findByText("Recent activity");
	const parent = recentActivity.parentElement;
	const bids = parent?.children[0];

	// Expect 3 bids from mock data
	expect(Array.from(bids?.children || []).length).toBe(3);
});
