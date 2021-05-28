# LaceUp 


## What is LaceUp?

* LaceUp is a place where users can connect with people who want to play sports together. Users can find other players of the same skill level to play against for just the right amount of challenge. 
* Users can create events, or join already existing events specific by park and event type. When joining an event, users are able to see the number of teams required for the event, and with the click of one button, lace up for their team of choice! 

## Demo

Live link to web application: [LaceUp](https://laceup-1.herokuapp.com/#/)

<img width="1432" alt="splash_page" src="https://user-images.githubusercontent.com/77806372/120010479-3128c380-bfab-11eb-9344-1525497d1b8a.png">


## Major Technologies Used
* LaceUp is built upon a MongoDB database, Express web application framework, React-Redux frontend, and Node.js backend. 

## Features
### User Authentication: 
* Users may explore events without being authenticated. However, an account is required to create an event and to join an event.
* Errors are rendered if a user already exists, or if a password is not valid. 
![user_auth](https://user-images.githubusercontent.com/77806372/120010362-0dfe1400-bfab-11eb-9e5e-1055c023c9a5.png)
* Backend user authentication includes the use of a 'passport' which generates a web-token that is required to take protected actions (such as creating an event). 
```javascript
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }), //user   must be logged in and a web token must be present to delete user.
  async (req, res) => {
    await db.collection("users").deleteOne({ _id: ObjectID(req.params.id) });
    res.json("deleted");
  }
);
```
* Front end user authentication included error handling, creation and removal of a web token with user login and logout. Additionally, users persist, even if the page is refreshed. 

### Explore

* Vistors to the website have access to an explore page, a centralized location showing all events happening in a specified area. 
* From this view, users may select a park and view all events within the park.

![explore_page](https://user-images.githubusercontent.com/77806372/120010165-d1cab380-bfaa-11eb-9f5c-c38882a5382c.png)

* The map is displayed through Google Maps API. 
 

### User Profile

* Any events a user joins or creates is updated into the schedule tab of profile in real time. Clicking on the event will create a link to the event show page. 
* Any events that have passed are present in the history tab, so players can reminisce about their big win over city rivals.
* Users may update their information, to remain up-to-date with their favorite sports, home court, or bio. 
![user_profile](https://user-images.githubusercontent.com/77806372/120011909-d1331c80-bfac-11eb-95f5-32ae3aba8fa8.png)


## Future Direction: 
* Connect AWS to allow users to create avatar images for more customizable user profiles. 
* Users can post in event pages to organize practicalities such as who is bringing the baseball (or the beer).
* Users can be ranked based on their performance in an event. This includes statistics such as their win/loss ratio, or total number of events they have participated in.
* Users can be commended for good sportsmanship, professionalism, or being an overall great player to have on your team.
* Users can create clubs, a way to create a community, and house a core group of players for various events throughout their city. Clubs are ranked, based on the total number of wins and losses that teams within the club has.
* In addition to one-off events, users can create tournaments. Tournament brackets will be seeded by us based on the player's/team’s skill level.
* Tournaments may have an optional fee, resulting in prizes being distributed to the winner’s accounts.
