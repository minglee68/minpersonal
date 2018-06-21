MySQL (MariaDB) 기본 Command
=============================

### create database DBNAME; ###

* 원하는 DBNAME으로 데이터베이스를 만들 수 있다.

### use DBNAME; ###

* DBNAME으로 들어가서 그 안에있는 테이블들을 본다.

### create table TABLENAME (); ###

* 괄호 안에 적혀있는 Format대로 Table이 만들어진다.
* 원하는 TABLENAME을 적으면 된다.
Ex)
~~~
create table sensors(				
id int not null auto_increment primary key,
seq int(10) unsigned,				
device decimal(4,0) unsigned,
unit decimal(2,0) unsigned,
type char(1),
value decimal(10,4),
ip char(15),
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
~~~
* 위의 테이블의 이름은 'sensors'이다.
* id는 int type이며, null값을 받지 않고, record가 만들어질 때마다 1씩 저절로 증가(auto\_increment)하는 primary key이다.
* seq는 10자리의 unsigned int type이다.
* device는 최대 4자리, 소숫점 이하 0자리의 숫자이다.
* unit은 최대 2자리, 소숫점이하 0자리의 숫자이다.
* type은 1자리의 char type이다.
* value는 최대 10자리, 소숫점 이하 4자리의 숫자이다.
* ip는 15자리 char type이다.
* time은 TIMESTAMP인데, 값이 안 주어지면 이 record가 생성되는 시간을 default로 time값으로 받는다.

### CREATE USER 'user\_name'@'host\_name' IDENTIFIED BY 'password'; ###

* user의 이름, host의 이름, 그리고 비밀번호를 정한다. 나중에 node.js에서 db에 접근할 때 필요하다.

### GRANT ALL PRIVILEGES ON DBNAME.\* TO 'username'@'localhost'; ###

* Super User로 만드는 command이다.

### FLUSH PRIVILEGES; ###

* INSERT나 UPDATE, DELETE문은 통해서 사용자를 추가, 삭제하거나 사용자의 권한 등을 바꿨을 때 변경사항을 적용시키기 위한 command이다.
