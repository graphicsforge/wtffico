WTFFICO is a FICO explainer.
===

Takes a json description of example users' credit history and breaks it down into factors that positively or negatively affected that user. For factors that negatively affected the credit score, potential action items are listed.

Usage
---

`npm run build` compiles the project, use any webserver to host. Also available at https://s3-us-west-1.amazonaws.com/testthings/index.html for your convenience.
A few demo users are available in the top-right dropdown menu

Design
---

This project uses React as it's an easy way to build encapsulated visual components. Also makes it easy to change users as I can just pass in new user data as a property and let the React framework handle updating the DOM.

As this is a front-end demo, most of the work was design-based. The client used Semantic UI so that was used for base styles. The FICO logo is already an established trademark, so I flipped the colors as well as added additional letters.
The FICO tm colors were used in the header area, but were too muted for the graphs so I needed to boost the brightness and saturation. I originally tried using the blue and gray from the graphs as the positive and negative colors respectively, but using that gray for a downwards arrow didn't work as it was a neutral color attempting to portray a negative message. So I took the average brightness and saturation of the 2 graph colors and shifted the hues to make a green and red to use for positive and negative FICO effects.
I generated copy by reading through a lot of descriptions of how the FICO scores are computed. There isn't too much specific info and the descriptions of how the score is actually calculated are all rather vague so I tried to adopt a similar tone of voice, while still being friendly and conversational as this is an explainer targeting people trying to learn about their FICO score. 

Mobile layouts should always be designed first, and it made sense to have a visual representation of the FICO score on top, followed by a breakdown in the positive and negative factors. For the desktop layout, it made sense to use the additional screenspace to push the graphs to the right and then have the factor breakdown on the left. 
The FICO score graph is in gauge format as it's a current measurement of something over time, and physical gauges are used for that sort of thing (like gas meters or pressure meters). The historical FICO graph is a set of un-connected points on a timeline as the scores may not have been taken at regular intervals and it's not known what the value of those scores are when samples were not measured. Thus, it becomes visually misleading to connect those dots.

Tests
---

There weren't too many parts of this project to unit test as most of it is design and not functional units, but there was one function that is responsible for estimating what population percentage a FICO score is better than based on a look-up-table of known scores and percentages. Run `npm run test` to test it.
