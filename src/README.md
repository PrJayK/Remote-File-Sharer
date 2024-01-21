# How it works:
Create a directory named ```File``` and store any 1 file in it to be shared, run the ```Remote-Server-Start.bat``` script, scan the QR Code, download the file on the client.

*Note: This does not use internet. The two devices only need to be connected to the same Wi-fi.*

# Prerequisites:
* Install node.
* Install express.js. Run ```npm install express```.
* Install qrcode. Run ```npm install qrcode```.
* Both the desktop and the client should be connected the the same Wi-fi.

# How to set-up:
* Move both ```index.js``` and ```ip.bat``` into the same directory.
* Create a directory named ```File``` anywhere, and update its location in the ```index.js``` file. Put any 1 file in it which you wish to share across your devices.
* Set correct paths to the respective files and folders in ```index.js``` and ```Remote-Server-Start.bat```.
* Run ```Remote-Server-Start.bat```.

This would start a local server at your desktop at the port ```3000```, which can be changed in the ```index.js``` file, and in the ```Remote-Server-Start.bat``` file, and the webpage for the ```'/'``` endpoint would open in the default browser, displaying the QR Code for the endpoint which would download the file the the client when visited. Scan this QR Code and visit the link to download the file stored in the ```File``` directory.
