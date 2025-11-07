Докер\
при змінах ребілд\
docker build -t spring .\
для запуску\
docker run -d -p 8080:8080 spring \ \
--spring.datasource.username=sa \ \
--spring.datasource.password= \ \
--server.port=8080


Local run\
Креденшели впихувати в 
back/spring/back/src/main/resources/application-local.properties\
зразок для h2

spring.datasource.username=sa\
spring.datasource.password=\
server.port=8080
