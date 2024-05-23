ALTER TABLE staff DROP FOREIGN KEY `staff_ibfk_1`;

ALTER TABLE `nanda`.`staff` 
CHANGE COLUMN `STAFF_ID` `STAFF_ID` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE order_ DROP FOREIGN KEY `order__ibfk_1`;

ALTER TABLE `nanda`.`retailer` 
CHANGE COLUMN `RETAILER_ID` `RETAILER_ID` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `nanda`.`user_` 
CHANGE COLUMN `USER_PW` `USER_PW` CHAR(100) NULL DEFAULT NULL ;

ALTER TABLE `nanda`.`user_` 
CHANGE COLUMN `USER_ID` `USER_ID` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE order_details DROP FOREIGN KEY `order_details_ibfk_1`;

ALTER TABLE `nanda`.`order_details` 
ADD COLUMN `ORDER_DETAIL_ID` INT NOT NULL AUTO_INCREMENT FIRST,
CHANGE COLUMN `ORDER_ID` `ORDER_ID` INT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`ORDER_DETAIL_ID`),
DROP INDEX `ORDER_ID_UNIQUE` ;

ALTER TABLE `nanda`.`order_` 
CHANGE COLUMN `ORDER_ID` `ORDER_ID` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `nanda`.`order_details` 
ADD COLUMN `PRODUCT_ID` INT NULL AFTER `PRODUCT_NAME`;

ALTER TABLE `nanda`.`order_details` 
ADD COLUMN `UNIT_PRICE` FLOAT NULL AFTER `PRODUCT_ID`;

-- HERE

ALTER TABLE `nanda`.`retailer` 
ADD COLUMN `USER_ID` INT NULL AFTER `RETAILER_ID`;

