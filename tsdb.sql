CREATE DATABASE  IF NOT EXISTS `tsdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `tsdb`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: tsdb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `start_timeslot_id` int(11) NOT NULL,
  `end_timeslot_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_BOOKING_STUDENT_idx` (`student_id`),
  KEY `FK_BOOKING_TUTOR_idx` (`tutor_id`),
  KEY `FK_BOOKING_TIMESLOT_idx` (`start_timeslot_id`,`end_timeslot_id`),
  KEY `FK_BOOKING_SUBJECT_idx` (`subject_id`),
  CONSTRAINT `FK_BOOKING_STUDENT` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `FK_BOOKING_SUBJECT` FOREIGN KEY (`subject_id`) REFERENCES `ref_subject` (`subject_id`),
  CONSTRAINT `FK_BOOKING_TUTOR` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,3,1,'2018-12-28',1,5,1),(2,3,1,'2018-12-28',8,10,1),(4,1,12,'2018-12-31',1,10,1);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_token`
--

DROP TABLE IF EXISTS `login_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `login_token` (
  `user_id` int(11) NOT NULL,
  `token` varchar(300) DEFAULT NULL,
  `logtime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_token`
--

LOCK TABLES `login_token` WRITE;
/*!40000 ALTER TABLE `login_token` DISABLE KEYS */;
INSERT INTO `login_token` VALUES (3,'468721701c87544d86b639947e236622e9bcdf3fa84a661d701ab4c067975ea46558a80b3ddb2a7ffd6b6bfaeb7d7e782ff93d59b17942dc3296a1cda93285ea','2018-12-31 20:11:28'),(8,'8b13a3463692efa06f5a37417786e83823ef9c21d9c83360a8410d9e2181735bdf7516d381446a0c1532ba13e1011dc86f14d1e64711ba43d23cb4c5b6bd02cf','2018-12-26 20:16:38'),(12,'05614f022a6904c5c6d379511b0548fcee38411af1c23b7ce9937341c18b9ba8f0431be66e7b240e91f8e9be7da232cd9b9fa8bacc2cdea0fb97f8e59fc14f61','2018-12-26 22:44:32');
/*!40000 ALTER TABLE `login_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_subject`
--

DROP TABLE IF EXISTS `ref_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ref_subject` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_subject`
--

LOCK TABLES `ref_subject` WRITE;
/*!40000 ALTER TABLE `ref_subject` DISABLE KEYS */;
INSERT INTO `ref_subject` VALUES (1,'Chinese'),(2,'English'),(3,'Mathematics'),(4,'Liberal Studies'),(5,'Chinese Literature'),(6,'English Literature'),(7,'Chinese History'),(8,'Economics'),(9,'Geography'),(10,'History'),(11,'Biology'),(12,'Chemistry'),(13,'Physics'),(14,'Painting'),(15,'Piano'),(16,'Music'),(17,'Visual Arts'),(18,'Physical Education'),(19,'Japanese');
/*!40000 ALTER TABLE `ref_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_timeslot`
--

DROP TABLE IF EXISTS `ref_timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ref_timeslot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slot` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_timeslot`
--

LOCK TABLES `ref_timeslot` WRITE;
/*!40000 ALTER TABLE `ref_timeslot` DISABLE KEYS */;
INSERT INTO `ref_timeslot` VALUES (1,'06:00:00'),(2,'07:00:00'),(3,'08:00:00'),(4,'09:00:00'),(5,'10:00:00'),(6,'11:00:00'),(7,'12:00:00'),(8,'13:00:00'),(9,'14:00:00'),(10,'15:00:00'),(11,'16:00:00'),(12,'17:00:00'),(13,'18:00:00'),(14,'19:00:00'),(15,'20:00:00'),(16,'21:00:00'),(17,'22:00:00'),(18,'23:00:00');
/*!40000 ALTER TABLE `ref_timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `FK_STUDENT_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (12,3),(1,6),(2,7),(3,8),(4,9),(5,10),(11,12);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tutor` (
  `tutor_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT '0',
  PRIMARY KEY (`tutor_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `FK_TUTOR_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (1,1,2),(2,2,1),(3,3,3),(4,4,3),(5,5,0),(8,12,0);
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_subjects`
--

DROP TABLE IF EXISTS `tutor_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tutor_subjects` (
  `tutor_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `level` varchar(200) DEFAULT NULL,
  `charge_per_hour` int(11) DEFAULT NULL,
  PRIMARY KEY (`tutor_id`,`subject_id`),
  KEY `FK_TS_SUBJECT_idx` (`subject_id`),
  CONSTRAINT `FK_TS_SUBJECT` FOREIGN KEY (`subject_id`) REFERENCES `ref_subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TS_TUTOR` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_subjects`
--

LOCK TABLES `tutor_subjects` WRITE;
/*!40000 ALTER TABLE `tutor_subjects` DISABLE KEYS */;
INSERT INTO `tutor_subjects` VALUES (1,4,'Degree',500),(2,5,'Degree',350),(3,1,'F7',300),(3,2,'F5',200),(3,3,'HD',300),(3,7,'F7',100),(3,10,'Degree',100),(4,6,'Degree',200),(5,8,'Degree',100),(8,9,'Degree',50);
/*!40000 ALTER TABLE `tutor_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `picture` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yellowbear819','202cb962ac59075b964b07152d234b70','Ms. Jen Ford','jen.ford@example.com','0718659030','F','https://randomuser.me/api/portraits/women/74.jpg'),(2,'silverbird328','202cb962ac59075b964b07152d234b70','Mr. Terry Banks','terry.banks@example.com','0218289228','M','https://randomuser.me/api/portraits/men/62.jpg'),(3,'angrypanda150','202cb962ac59075b964b07152d234b70','Mr. William Thompson','william.thompson@example.com','(772)6791011','M','https://randomuser.me/api/portraits/men/0.jpg'),(4,'crazyfrog368','202cb962ac59075b964b07152d234b70','Miss. Amy Riley','amy.riley@example.com','01067 75541','F','https://randomuser.me/api/portraits/women/45.jpg'),(5,'tinyostrich754','202cb962ac59075b964b07152d234b70','Mr. Andy Williamson','andy.williamson@example.com','0253739832','M','https://randomuser.me/api/portraits/men/24.jpg'),(6,'smallbutterfly432','202cb962ac59075b964b07152d234b70','Mr. Huub Van waterschoot','huub.vanwaterschoot@example.com','(776)2346315','M','https://randomuser.me/api/portraits/men/12.jpg'),(7,'yellowmouse339','202cb962ac59075b964b07152d234b70','Miss. Alexandra Charles','alexandra.charles@example.com','0207312756','F','https://randomuser.me/api/portraits/women/44.jpg'),(8,'ticklishzebra650','202cb962ac59075b964b07152d234b70','Mrs. یسنا كامياران','یسنا.كامياران@example.com','08447646587','F','https://randomuser.me/api/portraits/women/61.jpg'),(9,'redpanda624','202cb962ac59075b964b07152d234b70','Madame. Francine Hubert','francine.hubert@example.com','(043)3218015','F','https://randomuser.me/api/portraits/women/12.jpg'),(10,'goldenelephant597','202cb962ac59075b964b07152d234b70','Miss. Alexis Mitchell','alexis.mitchell@example.com','1436317561','F','https://randomuser.me/api/portraits/women/35.jpg'),(12,'Tony','202cb962ac59075b964b07152d234b70','Tony Lau','ckitlau1224@gmail.com','987654321','M','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tsdb'
--

--
-- Dumping routines for database 'tsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-03  1:04:22
