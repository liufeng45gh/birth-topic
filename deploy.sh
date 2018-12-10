
ps -ef|grep birth-topic-1.0-SNAPSHOT.jar|awk '{print $2}'|xargs kill -9

mvn package

cp target/birth-topic-1.0-SNAPSHOT.jar ./birth-topic1.0-SNAPSHOT.jar

nohup java -jar ./birth-topic-1.0-SNAPSHOT.jar > ./nohup.out &


