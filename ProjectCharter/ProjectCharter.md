__Chapters of the Project Charter as a preview:__


## 1. Introduction / Management Summary

The project charter describes the strategy that has been created to provide an external stakeholder with
a digital solution to improve the experience for each participant during one of their events. This needs
to be done to enable the organization to incorporate digitally based activities into their event to enhance
the experience, but without complicating the process and unnecessarily encouraging children to spend
more time in front of screens.

The aim of the project is to provide a web-based task management system that will allow the
organization to create new tasks and tailor them to their exact needs, edit existing tasks as required and
make them available to players during the event via QR code scanning. As there is no need to create an
account or download the application, the stakeholder expects a high level of user adoption. In addition,
the application makes the process of accessing and completing tasks, as well as creating and managing
a team, as easy as possible. To support the child-focused event, a team-based approach was chosen to
allow everyone to participate, even without their own device, and to enhance the experience while
involving everyone equally. The application also provides a scoring system that assigns points to teams
based on the tasks they complete, allowing them to compete on a leaderboard and further motivate
participants to make the event even more fun.

The scope of the project includes analysing the customer's problems and needs, designing, developing
and implementing a web application that meets the defined requirements, while taking into account the
customer's preferences. Therefore, the application must be user-friendly and easy to use, which is
guaranteed by a simple and intuitive design and the absence of any registration process or download for
the user during the event. The process of creating tasks and preparing the event will also be as simple
as possible to meet the needs of the stakeholders, while taking into account any security considerations.
A reliable and high-performance database is essential for this highly concurrent program.


## 2. Business case

For our fourth project, we plan to collaborate with Venloop to develop a web application that enhances
the Avond4Daagse event experience. This four-day walking event, primarily designed for school classes
in Venlo, aims to promote an active lifestyle and inclusivity. Through our research and interview with
Venloop, we identified their core objective: creating a more engaging, accessible, and community-driven
experience for all participants. Currently, the event operates without digital support, relying on
traditional methods for organization and participation tracking. This creates challenges in terms of
engagement, accessibility, and ease of management. Venloop now seeks a solution that enhances the
event experience while ensuring equal participation for all. The main challenges Venloop faces with the
current event structure include limited engagement, as participants follow fixed routes with no
interactive elements, safety concerns due to routes passing through normal traffic areas, accessibility
issues since not all participants own smartphones, and event management difficulties as organizers lack
a streamlined system to manage teams, checkpoints, and engagement. To address these issues, we
propose a web-based Treasure Hunt system that introduces interactivity, structured navigation, and
efficient management. The application will be designed for team-based participation, where a designated
team leader (an adult or Venloop team member) will navigate and input results while other team
members can track progress and access task details. The event routes will incorporate interactive
checkpoints featuring puzzles, trivia, and challenges to make the experience more engaging while
ensuring predefined routes avoid high-traffic areas for improved safety. To further motivate participants,
the app will implement a points system where teams earn points for completing tasks, contributing to
daily leaderboards, and unlocking digital badges and small rewards. For organizers, the system will
provide an efficient way to create and manage tasks, checkpoints, and QR codes for team registration,
ensuring smooth event execution. Additionally, real-time tracking and leaderboards will allow better
monitoring of participation and engagement. By implementing this web application, we aim to enhance
the overall experience for all participants, improve safety measures, ensure accessibility by designing
the app so that only one team leader needs a device, and streamline event management through digital
registration and progress tracking. This project aligns with Venloop’s mission to make the
Avond4Daagse event more engaging, inclusive, and well-organized through digital innovation.


## 3. Approach

**Approach**

For this project, a hybrid approach has been chosen as the primary methodology for this project,
combining waterfall and scrum methodology. The first seven weeks, which mainly covers the analysis
and design artifacts will be done with the traditional waterfall approach, and the implementation stage
will be fully done under the scrum methodology, while also using the GitHub board for task
distribution.

**In Scope**

The scope of this project is to design and develop a web-based application that can enhances the
experience of the “Avond4Daagse” event organized by Venloop. The primary objective is to create an
interactive and enjoyable experience of the elementary school children participating in the event while
promoting safety, inclusivity and group collaboration. The user interface and its design will be the
focus on this project since it mainly targeted parents and children.

The application will follow a Treasure Hunt-based system that combines various interactive tasks,
quizzes or challenges placed at checkpoints that were decided by Venloop. This application will be
accessed by two user groups, the admin user group and the teamleader user group. Both user groups
will have access to a leaderboard that shows each team’s total points and ranks from either a daily or
overall bases.

The admin user group will be able to generate a task using the provided task template and its task QR
code. They also have the ability to create a team activation QR codes. With a simple interface, the
admin can create, edit and delete any tasks. These tasks can be in text or photo form. The focus here
will be having an intuitive design and straight forward to use.

For the teamleader users’ group, they can create the squad by scanning the team activation QR code
and entering their preferred name. Furthermore, they can accept tasks by scanning the task QR code
and input the results of the task. The important takeaway is that the design must be easy to understand
for the adults and kids.

**Out of Scope**

However, the ability of live-tracking the participants, individual participant management system and
real-time traffic monitoring system are not part of the project scope at this moment. Also, the
arrangement of the QR code and its belonging checkpoint are also outside the control of this
application. Whether the tasks were completed in a correct manner is a responsibility for the
teamleader to reflect the result honestly. The ability to upload a task in video format and the
possibility to check attendances might be added in future iterations.


## 4. Deliverables

The main objective of this project is to deliver a web application for an external organisation called
Venloop. The main goal of the web application is to support the process of improving the experience
for all participants of the 'Avond4Daagse' event organised by Venloop by providing a digital solution
for a task management system that enables the organisers to manage tasks that can be accessed by the
participants. The main deliverable of this project is the application itself, which will contain all the
functions and meet all the requirements defined by the project team in collaboration with the project
coach and the representative of Venloop. The design of the application will be based on the preferences
of Venloop and will provide an English interface. A Dutch interface can be included in the further
development based on the preferences of Venloop. The application can be used by two different groups
of users. It is designed to be used by members of Venloop as well as by 'team leaders' who represent a
group of children during the event. The application is divided into two areas and will therefore have two
access points. The admin area can be accessed by logging in with a created user account. These accounts
can only be created with an email address that matches the organisation's schema and must be confirmed.
The application allows administrators, who are members of Venloop, to manage tasks by creating,
editing and deleting them. For the creation of tasks, a template is provided within the application, which
can be filled with functionality according to the needs of the individual task. The user will be able to
select the required functionality, enter a name for the task and a short description or explanation. When
finished, the administrator is presented with a preview of the task. From the preview, the task can be
saved and a QR code is generated to make the task available for use during the event. QR codes for
accessing events and tasks can be regenerated in the application. The administrator can access existing
tasks and edit or delete them. The administrator can also view the leaderboard during the event. The
user area can be accessed via a QR code. The user can join an existing team as a team leader or create a
new team. A name can be entered for a new team. The user can access the team page and see the name,
current score and ranking, as well as the tasks completed, and scores achieved for each team. From the
team page, the user can access the camera and scan a QR code to access a specific task. The user can
enter and submit the results of the task. Once submitted, points are awarded, and the team's score and
leaderboard position are updated. The user can also view the leaderboard. A functionality will be
provided to show the progress of the day and the overall progress of the teams on the leaderboard.
To complete this project, other deliverables will be created besides the main application to support the
application development process and to facilitate communication between all stakeholders.
User stories will be defined to provide a clear example of how the application can be used.
A data dictionary will be created to provide explanations for all the different user groups, definitions,
terms and other key words used during the development process within the application and artefacts
created.
A use case diagram will be created to visualise the user groups and their capabilities within the
application.
A wireframe is created for both the administrator and the team leader to show both areas of the
application and to provide a basis for discussion with stakeholders and to visualise the vision of the
development team. It also helps to decide on certain design decisions in cooperation with the stakeholder
from Venloop to meet their expectations.
A database design is created to show the design of the database, the data stored, the tables and their
attributes, and the dependencies between tables.
During the development process, prototypes may be created to showcase certain behaviours or design
choices to stakeholders for feedback.


## 5. Quality management

The aim of this project is to develop a web application that fits into the requirements developed by the
project group according to the likes and wishes of the external stakeholder Venloop. The final product
must meet these requirements so that it can be used as intended. To ensure that the development process
is carried out in a qualitative and well-organised manner, specific management strategies are used to
deliver the best possible product that meets the customer's expectations. To complete the project in a
quality manner and to achieve the pre-defined goals, good teamwork is invaluable. To manage team
members in an efficient way and to ensure that everyone is involved and that tasks are shared and
completed, we rely on the issue system provided by GitHub. In GitHub, issues can be created to
represent specific tasks that need to be done during development. These issues can be assigned to
different team members and posted to the GitHub board. The GitHub board is a task management board
similar to that used in the Kanban process of agile development. The GitHub board allows the team to
plan and measure development and prioritise tasks. It also makes tasks visible to everyone, so they are
less likely to be overlooked and can be completed on time. Using the GitHub board ensures that all
issues are addressed to avoid serious quality problems at the end of development. All issues go through
the same process on the board. A list of all issues that need to be addressed is visible and represents the
project's product backlog. Issues that need to be addressed during the current sprint are moved to the
sprint backlog so that all team members are aware of the sprint workload. When issues are being worked
on, they are "in progress" to ensure that issues are being worked on efficiently and that no work is being
done twice due to miscommunication. All issues are reviewed after completion to further ensure high
quality. This requires another team member to review the issue and check that it has been completed in
accordance with the requirements. Feedback from the group coach is also taken into account when
reviewing issues during the project. Only when the issue is fully accepted can it be marked as complete.
This process ensures a high-quality product and helps to organise tasks within the team.
To ensure high quality during development and to avoid breakdowns or loss of data, this project will
use the GitHub branch system. Multiple branches will be created to address different issues or processes
during development. Using a main branch and a development branch for the team and for each individual
member will ensure that there are no conflicts during development and that team members can work
efficiently. It also ensures that there is always a working version of the web application that can be used
to show newly implemented functionality to all stakeholders. Separate branches can also be used to test
and prototype new concepts without breaking the main code base. The GitHub version control system
also manages versions of the application between team members and ensures that the main codebase is
not only stored locally on each device, but also on a server, so that the main project is safe in the event
of data loss. Version control is accessible to all members using the push and pull mechanism for each
commit.
When committing new code, the team will provide an appropriate description of the commit to make
debugging easier if needed, so that the source of a potential problem can be found and fixed more
quickly, further improving quality throughout development.
To further ensure high quality during the development of the application, a risk log was created to
specify how to deal with certain events that could affect the development process. To this end, potential
risks were described, the impact and probability were defined, and the risk calculation was performed.
For each risk, a clear strategy for dealing with these situations is defined, which can be followed when
the risk occurs in order to eliminate it and ensure a smooth and effective development phase. The risk
log can be found in Appendix A.


## 6. Prerequisite

The development and deployment of this web application require a stable and well-equipped computing
environment to ensure efficient performance, scalability, and smooth collaboration. The following
hardware, software, infrastructure, and expertise requirements must be met.

**Hardware Requirements**

To support efficient development and deployment, the hardware must be capable of handling concurrent
processing, testing, and debugging. A **multi-core processor** is necessary to manage multiple tasks
efficiently, along with sufficient **RAM** to ensure smooth application performance. Fast **storage** is
essential for quick build times and responsive development. **Processor:** Multi-core CPU (e.g., Intel Core
i5/Ryzen 5 or higher).

- **Memory:** At least **16 GB RAM** for seamless multitasking.
- **Storage:** A **256 GB SSD or higher** for fast read/write speeds.

**Software Requirements**

The development process requires various software tools to build, test, and deploy the application. A
**JavaScript runtime** is needed for frontend development, while a **backend framework** must support
concurrency and efficient request handling. Additionally, a **relational database management system**
will store and manage data. Version control and deployment tools are also required for collaboration
and continuous integration.

- **Development Tools:**
    o **Node.js** – For React and JavaScript development.
    o **Elixir** – For backend development and concurrency handling.
    o **PostgreSQL** – For structured data storage.
    o **Git** – For version control and collaborative development.
- **Hosting & Deployment:**
    o **Web Server:** Appropriate web server such as Firebase for serving the frontend and
       backend.
    o **Cloud or Dedicated Servers:** For application hosting and database management.
    o **CI/CD Tools:** For automated testing and deployment.

**Infrastructure Requirements**

A reliable infrastructure is essential to ensure seamless development, deployment, and maintenance of
the application. Stable **internet connectivity** is required to support remote collaboration and cloud-
based development. The team must have access to a **dedicated workspace or a remote work setup**
with the necessary tools. Additionally, **secure servers** must be in place to host the application and store
sensitive data securely.

**Skills and Expertise Requirements**

The success of this project depends on the technical skills and expertise of the development team.
**Frontend development** requires knowledge in JavaScript and React to create a dynamic user
experience. **Backend development** demands experience in Elixir, with a focus on **handling
concurrency and threads efficiently**. A strong understanding of **database management** is necessary
to ensure efficient data handling. Furthermore, the ability to design **scalable architectures** , manage
concurrent requests, and debug technical issues is crucial. Effective **communication and teamwork**
will also play a key role in ensuring smooth project execution.


## 7. Success criteria

This project will be considered complete if it meets the following criteria:

**_- User-Friendly Interface:_**
- The application must be intuitive and straightforward for children to understand and for the
“teamleaders” to navigate and operate during the event
- The interface must use clear language and simple visuals suitable for elementary school children
- UI/UX design must be tested
**_- Quest System:_**
- The application must provide a structured experience with a variety of interactive tasks or challenges
for the admin to create and for the kids to participate
- Tasks should be accessible by scanning QR codes that are generated by the admin user group
**_- Leaderboard and Point System_**
- The leaderboard must accurately display each teams’ total points and rankings on both a daily and
overall basis
- The point system must be functional and correctly reward points to the participating teams based on
their respective task completions
- The leaderboard must update the rankings when points are rewarded to always display an accurate
ranking to all participants
**_- Admin Management Interface_**
- Admins must be able to create, edit, and delete tasks via a user-friendly interface
- The system must generate task and team activation QR codes without errors
**_- Accessibility:_**
- The application must be accessible via any kind of smartphone that has internet connection and a
camera.
- The design must make sure that not every child is required to have a phone to participate during the
event
**_- Scalability:_**
- The system should be capable of handling a large number of users participating simultaneously without
performance issue
- The system can handle multi-threading request without performance issue
**_- Security:_**
- The application must ensure data privacy and protection for all users.