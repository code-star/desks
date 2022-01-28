# Smart Office Management

## Purpose

Smart office Mangement is a website and its purpose is to manage the usage of workspace for companies who use flexible workspaces. The design is now specificl for Ordina.

An user can book a workspace and can check a workspace in or out. An admin can see all the bookings and the states of the workspaces. So the admin can get insight on the usage of the workspaces and the user will have certainty of having a workspace when they are going tot the office.

## Use Smart Office Management

This is the link for the website: https://code-star.github.io/desks/

If you want to login as a normal user, you can use user 'test' with password 'pw'

If you want to login as an admin, you can use user 'admin' with password 'pw'

## Features

This application makes use of:

- React
- SQlite Database
- Express
- Node
- Material UI
- Typescript
- Github pages for frontend
- Azure for deploying the Backend

### Implemented features

These features are implemented:

- Users can book workspaces
- Users can see their bookings.
- Users must login or register to be able to see the other pages.
- Users can Logout.
- Users can checkin and checkout at the workspaces with QR-codes. [^1]
- The admin has their own dashboard which only the admin can see.
- The admin can see all the bookings and can sort the list.
- The admin can see all the workspaces and the states of the workspaces.
- The database holds the information of the users, the workspaces and the bookings.
- The application gives notifications when:
  - the booking of a user is after half an hour.
  - the booking of a user has passed half an hour ago.
- The application gives warnings when a field isn't filled in correctly.
- The application checks the workspaces automatically out at the end of the day, or at the end of the booking.
- The application only has workspaces from a specific floor.

### Future features

There were some plans for more features that can be added in the future these are:

- User and Admin can delete bookings.
- Use of secure Authentication with Ordina e-mail.
- Usage of workspaces everywhere in the office.
- Usage of multiple offices.
- User specific Checkin and Checkout.
- Interactive image (click on workspace in image to select workspace)

[^1]: The QR-codes are stickers on the workspaces. See QRsticker.pdf for the QR codes.
