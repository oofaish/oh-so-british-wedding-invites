## Oh So British Wedding Website

I started this copy from [wedding-invites](https://github.com/alistairjoelquinn/wedding-invites) repo (thanks Alistair and happy wedding!). I have customized to match my needs a bit better and also let me store most of the content outside the actual code.

It's obviously not "production" quality, but that's OK, it was hacked together over a few hours on a cold weekend in December.

# How it works for guests
- guests all login with the same username/password.
- they provide their names, email, phone number and any dietery requirements they might have.
- we automatically calculate the number of guests in the party.

# For Admin
- You login using the same credentials as your guests..
- then you go to /admin and login using your admin password
- view your guests and set the content for the main index page from here.

# Requirements
- MongoDB for storing the data.
- Sendgrid for sending notifications to yourself about a new RSVP.
- Vercel for deploying.

# setup
- sign up to [MongoDB](https://cloud.mongodb.com) and setup a free cluster, setup a DB called `wedding` with two collections called `rsvps` and `content`.
- sign up to [Sendgrid](https://app.sendgrid.com) and set up an API key with send permission.
- setup your environment variables in `.env.local` (copy `env.example` to see what you need)
- we used [Dall-E 2](https://openai.com/dall-e-2/) to generate an image for the background/header, set this in the environment variables too.
- add the main wedding content via the admin page - I suggest editing place_holder.json locally to the data you want and storing it under 'my_copy.json' for future reference.
- once you are happy that it works locally, deploy it to [Vercel.com](https://vercel.com)
- make sure you have:
1. added the environment variables in vercel,
2. added a suitable DNS CNAME if using your own domain,
3. add the domain to vercel


![Dall-E 2](https://res.cloudinary.com/dmvrc4esd/image/upload/v1671272562/cycling_towards_a_castle.png)