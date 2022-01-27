# Personal Trainer Course Project

This personal trainer web app was developed for Haaga-Helia University of Applied Science's introductory Front End Programming course in the Fall of 2021. Evaluation was based on a point scale of 0-100, with grading from 0-5. The app was evaluated as fulfilling all course project requirements, receiving an evaluation of 100/100 and the grade 5.

## The deployed app

https://ptfront.herokuapp.com/

## Task case

The task case was laid out as a personal trainer service needing a front end app for their customer database. The database contained information regarding customers and their training activities. Rest API documentation for the database was provided, along with instructions to complete four tasks using either React.js or Vue.js. As the course had focused on React, I decided to implement said technology to complete the tasks to the best degree possible.

## API documentation

The API documentation is under the copyright of the course teacher and cannot be explicitly shared without permission, but the utilized - and thus practically public - API requests are as follows:

### GET - get API content from root address
https://customerrest.herokuapp.com/api

### GET - get customers & info from /customers
#### individual customer info from /customers/{id}
#### individual customer training data /customers/{id}/trainings
https://customerrest.herokuapp.com/api/customers

### DELETE - delete customer along with their training data with /customers/{id}
https://customerrest.herokuapp.com/api/customers

### POST - add a new customer with the base customers endpoint
https://customerrest.herokuapp.com/api/customers

### PUT - update an existing customer with /customers/{id}
https://customerrest.herokuapp.com/api/customers

### POST - add a new training activity with a customer reference link
https://customerrest.herokuapp.com/api/trainings

### DELETE - delete a training activity with /trainings/{id}
https://customerrest.herokuapp.com/api/trainings

### GET - get all training data with customer info attached
https://customerrest.herokuapp.com/gettrainings


## Tasks

The tasks were divided into four parts, with each task presenting more challenging problems as regards the taught course content.

### Task 1

The first task called for creating a basic page layout and listing customers and their training activities. I decided to implement the AG Grid-library for listing and sorting functions, as well as Ant Design for the general layout. The course exercises had mostly focused on Material UI, so I felt that a different design library would provide a suitable learning challenge for furthering my skills from the get go. I enjoyed the basic design layout visually, but was to an extent disappointed after realising the FindDomNode-issues related to the library. I deemed these to however not be critical errors when it came to the functionality of the app as they were merely present in Strict Mode, and thus forged on with the design library in question. At this stage I initially utilized Day.js for date formatting.

### Task 2

The second task called for CRUD functionality on the created listings. This included adding and editing customers, deleting existing customers with a confirmation pop-up, adding training activities for customers as well as deleting training activities with a confirmation pop-up. These were fairly straight-forward to implement, although I had to work a bit more on the training activity addition form logic. I also switched date handling from Day.js to Moment.js, as this apparently is more or less integrated into Ant Design. For full disclosure, I must admit to a single es lint-ignore, as the overtly vigilant component flagged errors regarding a useState-variable's set-function. As I've understood it, the last place you have to worry about losing information in on a re-render is a useState-variable.

### Task 3

The third task consisted of adding CSV export functionality, and adding a calendar with autofilled monthly, weekly and daily training data. For the CSV export functionality, I utilized AG Grid's easy to use features after consulting its documentation. The calendar was done with FullCalendar. Some work was required with the dates, as no set end ISO Format time was provided for each activity, but these were handled with Moment.js, MomentTimeZone and creative formatting. This also resulted in the app being set to fixed GMT time, as it was the most straightforward solution and matched the database output. At this stage, the app was deployed to https://ptfront.herokuapp.com/.

### Task 4

The fourth task was focused on basic statistics creation. The task was fairly limited in scope, with the requirements consisting of a bar chart showing overall minutes for different activities throughout the clientele. I implemented lodash functions for generating the statistics, and used Recharts to visualize the resulting data. Additional statistics would have been a visually welcome addition for the overall quality of the app, but as a data handling and formatting exercise, task 4 proved to be very educational.

## Implemented technologies/libraries

Ant Design - https://ant.design/<br/>
AG Grid - https://www.ag-grid.com/<br/>
Moment JS - https://momentjs.com/<br/>
Moment TimeZone - https://momentjs.com/timezone/<br/>
FullCalendar - https://fullcalendar.io/<br/>
lodash - https://lodash.com/<br/>
Recharts - https://recharts.org/en-US/<br/>
React Router - https://reactrouter.com/<br/>
React - https://reactjs.org/<br/><br/>

Coffee - https://en.wikipedia.org/wiki/Coffee

## Workhours per task

Task 1: 6h<br/>
Task 2: 18h<br/>
Task 3: 8h<br/>
Task 4: 5h<br/>

## Conclusions

As a learning exercise to Front End-development using React, this course project proved extremely valuable. An introductory course is of course always an introductory course. However, I feel I have achieved a solid grounding as regards React and modern Javascript logic, and have a strong passion to pursue further skills in similar development projects. I believe skill begets work begets skill. As a learner I know myself to develop best through work and creative processes, both of which for myself are often interchangeable as terms. Projects such as these, even though ultimately merely course work, are thus invaluable for me in developing and hopefully showcasing my skills as a future development professional.

### Further development

No work or project is ever truly complete. As far as developing this project further, I definitely see potential. The next steps I believe to be beneficial are creating a similar back end with C#/.NET-technologies, and implementing TypeScript as well as a more conventional package structure to the basis this course project provided. These are technologies I am studying and implementing into course work at the time of writing(early 2022), and will hopefully be able to ass into my skillset to further my growth as an aspiring development professional.

#### Cheers,
#### Christian
