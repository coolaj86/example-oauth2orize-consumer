Daplie is Taking Back the Internet!
--------------

[![](https://daplie.github.com/igg/images/ad-developer-rpi-white-890x275.jpg?v2)](https://daplie.com/preorder/)

Stop serving the empire and join the rebel alliance!

* [Invest in Daplie on Wefunder](https://daplie.com/invest/)
* [Pre-order Cloud](https://daplie.com/preorder/), The World's First Home Server for Everyone

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
