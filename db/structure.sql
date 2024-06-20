create table "group" ("groupId" serial primary key, "title" varchar(255) not null);
alter table "group" add constraint "group_title_unique" unique ("title")


create table "message" ("messageId" serial primary key, "sendBy" "message_method" not null, "attemptCount" integer not null default '1', "recipientId" integer not null, "templateId" integer not null, "createdAt" timestamptz default CURRENT_TIMESTAMP, "updatedAt" timestamptz default CURRENT_TIMESTAMP);
alter table "message" add constraint "message_recipientid_foreign" foreign key ("recipientId") references "recipient" ("recipientId") on delete CASCADE;
alter table "message" add constraint "message_templateid_foreign" foreign key ("templateId") references "message_template" ("templateId") on delete CASCADE


create table "message_retry" ("retryId" serial primary key, "messageId" integer not null, "retryAt" timestamptz not null, "isCancelled" boolean default '0', "createdAt" timestamptz default CURRENT_TIMESTAMP, "updatedAt" timestamptz default CURRENT_TIMESTAMP);
alter table "message_retry" add constraint "message_retry_messageid_foreign" foreign key ("messageId") references "message" ("messageId") on delete CASCADE


create type "message_status" as enum ('pending', 'sent', 'failed');
create table "message_status" ("messageStatusId" serial primary key, "messageId" integer not null, "status" "message_status" not null, "attemptCount" integer not null, "error" varchar(255) null, "createdAt" timestamptz default CURRENT_TIMESTAMP, "updatedAt" timestamptz default CURRENT_TIMESTAMP);
alter table "message_status" add constraint "message_status_messageid_foreign" foreign key ("messageId") references "message" ("messageId") on delete CASCADE


create table "message_template" ("templateId" serial primary key, "subject" varchar(255) not null, "content" json not null, "createdAt" timestamptz default CURRENT_TIMESTAMP, "updatedAt" timestamptz default CURRENT_TIMESTAMP);
alter table "message_template" add constraint "message_template_subject_unique" unique ("subject");
create index "subject" as "0" on "message_template" ("subject")


create type "message_method" as enum ('sms', 'email');
create table "recipient" ("recipientId" serial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "phone" varchar(255) not null, "method" "message_method" not null);
alter table "recipient" add constraint "recipient_email_unique" unique ("email");
create index "email" as "0" on "recipient" ("email");
create index "name" as "0" on "recipient" ("name")

