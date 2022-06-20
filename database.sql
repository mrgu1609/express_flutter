CREATE DATABASE node_ts_express_mysql;

USE node_ts_express_mysql;

CREATE TABLE tbl_user(
  id          INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(50),
  email       VARCHAR(50),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE tbl_user;
