const express = require("express");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const cors = require("cors");

const server = express();

server.use(cors());

let con = mysql.createConnection({
  pool: true,
  host: "remotemysql.com",
  user: "username,
  password: "password",
  database: "database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to RemoteMySQL");
});

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: "self@theaniruddha.in",
    pass: "password"
  }
});

server.get("/sekure",function(req,res){
  let sql = "SELECT * FROM `record` ORDER BY `row` DESC LIMIT 10";
  con.query(sql,function(err,result){
    if (err) throw err
    res.send(result)
  })
})

server.all("/", function(req, res) {
  res.send("Express is working");
});

server.listen(4500, function() {
  console.log("Server started successfully on Port 4500");
});


let counter = 0;

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM9", { baudRate: 9600 }, function(err) {
  if (err) {
    console.log("Error in Opening Connection", err);
  }
});
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
// Read the port data
port.on("open", () => {
  console.log("Serial Port [COM9] open");
});
parser.on("data", data => {
  process(data);
});

function process(data) {
  console.log(data);

  let nameArray=["Sanah","Deshna","Aniruddha","Chaitanya"];
  let identifier = data.substring(0, 2);
  if (identifier == "ID") {
    let confi = data.indexOf("C");
    let id = data.substring(3, confi);
    let ac = data.indexOf("A");
    let confidence = data.substring(confi + 1, ac);
    let action = data.substring(ac + 1) == "0" ? "Unlocked" : "Locked";
    let name=nameArray[id-1];

    let sql =
      "INSERT INTO `record` (`row`,`id`,`confidence`,`action`,`timestamp`,`name`) VALUES (NULL,?,?,?,NOW()+INTERVAL 660 MINUTE,?)";

    con.query(sql, [id, confidence, action,name], function(err, result) {
      if (err) throw err;
      console.log("Record logged");
    });
    counter = 0;
  }
  if (identifier == "MI") {
    counter++;
    if (counter == 3) {
        const mailList= [
            "ruddha.mine@gmail.com",
            "sanaa.02.march@gmail.com"
        ]
      const message = {
        from: "self@theaniruddha.in", // Sender address
        to: mailList, // List of recipients
        subject: "Multiple Mismatches Detected | Sekure", // Subject line
        html:
          "<center><img src='https://ruddha.000webhostapp.com/logo.png' width='200px'></center><br><h1 style='text-align:center;'>Sekure - Mismatch Alert</h1><br><br><h4>We have detected an unrecognised fingerprint trying to lock/unlock your door. Sekure was able to stop the action.</h4>" // HTML text body
      };

      console.log("Sending alert...");
      transporter.sendMail(message, function(err, success) {
        if (err) {
          console.log(err);
        } else {
          console.log("User alerted");
        }
      });
      counter = 0;
    }
  }
}
