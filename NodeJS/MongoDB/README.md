MongoDB
========

Database란?
-------------
* 대량의 데이터를 저장하고 관리하기 위한 것
* 데이터 분석을 위해서 데이터를 잘 정리하기 위한 것
* 데이터의 보안과 접근성, 백업/복구를 위한 것

Database의 종류
---------------
종류	                | 예시
------------------------|---------------------
OLTP (RDBMS/Real Time)  | Oracle, MS SQL
OLAP (DSS/ DW)    	| Netezza, Sap Hana
NewSQL (NoSQL/Big Data) | MongoDB, CouchDB

OLTP　(Online Transaction Processing)
--------------------------------------
* Real-Time 데이터를 저장한다.
* 매일 늘어나는 데이터를 확실하게 등록시킨다.
* 작은 사이즈의 데이터에 대한 요청에 빠르게 대응할 수 있다.
* 대량으로 발생하는 DB 엑서스 요청을 동시에 처리할 수 있다.
* 일반적으로 온라인쇼핑몰, 소셜게임이나 회사 내 시스템은 OLTP데이터베이스를 활용할 경우가 많다.

OLAP (Online Analytical Processing)
-------------------------------------
* 분석처리를 목적으로한 데이터베이스이다.
* 분석처리란 다수의 테이블의 정보를 연결시키고, 그것에 대한 분석을 이루는 것이다.
* OLTP와는 반대로, 대량으로 발생하는 DB 엑서스 요청을 동시에 처리하는 것은 어렵다.
* 또한 OLTP에서는 milliseconds단위로 돌아오는 데이터가 OLAP에서는 몇 초나 걸릴 수도 있다.
* 하지만 OLTP에서는 몇 시간, 또는 불가능한 대량의 데이터 분석처리를 OLAP에서는 몇 분만에 끝낼 수 있다.
* 대체적으로 큰 기기/시설이 필요한 경우가 많기 때문에 Amazon Redshift나 Google BigQuery같은 클라우드 데이터베이스를 활용하는 경우가 많다.

NoSQL
------
* 정해진 형태가 없는 데이터베이스이다.
* 정해진 형태가 없는 데이터를 저장할 수 있다.
* 대량의 데이터를 다룰 수 있다.
