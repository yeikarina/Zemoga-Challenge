Zemoga Front End Development - Yeikarina Coronell Test v2.1
==================================================

👋 Hello! Are you ready to review my awesome code?-----> 🙊 Kidding! but I tried my best!
--------------------------------------------------

### Challenge Overview

Our client's app Rule of Thumb™️ tracks the sentiment of their users on trending and controversial people from different fields, including politics, business, media and entertainment, etc. The website has the following requirement: they need to present their users with an easy way to share their opinion on each presented celebrity, using votes (thumbs up and down), and display the results to the user while the poll is open. These features should be available to all users, regardless of where they're accessing the website from, whether it's a smartphone, a tablet or a desktop computer.

> 👉  **The challenge**: Build a responsive display component for the data provided, and add it to the Rule of Thumb™️ website, complying with the design specifications.

Challenge Accepted 💪😁

### Acceptance Criteria

Here you can see the acceptance criteria I tried to achieve 👩‍💻

1. [X] The interactive component should meet the design criteria. 
2. [X] In mobile version, cards **should only** be displayed as a list of cards, with horizontal scrolling and overflow.
3. [X] In tablet and desktop versions, user **should be able to switch views** between _list view_ and _grid view_, using the dropdown menu, which should be located at the top right section of the component. Had some trouble with Option tag of the dropdown menu so they are not centered, I think everything else is ok.
   1. If the _list view_ is selected, all cards should be stacked vertically, according to the design specs.
   2. If the _grid view_ is selected, all cards should be positioned as a grid of elements, according to the design specs.
4. [X] Each card should contain a **gauge bar** at the bottom, which will display the distribution of positive and negative votes **as a percentage**. (See `assets/data.json` for reference).
5. [X] Each card should contain three buttons: a **"thumbs down" (yellow)**, a **"thumbs up" (teal)** and a "Vote now" button **which should be disabled** by default.
   1. If either "thumbs up" or "thumbs down" button is pressed, it should **toggle the selected state of that button** (denoted as a white border, see design specs for reference), and enable the "Vote Now" button.
   2. If "Vote Now" button is pressed, **that vote should be posted**, and three other things should happen:
      1. Eyebrow text should change to the copy "Thank you for your vote!"
      2. "Vote now" text should change to the copy "Vote Again"
      3. The **gauge bar** below should reflect the changes in the registered data and **percentage should be updated**.
   3. If "Vote Again" button is pressed, all buttons should return to the initial state, and all modified copy texts should be reverted to their original state. The gauge bar, however, should persist the votes already posted.
6. [X] **All posted votes should be persisted** by any means, and should be exactly the same count, even if the page is refreshed. Use _any_ persistance mechanisms you prefer: LocalStorage, Cookies, IndexedDB, URL params, a Back End service (Firebase, DynamoDB, Redis, etc). I used FireBase.

### Tools I used.
For this challenge I used Vanilla framework (Only CSS, JS and HTML 🙈).
I used a css preprocessor called Sass wich helped me coding faster and organized.
I also worked with Mobile first approach and BEM methodology for my css classes names.
My favorite IDE is Visual Studio Code, so I used it to develop, I installed Live Server and Live Sass Compiler to run while coding.
You can see my web page running here on GutHub Pages.

### Aditional 
I had a lot of fun with this challenge, there is a lot of things I could've done better for sure but I am happy with the results and willing to learn a lot more.
Thankyou for this oportinuty! 🥰
