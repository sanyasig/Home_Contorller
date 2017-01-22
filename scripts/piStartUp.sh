#!/bin/bash
kill -9 $(pidof node)
/usr/bin/forever stopall

/usr/bin/forever --workingDir /home/pi/work/Home_Contorller/alexa_skill/ start -c /usr/bin/node /home/pi/work/Home_Contorller/alexa_skill/server.js

/usr/bin/forever --workingDir /home/pi/work/Home_Contorller/home_controller/ start -c /usr/bin/node /home/pi/work/Home_Contorller/home_controller/server.js

/bin/bash /home/pi/work/habridge/ha-bridge.sh