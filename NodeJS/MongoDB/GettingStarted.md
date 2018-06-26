MongoDB 시작하기
================

설치하기 (Windows):
--------------------
1. https://www.mongodb.com/ 로 들어가서 Get MongoDB에서 Community Server를 다운로드 받는다.
2. .msi파일을 실행시킨다.
3. 순서대로 Next를 누른다.
	* 'Complete'하고 'Custom'이 나오면 'Custom'을 눌러서 자신이 원하는 디렉토리 안에 넣는다.
	* 이번의 경우 'C:\mongodb\'로 했다고 치고 진행한다.
4. 다운로드가 되면 그 폴더를 연다. (mongodb)
5. 거기에 'data', 'log'라는 폴더를 새로 만든다.
6. 'data'안에 'db'를 만든다.
	* 모든 DB는 여기에 저장될 것이다.
7. cmd를 관리자 권한으로 연다
8. `mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongo.log --logappend --rest --install`이라고 친다.
	* --dbpath는 DB의 저장소를 정하는 것이다.
	* --logpath는 mongodb를 실행할 때의 모든 log의 저장소이다.
	* --logappend는 log를 계속 덧붙이라는 것이다.
9. `net start MongoDB`라고 치면 MongoDB가 뒤에서 계속 실행된다.
10. `mongo`라고 치면 MongoDB의 shell이 시작된다.


기본적인 Command들
--------------------
 Command					| 내용
------------------------------------------------|----------------------
 show dbs					| DB의 리스트를 보여준다. (local은 건드리면 안 된다.)
 use DB\_Name					| 해당 DB에 들어간다. DB가 없을 경우 새로 만들고 들어간다.
 show collections				| Collection의 리스트를 보여준다. (SQL의 Table과 같은 개념)
 db.createCollection('Collection\_Name')	| 'Collection\_Name'으로 Collection을 만든다.
 db.Collection\_Name.insert({...})		| 'Collection\_Name'안에 {...}를 만든다. (만들때마다 무조건\_id는 생긴다)
 db.Collection\_Name.find()			| 'Collection\_Name'안에 있는 모든 데이터들을 보여준다.
 db.Collection\_Name.find().pretty()		| 데이터를 정리된 상태로 보여준다.
 db.Collection\_Name.find().limit(n)		| 위에서 n번째까지 보여준다.
 db.Collection\_Name.find().sort({field:1})	| field에 따라서 오름차순으로 정렬된 후 보여준다.
 db.Collection\_Name.find().sort({field:-1})	| field에 따라서 내림차순으로 정렬된 후 보여준다.
 db.Collection\_Name.find().count()		| 찾아서 나온 결과의 개수를 출력한다.
 db.Collection\_Name.update(...)		| 이미 저장된 데이터를 편집할 때 사용된다.
 db.Collection\_Name.remove(...)		| '...'에 해당되는 데이터를 지운다.

DB의 사용자를 만드는 방법
------------------------
~~~
db.createUser({
	user: "user_name",
	pwd: "password",
	roles: ["readWrite", "dbAdmin"]
});
~~~
* **user** = 사용자의 이름.
* **pwd** = 사용자의 비밀번호. 
* **readWrite**, **dbAdmin** = 사용자의 역할.

~~~
db.createUser({
	user: "user_name",
	pwd: "password",
	customData: { any information },
	roles: [
		{role: "role1", db: "database_name1"},
		{role: "role2", db: "database_name2"},
		...
	],
	authenticationRestrictions: [
		{
			clientSource: ["IP" | "CIDR range", ...],
			serverAddress: ["IP" | "CIDR range", ...]
		},
		...
	]
});
~~~
* **roles** = 사용자에게 주어진 역할.
	* role에는 역할이 들어가고, db에는 그 역할이 주어진 DB의 이름이 들어간다.
	* 공백으로 주어지면 아무 역할이 없는 사용자가 생기게 된다.
	* 첫 예시와 같이 Field이름으로 아무것도 주지 않고 역할만 나열할 수도 있다. 그러면 db.createUser()이 실행된 DB에서 그 역할이 주어진다.
* **customData** (Optional) = 추가적인 정보. 사용자에 대한 추가적인 정보가 아무거나 들어가도 된다.
* **authenticationRestrictions** (Optional) = 이 사용자로 접근할 수 있는 IP주소나 CIDR Range를 제한하는 것.

데이터의 JSON형식
-----------------
~~~
{
	field1: "value1",
	field2: value2,
	array: ["array_value1", "array_value2"],
	object:{
		object_field1: "object_value1",
		object_field2: "object_value2"
	},
	object_array:[
		{
			object_array_field1: "object_array_value1",
			object_array_field2: "object_array_value2"
		},
		{
			object_array_field3: "object_array_value3",
			object_array_field4: "object_array_value4"
		}
	]
}
~~~

DB에서 데이터를 Field이름으로 찾는 방법
---------------------------------------
* `db.Collection_Name.find({field:"value"})`
	* 데이터의 'field'의 값이 'value'와 같은 데이터들을 다 출력한다.
* `db.Collection_Name.find({ $or: [ {field: "value1"}, {field: "value2"} ] })`
	* 데이터의 'field'의 값이 'value1'이나 'value2'와 같은 데이터들을 다 출력한다.
* `db.Collection_Name.find({ field: { $lt:n_value } })`
	* 데이터의 'field'의 값이 n\_value보다 작은 데이터들을 다 출력한다.
	* $lt, $lte, $gt, $gte 등이 있다.
* `db.Collection_Name.find({array:"array_value"})`
	* 데이터의 'array' 안에 있는 값들 중에 'array\_value'와 같은 값이 있는 데이터들을 다 출력한다.
* `db.Collection_Name.find({ "object.object_field": "object_field_value" })`
	* 데이터의 'object' 안에 있는 'object\_field'의 값이 'object\_field\_value'와 같은 데이터들을 다 출력한다.
	* 여기서 주의할 점은 다른 일반적인 field의 이름들은 ""을 없이 썼었지만 여기서는 꼭 필요하다.

DB에서 데이터를 편집하는 방법
-----------------------------
* `db.Collection_Name.update({field1:"value1"}, {field1:"value1", field2:"value2", field3:n_value})`
	* Collection\_Name 안의 데이터들 중 'field1'의 값이 'value1'과 같은 데이터들의 내용을 뒤의 데이터들로 바꾼다.
	* 여기서 유의할 점은 이 명령어는 그 데이터의 모든 것을 지우고 뒤에 적혀있는 내용들로 다시 쓰인다는 것이다.
* `db.Collection_Name.update({field1:"value1"}, {$set: {field4:"value4"}})`
	* 데이터의 'field1'의 값이 'value1'과 같은 데이터들에 field4:"value4"를 더한다.
	* 데이터의 내용을 지우지 않고 오로지 새로운 데이터를 더할 때에 사용된다.
* `db.Collection_Name.update({field1:"value1"}, {$inc: {field3:number}})`
	* 데이터의 'field1'의 값이 'value1'과 같은 데이터들의 'field3'의 값 'n\_value'를 number만큼 더한다.
	* 더하는 값이 숫자여야 한다.
* `db.Collection_Name.update({field1:"value1"}, {$unset: {field3:1}})`
	* 데이터의 'field1'의 값이 'value1'과 같은 데이터들의 'field3'을 없앤다.
* `db.Collection_Name.update({field1:"other_value1"}, {field1:"other_value1", field2:"other_value2", field3:n_value}, {upsert: true})`
	* 만일 데이터의 'field1'의 값이 'other\_value1'인 데이터가 없으면 뒤의 내용으로 새로운 데이터를 만들고, 있으면 뒤의 내용으로 바꾼다.
* `db.Collection_Name.update({field1:"value1"}, {$rename: {"field2":"other_field"}})`
	* 데이터의 'field1'의 값이 'value1'과 같은 데이터들의 'field2'의 이름을 'other\_field'로 바꾼다.


DB에서 데이터를 지우는 방법
---------------------------
* `db.Collection_Name.remove({field1:"value1"})`
	* 데이터의 'field1'의 값이 'value1'과 같은 모든 데이터들을 지운다.
* `db.Collection_Name.remove({field1:"value1"}, {justOne:true})`
	* 데이터의 'field1'의 값이 'value1'과 같은 데이터들 중 첫번째 데이터만 지운다.


그 외의 Command
-----------------
* `db.Collection_Name.find().forEach(function(doc){print("Name: " + doc.field)})`
	* find()로 나온 모든 데이터들을 'doc'로 받고, 그것의 'field'의 값들만 출력하는 것이다.
	* 'doc'가 아니라 다른 이름이어도 상관없다.
	* print로 출력한다.
	* 결과적으로 'Name: value'로 데이터의 수만큼 출력될 것이다.
