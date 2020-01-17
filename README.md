# Physics Project for Tecknow 2019

Note: This project won the 'Best Project' award!

I created this project for my Semiconductor Physics Semester Project. This project was presented at the **Tecknow 2019 Science Project Demonstration** hosted by the **Department of Physics at SRM Institute of Science and Technology**.

I used an **Arduino UNO 3** coupled to a **modified Servo Motor** as the basic necessities for this project. It was essentially a fingerprint door locking system, suited for traditional door bolts seen in India.

The basic components are:
* Arduino UNO R3
* R307 Fingerprint Sensor
* Modified Servo Motor (to enable 360° rotation)
* A Node.js Server

The R307 Sensor Module took up most of the heavy lifting of capturing, storing and matching fignerprint data. The Arduino, based on the digital output of the sensor instructed the motor to lock/unlock the bolt.

The Node.js server used a npm package named [serialport.io](https://github.com/serialport/node-serialport) to read data directly from the Arduino Serial Console and log entries to a MySQL database.

In case of three consecutive wrong entries, [nodemailer](https://nodemailer.com/about/) to send out alerts to pre-defined email addresses.