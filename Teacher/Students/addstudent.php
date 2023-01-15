
<?php

$conn = new mysqli("sms.cpfrjdgylxxd.ap-south-1.rds.amazonaws.com", "amrit", "amrit54300", "SMS");
// mysql -h sms.cpfrjdgylxxd.ap-south-1.rds.amazonaws.com -u amrit -p 

$ROLLNO = $_POST['ROLLNO'];
$ADDTYPE = $_POST['ADDTYPE'];
$FNAME = $_POST['FNAME'];
$LNAME = $_POST['LNAME'];
$STATE1 = $_POST['STATE'];
$DISTRICT = $_POST['DISTRICT'];
$HOUSENO = $_POST['HOUSENO'];
$SPHONE = $_POST['SPHONE'];
$PARENTPHONE = $_POST['PARENTPHONE'];
$EMAIL = $_POST['EMAIL'];
$SEMESTER = $_POST['SEMESTER'];
$GROUP_NO = $_POST['GROUP_NO'];


$sql = "INSERT INTO STUDENT (ROLLNO, ADDTYPE, FNAME, LNAME, STATE, DISTRICT, HOUSENO, SPHONE, PARENTPHONE, EMAIL, SEMESTER, GROUP_NO) 
VALUES ('$ROLLNO','$ADDTYPE','$FNAME','$LNAME','$STATE1','$DISTRICT','$HOUSENO','$SPHONE','$PARENTPHONE','$EMAIL','$SEMESTER','$GROUP_NO')";

if ($conn->query($sql) === TRUE) {
  echo "<a href='index.html' sytle='font-size: 60px; color: green;'>OK</a>";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
