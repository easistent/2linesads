-- phpMyAdmin SQL Dump
-- version 3.5.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 08, 2012 at 12:06 AM
-- Server version: 5.5.24-0ubuntu0.12.04.1
-- PHP Version: 5.3.10-1ubuntu3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `2linesads`
--

-- --------------------------------------------------------

--
-- Table structure for table `2linesads`
--

CREATE TABLE IF NOT EXISTS `2linesads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(40) COLLATE utf8_slovenian_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_slovenian_ci NOT NULL,
  `url` varchar(250) COLLATE utf8_slovenian_ci NOT NULL,
  `picture` varchar(120) COLLATE utf8_slovenian_ci NOT NULL,
  `keywords` text COLLATE utf8_slovenian_ci NOT NULL,
  `campaign_start` date NOT NULL,
  `campaign_end` date NOT NULL,
  `ad_clicks` int(11) NOT NULL,
  `shows` int(10) unsigned NOT NULL,
  `views` int(11) NOT NULL,
  `clicks` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_start` (`campaign_start`),
  KEY `campaign_end` (`campaign_end`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci AUTO_INCREMENT=3 ;


--
-- Dumping data for table `2linesads`
--

INSERT INTO `2linesads` (`id`, `user_id`, `title`, `description`, `url`, `picture`, `keyword`, `campaign_start`, `campaign_end`, `ad_clicks`, `views`, `clicks`) VALUES
(1, 1, 'Demo ad', 'Ads look like this. Do you like them? Anyway, you can change them if you don''t ... You must load pictures manually to the server at this time.', 'http://podpalmo.si', 'http://placehold.it/80x80', 'culpa|dolor|velit', '2012-11-06', '2014-10-31', 1000, 16, 3),
(2, 1, 'Demo ad 2', 'This is the second ad.', 'http://mclion.posterous.com/', '', 'excepteur', '2012-11-05', '2015-11-21', 19, 21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `2linesads_log`
--

CREATE TABLE IF NOT EXISTS `2linesads_log` (
  `add_id` int(10) unsigned NOT NULL,
  `event_time` datetime NOT NULL,
  `cookie` varchar(245) COLLATE utf8_slovenian_ci NOT NULL,
  `event_type` varchar(12) COLLATE utf8_slovenian_ci NOT NULL,
  `ip` varchar(16) COLLATE utf8_slovenian_ci NOT NULL,
  `word` varchar(120) COLLATE utf8_slovenian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `2lines_keywords`
--

CREATE TABLE IF NOT EXISTS `2lines_keywords` (
  `id` int(11) NOT NULL,
  `keyword` varchar(24) COLLATE utf8_slovenian_ci NOT NULL,
  `views` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
