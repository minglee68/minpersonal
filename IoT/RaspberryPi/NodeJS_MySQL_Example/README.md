Node.js/Express와 MySQL을 연동하는 연습
=======================================

최종적으로는 NodeMCU와 DS18B20을 통해서 얻은 온도값을 Node.js로 받아서 MariaDB에 넣은 뒤, 그래프를 부르면 MariaDB에서 데이터를 가지고 와서 Node.js로 Parsing을 한 뒤 그것을 사용해서 HTML로 Google Line Chart를 이용해서 그래프를 표현할 것이다.

MySQL로 DB만들기
-----------------
1. `$ sudo mysql -u root -p`로 DB에 접근한다.
2. `create database mydb;`로 'mydb'라는 데이터베이스를 만든다.
3. `use mydb;`로 'mydb'에 접근한다.
4. 아래의 명령어로 'sensors'라는 테이블을 만든다.
~~~
create table sensors ( 
id int not null auto_increment primary key, 
seq int(10) unsigned, 
device decimal(4,0) unsigned, 
unit decimal(2,0) unsigned, 
type char(1), 
value decimal(10,4), 
ip char(15), 
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
~~~
5. `CREATE USER 'me'@'localhost' IDENTIFIED BY 'mypassword';`로 유저를 하나 만든다.
6. `GRANT ALL PRIVILEGES ON mydb.* TO 'me'@'localhost';`로 유저를 슈퍼 유저로 만든다.
7. `FLUSH PRIVILEGES;`로 적용시킨다.


