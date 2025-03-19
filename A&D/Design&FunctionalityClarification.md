<h1> First clarififcation of some functionalities and other constrainst as well as design options, to support the process of developing an idea and to have a base to discuss upon. </h1>


<h3> User groups: </h3>
<p>
Admin: <br>
- The admin is able to create new tasks by selecting building blocks/ using templates to add functionality. <br>
- The admin is able to see the leaderboard. <br>
- The admin can delete tasks. <br>
- The admin is able to generate QR-codes that can be used to register as a teamleader or access a task during the event <br>
Teamleader: <br>
- The teamleader can register and create a new team (first day) or join an existing one (2nd - 4th day) though a QR code <br>
- The teamleader can scan QR codes at the checkpoints to access tasks and submit results <br>
- The teamleader can see the own and the other teams progress (points) <br>

<h3> functionality and constraints: </h3>
- admin needs a user account to log in <br>
- admin accounts can only be created with an …@venloop.nl e-mail address and must be confirmed via e-mail <br>
- admin manages tasks (uses templates) <br>
- admin generates QR codes for checkpoints (task access) and teamleader registration <br>
- teamleaders do not have accounts <br>
- teamleaders enter the application by scanning QR codes <br>
- only one teamleader per team (possibility to include spectators) <br>
- a teamleader can create a team (on the first day) <br>
- a teamleader can join a team (following days) <br>
- all teamleaders are deleted at midnight to prevent blocking the slot in a team (if teamleader changes from day to day) <br>
- teamleader are able to scan the QR code at the checkpoints to access the corresponding task <br>
- teamleader can submit task results and finish the task <br>

<h3> views: </h3>
- admin log-in/ sign-up view <br>
- admin homepage (navigate to leaderboard, task creation or QR generation) <br>
- admin leaderboard view <br>
- admin task creation view <br>
- admin QR-generation view (for tasks and registering) <br>
- admin QR-success page with exporting and printing options <br>
 - (admin enter route view) <br>
- teamleader homepage (create a team or assign to a team) <br>
- teamleader team page (navigate to leaderboard or task scanner) <br>
- teamleader leaderboard view <br>
- teamleader QR code scanner view <br>
- teamleader task view <br>
 - (teamleader route/ navigation view) <br> </p>