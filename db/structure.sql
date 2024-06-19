create table "group" ("groupId" serial primary key, "title" varchar(255) not null);
alter table "group" add constraint "group_title_unique" unique ("title")