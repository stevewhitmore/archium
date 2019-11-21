# Archium [ar'kiyum] - "*the archives*"

Archium is an application meant to act as a personal learning suite in the form of a personalized wiki, flash cards, and an admin section to track progress and plan future learning. It's also in the process of being upgraded to meet [Progressive Web App standards](https://developers.google.com/web/progressive-web-apps/).

The api is written in PHP because this is an application I'm actually using for myself and it's being deployed to a shared hosting environment. This means choices in technology stacks are extremely limited. I chose this route because I'm paying for it anyway and I'm getting way more storage space to utilize for this application rather than going with a free tier Heroku or AWS plan. On that note I don't have anyting against PHP. I just thought I'd mention it since it's less fashionable than something like Spring or Express.

Inspired by Ben Vacha's [Specter](https://github.com/benvacha/specter).


---
## This is a work in progress
Due to having multiple jobs and a family to take up most of my time the projected deployment date of v1 is the end of the year. Between now and then I have a series of tasks to complete which are being tracked over in the [project issues](https://gitlab.com/steve.whitmore/archium/issues) section.


---

## Running Locally
```git clone <repo>```

```cd web && npm i && npm start```

and it'll run on localhost:4200

You'll also need PHP v7+ with all the contents of the "api" folder.

You may encounter CORS issues. To circumvent them run the following command (assuming you have Chrome or Chromium installed):
```chromium-browser --disable-web-security --user-data-dir="[some directory here]"```