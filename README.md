Example oauth2orize Consumer
===

This is an oauth2 consumer that uses `passport-oauth` and `passport-oauth2`
to communicate with any oauth2 provider.
In particular, this is meant to be paired with the
[example oauth2orize provider](https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants).

Installation
===

    npm install -g jade

    git clone https://github.com/coolaj86/example-oauth2orize-consumer.git
    pushd example-oauth2orize-consumer/
    npm install
    jade public/*.jade

Usage
===

Edit `./example-oauth2orize-consumer.js` to point to your desired oauth2 provider and then run the server.

    node ./server 3001

Then visit <http://localhost:3001> and play around.
