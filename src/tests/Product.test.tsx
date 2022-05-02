import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "store";
import { Product } from "pages/Product/Product";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

beforeEach(() => {
  render(
    <Provider store={store}>
      <Product />
    </Provider>
  );
});

describe("Product", () => {
  test("Buy button is disabled when stock is zero", async () => {
    const buttons = await screen.findAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[0]).toHaveTextContent(/sold out/i);
  });

  test("User can close dialog without submitting feedback", async () => {
    const reviewButton = await screen.findByRole("button", {
      name: /leave review/i,
    });

    userEvent.click(reviewButton);

    expect(
      await screen.findByRole("dialog", {
        name: /please submit your feedback for us here/i,
      })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /discard/i }));

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", {
          name: /please submit your feedback for us here/i,
        })
      ).not.toBeInTheDocument()
    );
  });

  test("User cannot submit form without entering values for mandatory fields", async () => {
    const reviewButton = await screen.findByRole("button", {
      name: /leave review/i,
    });

    userEvent.click(reviewButton);

    expect(
      await screen.findByRole("dialog", {
        name: /please submit your feedback for us here/i,
      })
    ).toBeInTheDocument();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    expect(firstName).toBeRequired();

    const surname = screen.getByRole("textbox", { name: /surname/i });
    expect(surname).toBeRequired();

    const email = screen.getByRole("textbox", { name: /email/i });
    expect(email).toBeRequired();

    const comment = screen.getByRole("textbox", { name: /feedback/i });
    expect(comment).toBeRequired();

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(firstName).toBeInvalid());
    expect(surname).toBeInvalid();
    expect(email).toBeInvalid();
    expect(comment).toBeInvalid();
  });

  test("User can submit form with valid values", async () => {
    const reviewButton = await screen.findByRole("button", {
      name: /leave review/i,
    });

    expect(screen.getAllByTestId("rating-value")[0]).toHaveTextContent("3.8");

    // open submit feedback form dialog
    userEvent.click(reviewButton);

    expect(
      await screen.findByRole("dialog", {
        name: /please submit your feedback for us here/i,
      })
    ).toBeInTheDocument();

    await userEvent.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "TestFirstName"
    );

    await userEvent.type(
      screen.getByRole("textbox", { name: /surname/i }),
      "TestSurname"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "testfirstname.testsurname@email.com"
    );

    fireEvent.click(screen.getByRole("radio", { name: /2 stars/i }));
    await waitFor(() =>
      expect(within(screen.getByRole("dialog", {
        name: /please submit your feedback for us here/i,
      })).getByTestId("rating-value")).toHaveTextContent("2")
    );

    await userEvent.type(
      screen.getByRole("textbox", { name: /feedback/i }),
      "Test feedback"
    );

    expect(screen.getByRole("form")).toHaveFormValues({
      firstName: "TestFirstName",
      lastName: "TestSurname",
      email: "testfirstname.testsurname@email.com",
      comment: "Test feedback",
    });

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", {
          name: /please submit your feedback for us here/i,
        })
      ).not.toBeInTheDocument()
    );

    //expect review list to have updated with values from submitted review 
    const latestReview = screen.getAllByTestId("review-element")[0]
    expect(within(latestReview).getByRole('heading')).toHaveTextContent(/testFirstName t\./i);
    expect(within(latestReview).getByText(/test feedback/i)).toBeVisible();
    expect(within(latestReview).getByTestId("rating-value")).toHaveTextContent("2");

    expect(screen.getAllByTestId("rating-value")[0]).toHaveTextContent("3.6");

    // expect success feedback alert to appear
    const successAlert = screen.getByRole("alert");
    expect(successAlert).toBeInTheDocument();
    expect(successAlert).toHaveTextContent(/feedback submitted!/i);
  });

  test("Only 5 reviews displayed on page at a time", async () => {
    const reviews = await screen.findAllByTestId("review-element");
    expect(reviews.length).toBe(5);

    // expect number of pagination items to be 2 as total no of reviews is 6
    expect(screen.getAllByRole('button', {  name: /page \d/i}).length).toBe(2);

    // naviagte through pagination
    userEvent.click(screen.getByRole('button', {  name: /go to next page/i}));
    expect(reviews.length).toBe(5);
  })
});
