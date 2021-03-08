--use myblog;

--drop table blogs;

CREATE TABLE blogs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    content longtext not null,
    createtime bigint(20) not null DEFAULT 0,
    author varchar(20) not null
);

select * from blogs where title like '%标题%' order by createtime desc;
insert into blogs (title, content, createtime, author) values('标题A','内容A',1604929654655,'zhangsan');
insert into blogs (title, content, createtime, author) values('标题B','内容B',1604929801182,'lisi');


create table users (
    id int not null primary key auto_increment,
    username varchar(50) not null,
    password varchar(50) not null,
    realname varchar(20)
);


insert into users (username, `password`,realname) values ('lisi','123','李四');

select * from users;

update users set realname='李四2' where username='lisi';

delete from users where username='lisi';

select * from users where state='1';
select * from users where state<>'0';

-- 软删除
update users set state='0' where username='lisi';

select version();

insert into users (username, `password`,realname) values ('lisi','123','李四李四李四李四');
