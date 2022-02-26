# Split App

The best way to split costs and track payments.

## Vision

Simplify the way we split costs.
Track payments, where a user can login and they can view the payment amounts they're required to pay and is owed to them.

The `main user` can put in their total amount and then add additional people with percentages of how much each person will pay and a due date for the payment. The percentage amounts are stored associated to the user to pay.

You can add a tag that each user is assigned to for a specific payment event.

The user can login and see the details of what that specific user needs to pay for all their combined payment events.

They can also mark the payments they've made as 'Done'.

When a `user` logs in that was a main user for a payment event, they'll see a list of payments pending and list of payments to be made.

## Potential future feature

-   Let users rate each other for payment
-   Add a comment for payments
-   User can put in a specific amounts for indviduals in addition to percentages
-   Track confirmation of payment to be paid (i.e. when a user views payments)

## Assumptions:

-   All users already have an account.
-   Users have agreed to the amount to be paid/percentage prior to using the app or creating the payment event.

# User Stories

Types of users:

-   Main User: A user who creates a payment event
-   User: A user who owes money

Every User can be a Main User and vice versa.

1. As a main user,
   I want to be able to create a payment event
   so that I can track payments

2. As a main user,
   I want to be able to track specific payment events using tags
   so that I can track where each payment was initiated

3. As a main user,
   I want to be able to split payments (using percentages) for each user at a payment event
   so that I can track who needs to pay what payment amount

4. As a main user,
   I want to be able to view whether a payment amount has been made
   so that I can confirm/validate that the payment has been made [The main user will need to verify in the app that it has been paid]

5. As a user,
   I want to be able to mark a payment as paid/done
   so that the main user will know that the payment has been made

6. As a main user,
   I want to be able to set a due date for a payment event
   so that I can give the user a guideline about when payment should be recieved by

7. As a user,
   I want to be able to view all payments that I need to make, is owed to me and payment history
   so that I can track my payments

## Wireframes

#### Desktop

![desktop](/assets/desktop.png)

#### Mobile

![mobile](/assets/mobile.png)


## Entity Relationship Diagram
![erd](/assets/database-ERD.png)