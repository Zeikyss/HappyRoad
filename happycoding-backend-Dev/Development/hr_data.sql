-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 19 juin 2023 à 17:15
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hr`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `traject_id` int(11) DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `city` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `traject_id`, `type_id`, `address`, `complement`, `zip_code`, `city`) VALUES
(1, 1, 1, '4, rue de Teixeira', '', '49914', 'Gregoire'),
(2, 1, 2, '31, boulevard Rodrigues', '', '53297', 'PerrotBourg'),
(3, 2, 1, '11, rue de Roussel', '', '96401', 'Petitjean'),
(4, 2, 2, '84, chemin Andrée Chartier', '', '83676', 'Fischer'),
(5, 3, 1, '7, avenue Germain', '', '88116', 'DupuisVille'),
(6, 3, 2, 'avenue de Marchand', '', '63245', 'BaudryBourg'),
(7, 4, 1, '350, place de Blin', '', '46745', 'Hervedan'),
(8, 4, 2, '80, impasse Neveu', '', '76901', 'Maillard-sur-Dumas'),
(9, 5, 1, '58, chemin de Leroux', '', '26182', 'Garcia-les-Bains'),
(10, 5, 2, '64, place de Durand', '', '05777', 'Langlois-sur-Berger');

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'AIWAYS'),
(2, 'ALEKO'),
(3, 'ALFA ROMEO'),
(4, 'ALPINE RENAULT'),
(5, 'ARO'),
(6, 'ASIA'),
(7, 'ASTON MARTIN'),
(8, 'AUDI'),
(9, 'AUSTIN'),
(10, 'AUTOBIANCHI'),
(11, 'AUVERLAND'),
(12, 'BEDFORD'),
(13, 'BEE BEE AUTOMOTIVE'),
(14, 'BENTLEY'),
(15, 'BERTONE'),
(16, 'BMW'),
(17, 'BUICK'),
(18, 'CADILLAC'),
(19, 'CHEVROLET'),
(20, 'CHRYSLER'),
(21, 'CITROEN'),
(22, 'COURB'),
(23, 'CUPRA'),
(24, 'DACIA'),
(25, 'DAEWOO'),
(26, 'DAF'),
(27, 'DAIHATSU'),
(28, 'DAIMLER'),
(29, 'DATSUN'),
(30, 'DODGE'),
(31, 'DS'),
(32, 'EBRO'),
(33, 'FERRARI'),
(34, 'FIAT'),
(35, 'FISKER'),
(36, 'FORD'),
(37, 'FSO-POLSKI'),
(38, 'GAC GONOW'),
(39, 'GME'),
(40, 'GRANDIN'),
(41, 'HONDA'),
(42, 'HYUNDAI'),
(43, 'INFINITI'),
(44, 'INNOCENTI'),
(45, 'ISUZU'),
(46, 'IVECO'),
(47, 'JAGUAR'),
(48, 'JEEP'),
(49, 'KIA'),
(50, 'LADA'),
(51, 'LANCIA'),
(52, 'LAND ROVER'),
(53, 'LDV'),
(54, 'LEXUS'),
(55, 'LOTUS'),
(56, 'LYNK&CO'),
(57, 'MAHINDRA'),
(58, 'MAN'),
(59, 'MARUTI'),
(60, 'MASERATI'),
(61, 'MATRA'),
(62, 'MAZDA'),
(63, 'MCC'),
(64, 'MEGA'),
(65, 'MERCEDES'),
(66, 'MG'),
(67, 'MIA'),
(68, 'MINI'),
(69, 'MITSUBISHI'),
(70, 'MPM MOTORS'),
(71, 'NISSAN'),
(72, 'OPEL'),
(73, 'PANHARD'),
(74, 'PEUGEOT'),
(75, 'PIAGGIO'),
(76, 'PONTIAC'),
(77, 'PORSCHE'),
(78, 'PROTON'),
(79, 'RENAULT'),
(80, 'ROVER'),
(81, 'SAAB'),
(82, 'SANTANA'),
(83, 'SEAT'),
(84, 'SERES DFSK'),
(85, 'SKODA'),
(86, 'SMART'),
(87, 'SSANGYONG'),
(88, 'SUBARU'),
(89, 'SUNBEAM'),
(90, 'SUZUKI'),
(91, 'TALBOT'),
(92, 'TATA'),
(93, 'TESLA'),
(94, 'THINK'),
(95, 'TOYOTA'),
(96, 'TRIUMPH'),
(97, 'UMM'),
(98, 'VOLKSWAGEN'),
(99, 'VOLVO'),
(100, 'ZASTAVA'),
(101, 'ZAZ');

-- --------------------------------------------------------

--
-- Structure de la table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `car_picture` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `places` smallint(6) NOT NULL,
  `small_baggage` smallint(6) NOT NULL,
  `large_baggage` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `car`
--

INSERT INTO `car` (`id`, `owner_id`, `model_id`, `car_picture`, `color`, `places`, `small_baggage`, `large_baggage`) VALUES
(1, 1, 291, '', 'Bleu', 3, 3, 0),
(2, 2, 903, '', 'Rouge', 5, 5, 1),
(3, 3, 521, '', 'Gris', 4, 4, 1),
(4, 4, 1264, '', 'Gris', 2, 4, 5),
(5, 5, 567, '', 'Jaune', 6, 5, 1),
(6, 6, 1268, '', 'Beige', 4, 2, 1),
(7, 9, 348, '', 'Vert', 3, 4, 5),
(8, 10, 1353, '', 'Noir', 1, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `score` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `report` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `owner_id`, `comment`, `score`, `created_at`, `report`) VALUES
(1, 1, 'Voluptate quidem exercitationem animi quod. Voluptatem ipsum distinctio soluta aut. Maiores ad quia minima illum eius. Est enim quas expedita atque.\n\nVoluptatem nobis quaerat ea. Minima consequatur odit ipsum labore. Earum dolores molestiae sapiente omnis ipsam.\n\nVoluptatem doloremque accusamus sunt sit ut voluptates. Sint aut qui minus perferendis sed sit rerum. Alias sed et quidem libero id eos. Numquam consequatur non et unde qui autem voluptate. Quos sint occaecati voluptate eum expedita quis error.', 3, '2023-06-19 12:45:07', 0),
(2, 1, 'Quo eum nostrum qui esse. Aperiam quod expedita tenetur in incidunt. Qui aliquid nostrum magnam ea molestias consequatur.\n\nRatione quae neque voluptatem totam eos alias rerum. Et quia dolorem sequi iusto laboriosam aut. Itaque quod dolorem possimus dicta numquam nesciunt corporis.\n\nAliquam officia pariatur ad est laboriosam dignissimos hic quas. Accusantium eum vero et ab. Quos qui nihil dolores repellat est libero ea. Ut aut magni quia quod aut sit. Quaerat tempore incidunt tempore nostrum qui ea pariatur.', 2, '2023-06-19 12:45:07', 1),
(3, 2, 'Architecto veritatis officia minus tempora velit voluptatem. Aperiam et sunt ullam aut nostrum. Et sed fugit architecto dicta reprehenderit architecto. Velit et perspiciatis quisquam nisi accusantium inventore.\n\nDolore eum corporis omnis unde ut sed ipsa. Molestiae ea recusandae facere magnam quasi. Et maxime et beatae fugiat in odit neque. Est voluptatem rerum consectetur maxime ex. Aut sed reiciendis culpa blanditiis ut.\n\nFugiat corporis ex velit deserunt tenetur omnis. Magni voluptas cupiditate voluptatem at. Nulla laboriosam minima et at esse. Dolorum eos omnis perferendis eum similique.', 4, '2023-06-19 12:45:07', 0),
(4, 3, 'Sint voluptatem odio quia dolores nostrum. Iusto occaecati autem consectetur laudantium.\n\nEx ut et repellat aliquam et. Fuga saepe rerum ad numquam. Ratione minima nesciunt qui consequatur corporis consectetur.\n\nEx odit amet velit aut et natus rerum. Qui sit totam repellat fugiat inventore porro. Ad eligendi cupiditate unde odio sint. Odit eius iste sunt nobis.', 4, '2023-06-19 12:45:07', 0),
(5, 3, 'Ratione est temporibus voluptatem reprehenderit praesentium expedita. Minus cumque quia dolor esse sint dicta dolorem quam. Quo nihil enim nisi repellendus quia ut. Modi temporibus aut error quis possimus. Consequuntur libero aliquam impedit porro iure delectus.\n\nEa nesciunt aperiam autem maxime qui. Nostrum nihil eum laudantium ipsam tempora fuga voluptatum. Quis est nesciunt qui accusamus.\n\nAut et non recusandae quas. Omnis nesciunt itaque omnis iure. Fugit qui quis quo quia.', 5, '2023-06-19 12:45:07', 0);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230616140742', '2023-06-19 14:44:22', 145);

-- --------------------------------------------------------

--
-- Structure de la table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `user_id` longtext DEFAULT NULL COMMENT '(DC2Type:json)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `favorite`
--

INSERT INTO `favorite` (`id`, `owner_id`, `user_id`) VALUES
(1, 1, '[]'),
(2, 2, '[]'),
(3, 3, '[]');

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model`
--

INSERT INTO `model` (`id`, `brand_id`, `name`) VALUES
(1, 1, 'U5'),
(2, 2, '2141'),
(3, 3, '1300'),
(4, 3, '1600'),
(5, 3, '164'),
(6, 3, '1750'),
(7, 3, '2000'),
(8, 3, '4C'),
(9, 3, 'ALFA 145'),
(10, 3, 'ALFA 146'),
(11, 3, 'ALFA 147'),
(12, 3, 'ALFA 155'),
(13, 3, 'ALFA 156'),
(14, 3, 'ALFA 159'),
(15, 3, 'ALFA 159 SW'),
(16, 3, 'ALFA 166'),
(17, 3, 'ALFA 33'),
(18, 3, 'ALFA 6'),
(19, 3, 'ALFA 75'),
(20, 3, 'ALFA 90'),
(21, 3, 'ALFA GT'),
(22, 3, 'ALFA GTV'),
(23, 3, 'ALFA-SUD'),
(24, 3, 'ALFETTA'),
(25, 3, 'BRERA'),
(26, 3, 'CROSSWAGON'),
(27, 3, 'GIULIA'),
(28, 3, 'GIULIETTA'),
(29, 3, 'MITO'),
(30, 3, 'RZ'),
(31, 3, 'SPIDER'),
(32, 3, 'SPORTWAGON'),
(33, 3, 'SPRINT'),
(34, 3, 'STELVIO'),
(35, 3, 'SZ'),
(36, 3, 'TONALE'),
(37, 4, 'A110'),
(38, 4, 'A110 II'),
(39, 4, 'A310'),
(40, 4, 'A610'),
(41, 4, 'LE MANS'),
(42, 4, 'V6'),
(43, 5, '4X4'),
(44, 5, 'SPARTANA'),
(45, 6, 'ROCSTA'),
(46, 7, 'CYGNET'),
(47, 8, '100'),
(48, 8, '200'),
(49, 8, '50'),
(50, 8, '60'),
(51, 8, '70'),
(52, 8, '75'),
(53, 8, '80'),
(54, 8, '90'),
(55, 8, 'A1'),
(56, 8, 'A1 II'),
(57, 8, 'A2'),
(58, 8, 'A3'),
(59, 8, 'A3 *'),
(60, 8, 'A3 IV'),
(61, 8, 'A3 SPORTBACK'),
(62, 8, 'A4'),
(63, 8, 'A4 III - IV'),
(64, 8, 'A4 V'),
(65, 8, 'A5'),
(66, 8, 'A5 SPORTBACK'),
(67, 8, 'A6'),
(68, 8, 'A6 III'),
(69, 8, 'A6 IV'),
(70, 8, 'A6 V'),
(71, 8, 'A7'),
(72, 8, 'A8'),
(73, 8, 'ALLROAD'),
(74, 8, 'CABRIOLET'),
(75, 8, 'COUPE'),
(76, 8, 'E-TRON'),
(77, 8, 'E-TRON GT'),
(78, 8, 'GT'),
(79, 8, 'Q2'),
(80, 8, 'Q3'),
(81, 8, 'Q3 II'),
(82, 8, 'Q4 E-TRON'),
(83, 8, 'Q5'),
(84, 8, 'Q7'),
(85, 8, 'Q8'),
(86, 8, 'QUATTRO'),
(87, 8, 'R8'),
(88, 8, 'RO 80'),
(89, 8, 'RS3'),
(90, 8, 'RS3 IV'),
(91, 8, 'RS4'),
(92, 8, 'RS5'),
(93, 8, 'RS6'),
(94, 8, 'RS7'),
(95, 8, 'S1'),
(96, 8, 'S3'),
(97, 8, 'S3 IV'),
(98, 8, 'S3 SPORTBACK'),
(99, 8, 'S4'),
(100, 8, 'S5'),
(101, 8, 'S6'),
(102, 8, 'S6 V'),
(103, 8, 'S7'),
(104, 8, 'S7 II'),
(105, 8, 'S8'),
(106, 8, 'TT'),
(107, 8, 'V8'),
(108, 9, '850'),
(109, 9, 'ALLEGRO'),
(110, 9, 'JEEP'),
(111, 9, 'MAESTRO'),
(112, 9, 'METRO'),
(113, 9, 'MINI'),
(114, 9, 'MONTEGO'),
(115, 9, 'MORRISITAL'),
(116, 9, 'PRINCESS'),
(117, 9, 'SHERPA'),
(118, 10, '500'),
(119, 10, 'A111'),
(120, 10, 'A112'),
(121, 10, 'PRIMULA'),
(122, 10, 'Y10'),
(123, 11, 'A3'),
(124, 12, 'CF'),
(125, 12, 'MIDI'),
(126, 13, 'BEE BEE XS'),
(127, 14, 'ARNAGE'),
(128, 14, 'AZURE T'),
(129, 14, 'BROOKLANDS'),
(130, 14, 'CONTINENTAL FLYING SPUR'),
(131, 14, 'CONTINENTAL GT'),
(132, 14, 'MULSANNE'),
(133, 15, '4X4'),
(134, 16, '1502'),
(135, 16, '1600'),
(136, 16, '1602'),
(137, 16, '1800'),
(138, 16, '1802'),
(139, 16, '2000'),
(140, 16, '2002'),
(141, 16, '2500'),
(142, 16, '3'),
(143, 16, '3.3'),
(144, 16, '315'),
(145, 16, '316'),
(146, 16, '318'),
(147, 16, '320'),
(148, 16, '323'),
(149, 16, '324'),
(150, 16, '325'),
(151, 16, '328'),
(152, 16, '330'),
(153, 16, '518'),
(154, 16, '520'),
(155, 16, '523'),
(156, 16, '524'),
(157, 16, '525'),
(158, 16, '528'),
(159, 16, '530'),
(160, 16, '535'),
(161, 16, '540'),
(162, 16, '545'),
(163, 16, '550'),
(164, 16, '628'),
(165, 16, '630'),
(166, 16, '633'),
(167, 16, '635'),
(168, 16, '645'),
(169, 16, '650'),
(170, 16, '725'),
(171, 16, '728'),
(172, 16, '730'),
(173, 16, '732'),
(174, 16, '733'),
(175, 16, '735'),
(176, 16, '740'),
(177, 16, '745'),
(178, 16, '750'),
(179, 16, '760'),
(180, 16, '840'),
(181, 16, '850'),
(182, 16, 'I3'),
(183, 16, 'I8'),
(184, 16, 'IX'),
(185, 16, 'L7'),
(186, 16, 'M2'),
(187, 16, 'M3'),
(188, 16, 'M4'),
(189, 16, 'M5'),
(190, 16, 'M535'),
(191, 16, 'M6'),
(192, 16, 'M635'),
(193, 16, 'M8'),
(194, 16, 'SERIE 1'),
(195, 16, 'SERIE 1 II'),
(196, 16, 'SERIE 1 III'),
(197, 16, 'SERIE 2'),
(198, 16, 'SERIE 2 II'),
(199, 16, 'SERIE 3'),
(200, 16, 'SERIE 3 (SUITE)'),
(201, 16, 'SERIE 3 VI'),
(202, 16, 'SERIE 3 VII'),
(203, 16, 'SERIE 4'),
(204, 16, 'SERIE 4 II'),
(205, 16, 'SERIE 5'),
(206, 16, 'SERIE 6'),
(207, 16, 'SERIE 7'),
(208, 16, 'SERIE 7 VII'),
(209, 16, 'SERIE 8'),
(210, 16, 'X1'),
(211, 16, 'X1 III'),
(212, 16, 'X2'),
(213, 16, 'X3'),
(214, 16, 'X4'),
(215, 16, 'X4 II'),
(216, 16, 'X5'),
(217, 16, 'X5 IV'),
(218, 16, 'X6'),
(219, 16, 'X6 III'),
(220, 16, 'X7'),
(221, 16, 'XM'),
(222, 16, 'Z1'),
(223, 16, 'Z3'),
(224, 16, 'Z4'),
(225, 16, 'Z8'),
(226, 17, 'PARKAVENUE'),
(227, 18, 'CTS'),
(228, 18, 'ELDORADO'),
(229, 18, 'ESCALADE'),
(230, 18, 'SEVILLE'),
(231, 19, 'ALERO'),
(232, 19, 'AVEO'),
(233, 19, 'BERETTA'),
(234, 19, 'BLAZER'),
(235, 19, 'CAMARO'),
(236, 19, 'CAPTIVA'),
(237, 19, 'CORSICA'),
(238, 19, 'CORVETTE'),
(239, 19, 'CRUZE'),
(240, 19, 'EPICA'),
(241, 19, 'EVANDA'),
(242, 19, 'KALOS'),
(243, 19, 'LACETTI'),
(244, 19, 'MALIBU'),
(245, 19, 'MATIZ'),
(246, 19, 'NUBIRA'),
(247, 19, 'ORLANDO'),
(248, 19, 'REZZO'),
(249, 19, 'SPARK'),
(250, 19, 'TRANS SPORT'),
(251, 19, 'TRAX'),
(252, 19, 'VOLT'),
(253, 20, '300C'),
(254, 20, '300M'),
(255, 20, 'CROSSFIRE'),
(256, 20, 'ES'),
(257, 20, 'GRAND VOYAGER'),
(258, 20, 'LE BARON'),
(259, 20, 'NEON'),
(260, 20, 'NEW YORKER'),
(261, 20, 'PT CRUISER'),
(262, 20, 'SARATOGA'),
(263, 20, 'SEBRING'),
(264, 20, 'STRATUS'),
(265, 20, 'VIPER'),
(266, 20, 'VISION'),
(267, 20, 'VOYAGER'),
(268, 21, '2 CV'),
(269, 21, 'ACADIANE'),
(270, 21, 'AK'),
(271, 21, 'AMI'),
(272, 21, 'AX'),
(273, 21, 'AXEL'),
(274, 21, 'AZU'),
(275, 21, 'BERLINGO'),
(276, 21, 'BERLINGO II'),
(277, 21, 'BERLINGO III'),
(278, 21, 'BX'),
(279, 21, 'C-CROSSER'),
(280, 21, 'C-ELYSEE'),
(281, 21, 'C-ZERO'),
(282, 21, 'C1'),
(283, 21, 'C15'),
(284, 21, 'C2'),
(285, 21, 'C25'),
(286, 21, 'C25 COMBI'),
(287, 21, 'C3'),
(288, 21, 'C3 AIRCROSS'),
(289, 21, 'C3 II'),
(290, 21, 'C3 III'),
(291, 21, 'C3 PICASSO'),
(292, 21, 'C3 PLURIEL'),
(293, 21, 'C35'),
(294, 21, 'C4'),
(295, 21, 'C4 AIRCROSS'),
(296, 21, 'C4 CACTUS'),
(297, 21, 'C4 II'),
(298, 21, 'C4 III'),
(299, 21, 'C4 PICASSO'),
(300, 21, 'C4 PICASSO II'),
(301, 21, 'C4 SPACETOURER'),
(302, 21, 'C4 X'),
(303, 21, 'C5'),
(304, 21, 'C5 AIRCROSS'),
(305, 21, 'C5 II'),
(306, 21, 'C5 II TOURER'),
(307, 21, 'C5 X'),
(308, 21, 'C6'),
(309, 21, 'C8'),
(310, 21, 'CX'),
(311, 21, 'CX SERIE2'),
(312, 21, 'D'),
(313, 21, 'DANGEL C15'),
(314, 21, 'DANGEL C25'),
(315, 21, 'DS'),
(316, 21, 'DS3'),
(317, 21, 'DS4'),
(318, 21, 'DS5'),
(319, 21, 'DYANE'),
(320, 21, 'EVASION'),
(321, 21, 'GS'),
(322, 21, 'GSA'),
(323, 21, 'HY'),
(324, 21, '\"ID\"'),
(325, 21, 'JUMPER'),
(326, 21, 'JUMPY'),
(327, 21, 'KATAR'),
(328, 21, 'LN'),
(329, 21, 'LNA'),
(330, 21, 'MEHARI'),
(331, 21, 'NEMO'),
(332, 21, 'SAXO'),
(333, 21, 'SM'),
(334, 21, 'SPACETOURER'),
(335, 21, 'TANGARA'),
(336, 21, 'TRACTION'),
(337, 21, 'VISA'),
(338, 21, 'XANTIA'),
(339, 21, 'XM'),
(340, 21, 'XSARA'),
(341, 21, 'XSARA PICASSO'),
(342, 21, 'ZX'),
(343, 22, 'C-ZEN'),
(344, 23, 'ATECA'),
(345, 23, 'BORN'),
(346, 23, 'FORMENTOR'),
(347, 23, 'LEON'),
(348, 24, 'DOKKER'),
(349, 24, 'DUSTER'),
(350, 24, 'JOGGER'),
(351, 24, 'LODGY'),
(352, 24, 'LOGAN'),
(353, 24, 'SANDERO'),
(354, 24, 'SANDERO III'),
(355, 24, 'SPRING'),
(356, 25, 'ESPERO'),
(357, 25, 'EVANDA'),
(358, 25, 'KALOS'),
(359, 25, 'KORANDO'),
(360, 25, 'LACETTI'),
(361, 25, 'LANOS'),
(362, 25, 'LEGANZA'),
(363, 25, 'MATIZ'),
(364, 25, 'MUSSO'),
(365, 25, 'NEXIA'),
(366, 25, 'NUBIRA'),
(367, 25, 'REXTON'),
(368, 25, 'REZZO'),
(369, 26, '33'),
(370, 26, '400'),
(371, 26, '44'),
(372, 26, '46'),
(373, 26, '55'),
(374, 26, '66'),
(375, 26, 'VA400'),
(376, 26, 'VH400'),
(377, 27, 'APPLAUSE'),
(378, 27, 'CHARADE'),
(379, 27, 'COPEN'),
(380, 27, 'CUORE'),
(381, 27, 'DOMINO'),
(382, 27, 'FEROZA'),
(383, 27, 'GRAN MOVE'),
(384, 27, 'HIJET'),
(385, 27, 'MATERIA'),
(386, 27, 'MOVE'),
(387, 27, 'ROCKY'),
(388, 27, 'SIRION'),
(389, 27, 'TERIOS'),
(390, 27, 'TREVIS'),
(391, 27, 'YRV'),
(392, 28, 'DAIMLER'),
(393, 29, '100'),
(394, 29, '120'),
(395, 29, '1600'),
(396, 29, '180'),
(397, 29, '200'),
(398, 29, '220'),
(399, 29, '260'),
(400, 29, '280'),
(401, 29, 'BLUEBIRD'),
(402, 29, 'CEDRIC'),
(403, 29, 'CHERRY'),
(404, 29, 'KING-CAB'),
(405, 29, 'LAUREL'),
(406, 29, 'PATROL'),
(407, 29, 'PICK-UP'),
(408, 29, 'SILVIA'),
(409, 29, 'STANZA'),
(410, 29, 'SUNNY'),
(411, 29, 'VIOLET'),
(412, 30, 'AVENGER'),
(413, 30, 'CALIBER'),
(414, 30, 'JOURNEY'),
(415, 30, 'NITRO'),
(416, 31, 'DS3'),
(417, 31, 'DS3 CROSSBACK'),
(418, 31, 'DS4'),
(419, 31, 'DS4 II'),
(420, 31, 'DS5'),
(421, 31, 'DS7'),
(422, 31, 'DS7 CROSSBACK'),
(423, 31, 'DS9'),
(424, 32, 'F275'),
(425, 32, 'F350'),
(426, 32, 'JX20'),
(427, 32, 'JX28'),
(428, 32, 'PATROL'),
(429, 32, 'TRADE'),
(430, 32, 'VANETTE'),
(431, 33, 'ROMA'),
(432, 34, '124'),
(433, 34, '124 SPIDER'),
(434, 34, '126'),
(435, 34, '127'),
(436, 34, '128'),
(437, 34, '130'),
(438, 34, '131'),
(439, 34, '132'),
(440, 34, '133'),
(441, 34, '238'),
(442, 34, '4X4 CROSS'),
(443, 34, '500'),
(444, 34, '500 III'),
(445, 34, '500L'),
(446, 34, '500X'),
(447, 34, '600'),
(448, 34, '850'),
(449, 34, '900'),
(450, 34, 'ARGENTA'),
(451, 34, 'BARCHETTA'),
(452, 34, 'BRAVA'),
(453, 34, 'BRAVO'),
(454, 34, 'BRAVO II'),
(455, 34, 'CINQUECENTO'),
(456, 34, 'COUPE'),
(457, 34, 'CROMA'),
(458, 34, 'DOBLO'),
(459, 34, 'DOBLO III'),
(460, 34, 'DUCATO'),
(461, 34, 'FIORINO'),
(462, 34, 'FIORINO QUBO'),
(463, 34, 'FREEMONT'),
(464, 34, 'FULLBACK'),
(465, 34, 'GRANDE PUNTO'),
(466, 34, 'IDEA'),
(467, 34, 'MAREA'),
(468, 34, 'MULTIPLA'),
(469, 34, 'PALIO'),
(470, 34, 'PANDA'),
(471, 34, 'PININFARINA'),
(472, 34, 'PUNTO'),
(473, 34, 'PUNTO EVO'),
(474, 34, 'REGATA'),
(475, 34, 'RITMO'),
(476, 34, 'SCUDO'),
(477, 34, 'SCUDO III'),
(478, 34, 'SEDICI'),
(479, 34, 'SEICENTO'),
(480, 34, 'STILO'),
(481, 34, 'STRADA'),
(482, 34, 'TALENTO'),
(483, 34, 'TEMPRA'),
(484, 34, 'TIPO'),
(485, 34, 'ULYSSE'),
(486, 34, 'ULYSSE III'),
(487, 34, 'UNO'),
(488, 34, 'X1/9'),
(489, 35, 'KARMA'),
(490, 36, 'A0406'),
(491, 36, 'A0407'),
(492, 36, 'A0408'),
(493, 36, 'A0409'),
(494, 36, 'A0410'),
(495, 36, 'AEROSTAR'),
(496, 36, 'ANGLIA'),
(497, 36, 'B-MAX'),
(498, 36, 'CAPRI'),
(499, 36, 'CONSUL'),
(500, 36, 'CORTINA'),
(501, 36, 'COUGAR'),
(502, 36, 'COURRIER'),
(503, 36, 'ECOSPORT'),
(504, 36, 'EDGE'),
(505, 36, 'ESCORT'),
(506, 36, 'EXPLORER'),
(507, 36, 'FIESTA'),
(508, 36, 'FOCUS'),
(509, 36, 'FOCUS C-MAX'),
(510, 36, 'FOCUS IV'),
(511, 36, 'FUSION'),
(512, 36, 'GALAXY'),
(513, 36, 'GRANADA'),
(514, 36, 'KA'),
(515, 36, 'KA+'),
(516, 36, 'KUGA'),
(517, 36, 'KUGA III'),
(518, 36, 'MAVERICK'),
(519, 36, 'MONDEO'),
(520, 36, 'MONDEO*'),
(521, 36, 'MUSTANG'),
(522, 36, 'MUSTANG MACH-E'),
(523, 36, 'ORION'),
(524, 36, 'P 100'),
(525, 36, 'PROBE'),
(526, 36, 'PUMA'),
(527, 36, 'PUMA II'),
(528, 36, 'RANGER'),
(529, 36, 'RANGER IV'),
(530, 36, 'S-MAX'),
(531, 36, 'SCORPIO'),
(532, 36, 'SIERRA'),
(533, 36, 'TAUNUS'),
(534, 36, 'TOURNEO'),
(535, 36, 'TOURNEO CONNECT'),
(536, 36, 'TOURNEO CONNECT III'),
(537, 36, 'TOURNEO COURIER'),
(538, 36, 'TOURNEO CUSTOM'),
(539, 36, 'TRANSIT'),
(540, 36, 'TRANSIT CONNECT'),
(541, 36, 'TRANSIT COURIER'),
(542, 36, 'TRANSIT CUSTOM'),
(543, 36, 'TRANSIT VI'),
(544, 37, '125'),
(545, 37, '125P'),
(546, 37, '1500'),
(547, 37, 'ATOU'),
(548, 37, 'CARO'),
(549, 37, 'LINDA'),
(550, 37, 'POLONEZ'),
(551, 37, 'TRUCK'),
(552, 38, 'GA'),
(553, 38, 'WAY'),
(554, 39, 'MIDI'),
(555, 39, 'RASCAL'),
(556, 40, 'DALLAS'),
(557, 41, 'ACCORD'),
(558, 41, 'ACTY'),
(559, 41, 'CIVIC'),
(560, 41, 'CIVIC XI'),
(561, 41, 'CONCERTO'),
(562, 41, 'CR-Z'),
(563, 41, 'CRV'),
(564, 41, 'CRV V'),
(565, 41, 'CRX'),
(566, 41, 'FR-V'),
(567, 41, 'HONDA E'),
(568, 41, 'HR-V'),
(569, 41, 'HR-V III'),
(570, 41, 'INSIGHT'),
(571, 41, 'INTEGRA'),
(572, 41, 'JAZZ'),
(573, 41, 'JAZZ IV'),
(574, 41, 'LEGEND'),
(575, 41, 'LOGO'),
(576, 41, 'N360'),
(577, 41, 'NSX'),
(578, 41, 'PRELUDE'),
(579, 41, 'QUINTET'),
(580, 41, 'S2000'),
(581, 41, 'SHUTTLE'),
(582, 41, 'STREAM'),
(583, 42, 'ACCENT'),
(584, 42, 'ATOS'),
(585, 42, 'AZERA'),
(586, 42, 'BAYON'),
(587, 42, 'COUPE'),
(588, 42, 'ELANTRA'),
(589, 42, 'GALLOPER'),
(590, 42, 'GENESIS'),
(591, 42, 'GETZ'),
(592, 42, 'H-1'),
(593, 42, 'H100'),
(594, 42, 'I10'),
(595, 42, 'I10 III'),
(596, 42, 'I20'),
(597, 42, 'I20 III'),
(598, 42, 'I30'),
(599, 42, 'I40'),
(600, 42, 'IONIQ'),
(601, 42, 'IONIQ 5'),
(602, 42, 'IX20'),
(603, 42, 'IX35'),
(604, 42, 'IX55'),
(605, 42, 'KONA'),
(606, 42, 'LANTRA'),
(607, 42, 'MATRIX'),
(608, 42, 'NEXO'),
(609, 42, 'PONY'),
(610, 42, 'SANTA FE'),
(611, 42, 'SATELLITE'),
(612, 42, 'SCOUPE'),
(613, 42, 'SONATA'),
(614, 42, 'TERRACAN'),
(615, 42, 'TRAJET'),
(616, 42, 'TUCSON'),
(617, 42, 'TUCSON IV'),
(618, 42, 'VELOSTER'),
(619, 42, 'XG'),
(620, 43, 'EX'),
(621, 43, 'FX'),
(622, 43, 'G'),
(623, 43, 'M'),
(624, 43, 'Q30'),
(625, 43, 'Q50'),
(626, 43, 'Q60'),
(627, 43, 'Q70'),
(628, 43, 'QX30'),
(629, 43, 'QX50'),
(630, 43, 'QX70'),
(631, 44, '1000'),
(632, 44, '1100'),
(633, 44, '2200'),
(634, 44, '500'),
(635, 44, '650'),
(636, 44, '90'),
(637, 44, '990'),
(638, 44, 'DE TOMASO'),
(639, 44, 'MINI'),
(640, 44, 'MINIMATIC'),
(641, 45, 'D-MAX'),
(642, 45, 'D-MAX III'),
(643, 45, 'SERIE N'),
(644, 45, 'TROOPER'),
(645, 46, 'DAILY'),
(646, 46, 'MASSIF'),
(647, 47, '420'),
(648, 47, 'E'),
(649, 47, 'E-PACE'),
(650, 47, 'F-PACE'),
(651, 47, 'F-TYPE'),
(652, 47, 'I-PACE'),
(653, 47, 'S-TYPE'),
(654, 47, 'SOVEREIGN'),
(655, 47, 'V12'),
(656, 47, 'X-TYPE'),
(657, 47, 'XE'),
(658, 47, 'XF'),
(659, 47, 'XJ'),
(660, 47, 'XJ6'),
(661, 47, 'XJ8'),
(662, 47, 'XJR'),
(663, 47, 'XJS'),
(664, 47, 'XJSC'),
(665, 47, 'XK'),
(666, 47, 'XK8'),
(667, 48, 'CHEROKEE'),
(668, 48, 'COMMANDER'),
(669, 48, 'COMPASS'),
(670, 48, 'GLADIATOR'),
(671, 48, 'GRAND CHEROKEE'),
(672, 48, 'GRAND CHEROKEE V'),
(673, 48, 'PATRIOT'),
(674, 48, 'RENEGADE'),
(675, 48, 'WRANGLER'),
(676, 48, 'WRANGLER IV'),
(677, 49, 'BESTA'),
(678, 49, 'CARENS'),
(679, 49, 'CARNIVAL'),
(680, 49, 'CEED'),
(681, 49, 'CEED III'),
(682, 49, 'CERATO'),
(683, 49, 'CLARUS'),
(684, 49, 'E-SOUL'),
(685, 49, 'EV6'),
(686, 49, 'MAGENTIS'),
(687, 49, 'NIRO'),
(688, 49, 'NIRO II'),
(689, 49, 'OPIRUS'),
(690, 49, 'OPTIMA'),
(691, 49, 'PICANTO'),
(692, 49, 'PREGIO'),
(693, 49, 'PRIDE'),
(694, 49, 'RIO'),
(695, 49, 'SEPHIA'),
(696, 49, 'SHUMA'),
(697, 49, 'SORENTO'),
(698, 49, 'SORENTO IV'),
(699, 49, 'SOUL'),
(700, 49, 'SPORTAGE'),
(701, 49, 'SPORTAGE V'),
(702, 49, 'STINGER'),
(703, 49, 'STONIC'),
(704, 49, 'VENGA'),
(705, 50, '110'),
(706, 50, '111'),
(707, 50, '1118'),
(708, 50, '112'),
(709, 50, '1200'),
(710, 50, '1300'),
(711, 50, '1500'),
(712, 50, '1600'),
(713, 50, 'GRANTA'),
(714, 50, 'KALINA'),
(715, 50, 'KALINKA'),
(716, 50, 'NIVA'),
(717, 50, 'PRIORA'),
(718, 50, 'SAGONA'),
(719, 50, 'SAMARA'),
(720, 51, 'BETA'),
(721, 51, 'DEDRA'),
(722, 51, 'DELTA'),
(723, 51, 'FLAMINIA'),
(724, 51, 'FLAVIA'),
(725, 51, 'FULVIA'),
(726, 51, 'GAMMA'),
(727, 51, 'KAPPA'),
(728, 51, 'LYBRA'),
(729, 51, 'MUSA'),
(730, 51, 'PHEDRA'),
(731, 51, 'PRISMA'),
(732, 51, 'THEMA'),
(733, 51, 'THESIS'),
(734, 51, 'TREVI'),
(735, 51, 'VOYAGER'),
(736, 51, 'Y'),
(737, 51, 'Y10'),
(738, 51, 'YPSILON'),
(739, 51, 'ZETA'),
(740, 52, '110'),
(741, 52, '88'),
(742, 52, '90'),
(743, 52, 'DEFENDER'),
(744, 52, 'DEFENDER II'),
(745, 52, 'DISCOVERY'),
(746, 52, 'DISCOVERY SPORT'),
(747, 52, 'EVOQUE'),
(748, 52, 'EVOQUE II'),
(749, 52, 'FREELANDER'),
(750, 52, 'RANGE 4X4'),
(751, 52, 'RANGE ROVER SPORT'),
(752, 52, 'RANGE ROVER SPORT III'),
(753, 52, 'RANGE ROVER V'),
(754, 52, 'VELAR'),
(755, 53, 'CONVOY'),
(756, 54, 'CT'),
(757, 54, 'ES'),
(758, 54, 'GS'),
(759, 54, 'IS'),
(760, 54, 'IS SPORTCROSS'),
(761, 54, 'LC'),
(762, 54, 'LFA'),
(763, 54, 'LS'),
(764, 54, 'LS II'),
(765, 54, 'NX'),
(766, 54, 'NX II'),
(767, 54, 'RC'),
(768, 54, 'RX'),
(769, 54, 'SC'),
(770, 54, 'UX'),
(771, 55, 'ELAN'),
(772, 55, 'ELISE'),
(773, 55, 'ESPRIT'),
(774, 55, 'EUROPA'),
(775, 55, 'EXIGE'),
(776, 55, 'OMEGA'),
(777, 56, '1'),
(778, 57, 'BOLERO'),
(779, 57, 'CJ'),
(780, 57, 'GOA'),
(781, 58, 'TGE'),
(782, 59, '800'),
(783, 60, 'COUPE'),
(784, 60, 'GHIBLI'),
(785, 60, 'GRANCABRIO'),
(786, 60, 'GRANSPORT'),
(787, 60, 'GRANTURISMO'),
(788, 60, 'MC20'),
(789, 60, 'QUATTROPORTE'),
(790, 61, 'BAGHEERA'),
(791, 61, 'M530'),
(792, 61, 'MURENA'),
(793, 61, 'RANCHO'),
(794, 62, '1000'),
(795, 62, '1200'),
(796, 62, '121'),
(797, 62, '1800'),
(798, 62, '323'),
(799, 62, '616'),
(800, 62, '626'),
(801, 62, '818'),
(802, 62, '929'),
(803, 62, 'BONGO'),
(804, 62, 'BT50'),
(805, 62, 'CX-3'),
(806, 62, 'CX-30'),
(807, 62, 'CX-5'),
(808, 62, 'CX-60'),
(809, 62, 'CX-7'),
(810, 62, 'DEMIO'),
(811, 62, 'E2200'),
(812, 62, 'MAZDA2'),
(813, 62, 'MAZDA2 IV'),
(814, 62, 'MAZDA3'),
(815, 62, 'MAZDA3 IV'),
(816, 62, 'MAZDA5'),
(817, 62, 'MAZDA6'),
(818, 62, 'MINIBUS'),
(819, 62, 'MPV'),
(820, 62, 'MX-30'),
(821, 62, 'MX3'),
(822, 62, 'MX5'),
(823, 62, 'MX6'),
(824, 62, 'PICK-UP'),
(825, 62, 'PREMACY'),
(826, 62, 'R100'),
(827, 62, 'RX2'),
(828, 62, 'RX3'),
(829, 62, 'RX5'),
(830, 62, 'RX7'),
(831, 62, 'RX8'),
(832, 62, 'T2500'),
(833, 62, 'TRIBUTE'),
(834, 62, 'XEDOS 6'),
(835, 62, 'XEDOS 9'),
(836, 63, 'SMART'),
(837, 64, 'CABRIOLET'),
(838, 64, 'CLUB'),
(839, 64, 'CONCEPT'),
(840, 64, 'FOURGON'),
(841, 64, 'RANCH'),
(842, 65, '190'),
(843, 65, '200'),
(844, 65, '206'),
(845, 65, '207'),
(846, 65, '208'),
(847, 65, '209'),
(848, 65, '210'),
(849, 65, '220'),
(850, 65, '230'),
(851, 65, '240'),
(852, 65, '250'),
(853, 65, '260'),
(854, 65, '280'),
(855, 65, '300'),
(856, 65, '306'),
(857, 65, '307'),
(858, 65, '308'),
(859, 65, '309'),
(860, 65, '310'),
(861, 65, '320'),
(862, 65, '350'),
(863, 65, '400'),
(864, 65, '406'),
(865, 65, '407'),
(866, 65, '408'),
(867, 65, '409'),
(868, 65, '410'),
(869, 65, '420'),
(870, 65, '450'),
(871, 65, '500'),
(872, 65, '507'),
(873, 65, '508'),
(874, 65, '560'),
(875, 65, '600'),
(876, 65, '609'),
(877, 65, '611'),
(878, 65, 'CITAN'),
(879, 65, 'CITAN II'),
(880, 65, 'CLASSE A'),
(881, 65, 'CLASSE A IV'),
(882, 65, 'CLASSE B'),
(883, 65, 'CLASSE B III'),
(884, 65, 'CLASSE C'),
(885, 65, 'CLASSE C III'),
(886, 65, 'CLASSE C IV'),
(887, 65, 'CLASSE C V'),
(888, 65, 'CLASSE CL'),
(889, 65, 'CLASSE CLA'),
(890, 65, 'CLASSE CLA II'),
(891, 65, 'CLASSE CLC'),
(892, 65, 'CLASSE CLK'),
(893, 65, 'CLASSE CLS'),
(894, 65, 'CLASSE E'),
(895, 65, 'CLASSE E IV'),
(896, 65, 'CLASSE E V'),
(897, 65, 'CLASSE EQA'),
(898, 65, 'CLASSE EQB'),
(899, 65, 'CLASSE EQC'),
(900, 65, 'CLASSE EQE'),
(901, 65, 'CLASSE EQS'),
(902, 65, 'CLASSE EQV'),
(903, 65, 'CLASSE G'),
(904, 65, 'CLASSE G II'),
(905, 65, 'CLASSE GL'),
(906, 65, 'CLASSE GLA'),
(907, 65, 'CLASSE GLA II'),
(908, 65, 'CLASSE GLB'),
(909, 65, 'CLASSE GLC'),
(910, 65, 'CLASSE GLE'),
(911, 65, 'CLASSE GLE II'),
(912, 65, 'CLASSE GLK'),
(913, 65, 'CLASSE GLS'),
(914, 65, 'CLASSE GLS II'),
(915, 65, 'CLASSE M'),
(916, 65, 'CLASSE R'),
(917, 65, 'CLASSE S'),
(918, 65, 'CLASSE S V'),
(919, 65, 'CLASSE SL'),
(920, 65, 'CLASSE SLC'),
(921, 65, 'CLASSE SLK'),
(922, 65, 'CLASSE SLS'),
(923, 65, 'CLASSE V'),
(924, 65, 'CLASSE X'),
(925, 65, 'GT'),
(926, 65, 'MB100'),
(927, 65, 'SPRINTER'),
(928, 65, 'VANEO'),
(929, 65, 'VARIO PLUS'),
(930, 65, 'VIANO'),
(931, 65, 'VITO'),
(932, 66, 'EHS'),
(933, 66, 'F'),
(934, 66, 'MARVEL R'),
(935, 66, 'MG4'),
(936, 66, 'MG5'),
(937, 66, 'TF'),
(938, 66, 'ZR'),
(939, 66, 'ZS'),
(940, 66, 'ZS II'),
(941, 66, 'ZT'),
(942, 67, 'ELECTRIC'),
(943, 68, 'COUNTRYMAN'),
(944, 68, 'MINI'),
(945, 68, 'MINI CLUBMAN'),
(946, 68, 'PACEMAN'),
(947, 69, '3000'),
(948, 69, 'ASX'),
(949, 69, 'CANTER'),
(950, 69, 'CARISMA'),
(951, 69, 'COLT'),
(952, 69, 'ECLIPSE CROSS'),
(953, 69, 'ESTATE'),
(954, 69, 'GALANT'),
(955, 69, 'GRANDIS'),
(956, 69, 'I-MIEV'),
(957, 69, 'L200'),
(958, 69, 'LANCER'),
(959, 69, 'MONTERO'),
(960, 69, 'OUTLANDER'),
(961, 69, 'PAJERO'),
(962, 69, 'SAPPORO'),
(963, 69, 'SPACE RUNNER'),
(964, 69, 'SPACE STAR'),
(965, 69, 'SPACE STAR II'),
(966, 69, 'SPACE WAGON'),
(967, 70, 'PS160'),
(968, 71, '100 NX'),
(969, 71, '200 SX'),
(970, 71, '300 ZX'),
(971, 71, '350 Z'),
(972, 71, '370 Z'),
(973, 71, 'ALMERA'),
(974, 71, 'ALMERA TINO'),
(975, 71, 'ARIYA'),
(976, 71, 'ATLEON'),
(977, 71, 'BLUEBIRD'),
(978, 71, 'CABSTAR'),
(979, 71, 'CEDRIC'),
(980, 71, 'CUBE'),
(981, 71, 'ECO T100'),
(982, 71, 'GT-R'),
(983, 71, 'INTERSTAR'),
(984, 71, 'INTERSTAR II'),
(985, 71, 'JUKE'),
(986, 71, 'JUKE II'),
(987, 71, 'KING-CAB'),
(988, 71, 'KUBISTAR'),
(989, 71, 'L35'),
(990, 71, 'LEAF'),
(991, 71, 'MAXIMA'),
(992, 71, 'MAXIMA QX'),
(993, 71, 'MICRA'),
(994, 71, 'MURANO'),
(995, 71, 'NAVARA'),
(996, 71, 'NOTE'),
(997, 71, 'NP300'),
(998, 71, 'NV200'),
(999, 71, 'NV250'),
(1000, 71, 'NV300'),
(1001, 71, 'NV400'),
(1002, 71, 'PATHFINDER'),
(1003, 71, 'PATROL'),
(1004, 71, 'PICK-UP'),
(1005, 71, 'PIXO'),
(1006, 71, 'PRAIRIE'),
(1007, 71, 'PRIMASTAR'),
(1008, 71, 'PRIMASTAR II'),
(1009, 71, 'PRIMERA'),
(1010, 71, 'PULSAR'),
(1011, 71, 'QASHQAI'),
(1012, 71, 'QASHQAI III'),
(1013, 71, 'SERENA'),
(1014, 71, 'SILVIA'),
(1015, 71, 'STANZA'),
(1016, 71, 'SUNNY'),
(1017, 71, 'TERRANO'),
(1018, 71, 'TERRANO II'),
(1019, 71, 'TINO'),
(1020, 71, 'TOWNSTAR'),
(1021, 71, 'TRADE'),
(1022, 71, 'URVAN'),
(1023, 71, 'VANETTE'),
(1024, 71, 'X-TRAIL'),
(1025, 71, 'X-TRAIL IV'),
(1026, 72, 'ADAM'),
(1027, 72, 'ADMIRAL'),
(1028, 72, 'AGILA'),
(1029, 72, 'AMPERA'),
(1030, 72, 'ANTARA'),
(1031, 72, 'ASCONA'),
(1032, 72, 'ASTRA'),
(1033, 72, 'ASTRA VI'),
(1034, 72, 'CABRIO'),
(1035, 72, 'CALIBRA'),
(1036, 72, 'CAMPO'),
(1037, 72, 'CASCADA'),
(1038, 72, 'CITY'),
(1039, 72, 'COMBO'),
(1040, 72, 'COMBO III'),
(1041, 72, 'COMBO LIFE'),
(1042, 72, 'COMMODORE'),
(1043, 72, 'CORSA'),
(1044, 72, 'CORSA VI'),
(1045, 72, 'CORSAVAN'),
(1046, 72, 'CROSSLAND'),
(1047, 72, 'CROSSLAND X'),
(1048, 72, 'DIPLOMAT'),
(1049, 72, 'FRONTERA'),
(1050, 72, 'GRANDLAND'),
(1051, 72, 'GRANDLAND X'),
(1052, 72, 'GT'),
(1053, 72, 'INSIGNIA'),
(1054, 72, 'KADETT'),
(1055, 72, 'KAPITAN'),
(1056, 72, 'KARL'),
(1057, 72, 'MANTA'),
(1058, 72, 'MERIVA'),
(1059, 72, 'MOKKA'),
(1060, 72, 'MOKKA II'),
(1061, 72, 'MONTEREY'),
(1062, 72, 'MONZA'),
(1063, 72, 'MOVANO'),
(1064, 72, 'MOVANO III'),
(1065, 72, 'OMEGA'),
(1066, 72, 'REKORD'),
(1067, 72, 'SENATOR'),
(1068, 72, 'SIGNUM'),
(1069, 72, 'SINTRA'),
(1070, 72, 'SPEEDSTER'),
(1071, 72, 'TIGRA'),
(1072, 72, 'VECTRA'),
(1073, 72, 'VIVARO'),
(1074, 72, 'VIVARO III'),
(1075, 72, 'ZAFIRA'),
(1076, 72, 'ZAFIRA LIFE'),
(1077, 73, '24'),
(1078, 73, 'DYNA'),
(1079, 73, 'PL'),
(1080, 74, '1007'),
(1081, 74, '104'),
(1082, 74, '106'),
(1083, 74, '107'),
(1084, 74, '108'),
(1085, 74, '2008'),
(1086, 74, '2008 II'),
(1087, 74, '203'),
(1088, 74, '204'),
(1089, 74, '205'),
(1090, 74, '206'),
(1091, 74, '207'),
(1092, 74, '208'),
(1093, 74, '208 II'),
(1094, 74, '3008'),
(1095, 74, '304'),
(1096, 74, '305'),
(1097, 74, '306'),
(1098, 74, '307'),
(1099, 74, '308'),
(1100, 74, '308 III'),
(1101, 74, '309'),
(1102, 74, '4007'),
(1103, 74, '4008'),
(1104, 74, '403'),
(1105, 74, '404'),
(1106, 74, '405'),
(1107, 74, '406'),
(1108, 74, '407'),
(1109, 74, '408'),
(1110, 74, '5008'),
(1111, 74, '504'),
(1112, 74, '505'),
(1113, 74, '508'),
(1114, 74, '508 II'),
(1115, 74, '604'),
(1116, 74, '605'),
(1117, 74, '607'),
(1118, 74, '806'),
(1119, 74, '807'),
(1120, 74, 'BIPPER'),
(1121, 74, 'BOXER'),
(1122, 74, 'BOXER*'),
(1123, 74, 'DANGEL 504'),
(1124, 74, 'DANGEL 505'),
(1125, 74, 'DANGEL J5'),
(1126, 74, 'EXPERT'),
(1127, 74, 'ION'),
(1128, 74, 'J5'),
(1129, 74, 'J5 COMBI'),
(1130, 74, 'J7'),
(1131, 74, 'J9'),
(1132, 74, 'P4'),
(1133, 74, 'PARTNER'),
(1134, 74, 'PARTNER II'),
(1135, 74, 'PARTNER III'),
(1136, 74, 'RCZ'),
(1137, 74, 'RIFTER'),
(1138, 74, 'TRAVELLER'),
(1139, 75, 'PORTER'),
(1140, 76, 'FIREBIRD'),
(1141, 76, 'TRANS SPORT'),
(1142, 77, '718 BOXSTER'),
(1143, 77, '718 CAYMAN'),
(1144, 77, '911'),
(1145, 77, '911 VIII'),
(1146, 77, '912'),
(1147, 77, '914'),
(1148, 77, '918'),
(1149, 77, '924'),
(1150, 77, '928'),
(1151, 77, '930'),
(1152, 77, '944'),
(1153, 77, '968'),
(1154, 77, 'BOXSTER'),
(1155, 77, 'CAYENNE'),
(1156, 77, 'CAYMAN'),
(1157, 77, 'MACAN'),
(1158, 77, 'MACAN II'),
(1159, 77, 'PANAMERA'),
(1160, 77, 'TAYCAN'),
(1161, 78, '313'),
(1162, 78, '315'),
(1163, 78, '413'),
(1164, 78, '415'),
(1165, 78, '416'),
(1166, 78, '418'),
(1167, 78, '420'),
(1168, 79, '4CV'),
(1169, 79, 'ALASKAN'),
(1170, 79, 'ARKANA'),
(1171, 79, 'AUSTRAL'),
(1172, 79, 'AVANTIME'),
(1173, 79, 'B110'),
(1174, 79, 'B120'),
(1175, 79, 'B70'),
(1176, 79, 'B80'),
(1177, 79, 'B90'),
(1178, 79, 'CAPTUR'),
(1179, 79, 'CAPTUR II'),
(1180, 79, 'CARAVELLE'),
(1181, 79, 'CHEROKEE'),
(1182, 79, 'CLIO'),
(1183, 79, 'CLIO III'),
(1184, 79, 'CLIO III ESTATE'),
(1185, 79, 'CLIO IV'),
(1186, 79, 'CLIO IV ESTATE'),
(1187, 79, 'CLIO V'),
(1188, 79, 'DAUPHINE'),
(1189, 79, 'DAUPHINOIS'),
(1190, 79, 'ESPACE'),
(1191, 79, 'ESPACE IV'),
(1192, 79, 'ESPACE V'),
(1193, 79, 'ESTAFETTE'),
(1194, 79, 'EXPRESS'),
(1195, 79, 'EXPRESS II'),
(1196, 79, 'FLORIDE'),
(1197, 79, 'FLUENCE'),
(1198, 79, 'FREGATE'),
(1199, 79, 'FUEGO'),
(1200, 79, 'GRAND ESPACE'),
(1201, 79, 'GRAND ESPACE IV'),
(1202, 79, 'GRAND SCENIC'),
(1203, 79, 'JEEP CJ7'),
(1204, 79, 'JUVAQUATRE'),
(1205, 79, 'KADJAR'),
(1206, 79, 'KANGOO'),
(1207, 79, 'KANGOO EXPRESS'),
(1208, 79, 'KANGOO EXPRESS II'),
(1209, 79, 'KANGOO II'),
(1210, 79, 'KANGOO III'),
(1211, 79, 'KOLEOS'),
(1212, 79, 'LAGUNA'),
(1213, 79, 'LAGUNA II'),
(1214, 79, 'LAGUNA II ESTATE'),
(1215, 79, 'LAGUNA III'),
(1216, 79, 'LAGUNA III ESTATE'),
(1217, 79, 'LAGUNA NEVADA'),
(1218, 79, 'LATITUDE'),
(1219, 79, 'MASCOTT'),
(1220, 79, 'MASTER'),
(1221, 79, 'MASTER III'),
(1222, 79, 'MAXITY'),
(1223, 79, 'MEGANE'),
(1224, 79, 'MEGANE II'),
(1225, 79, 'MEGANE II ESTATE'),
(1226, 79, 'MEGANE III'),
(1227, 79, 'MEGANE III ESTATE'),
(1228, 79, 'MEGANE IV'),
(1229, 79, 'MEGANE V'),
(1230, 79, 'MESSENGER'),
(1231, 79, 'MODUS'),
(1232, 79, 'ONDINE'),
(1233, 79, 'PRAIRIE'),
(1234, 79, 'R10'),
(1235, 79, 'R11'),
(1236, 79, 'R12'),
(1237, 79, 'R14'),
(1238, 79, 'R15'),
(1239, 79, 'R16'),
(1240, 79, 'R17'),
(1241, 79, 'R18'),
(1242, 79, 'R19'),
(1243, 79, 'R20'),
(1244, 79, 'R21'),
(1245, 79, 'R21 NEVADA'),
(1246, 79, 'R25'),
(1247, 79, 'R30'),
(1248, 79, 'R4'),
(1249, 79, 'R5'),
(1250, 79, 'R6'),
(1251, 79, 'R8'),
(1252, 79, 'R9'),
(1253, 79, 'RODEO'),
(1254, 79, 'SAFRANE'),
(1255, 79, 'SAVANE'),
(1256, 79, 'SAVIEM'),
(1257, 79, 'SCENIC'),
(1258, 79, 'SCENIC II'),
(1259, 79, 'SCENIC III'),
(1260, 79, 'SCENIC IV'),
(1261, 79, 'SPIDER'),
(1262, 79, 'SUPERCINQ'),
(1263, 79, 'TALISMAN'),
(1264, 79, 'TRAFIC'),
(1265, 79, 'TRAFIC III'),
(1266, 79, 'TWINGO'),
(1267, 79, 'TWINGO II'),
(1268, 79, 'TWINGO III'),
(1269, 79, 'VEL SATIS'),
(1270, 79, 'WIND'),
(1271, 79, 'WRANGLER'),
(1272, 79, 'ZOE'),
(1273, 80, '111'),
(1274, 80, '114'),
(1275, 80, '115'),
(1276, 80, '200'),
(1277, 80, '2000'),
(1278, 80, '213'),
(1279, 80, '214'),
(1280, 80, '216'),
(1281, 80, '218'),
(1282, 80, '220'),
(1283, 80, '2200'),
(1284, 80, '2300'),
(1285, 80, '2400'),
(1286, 80, '25'),
(1287, 80, '2600'),
(1288, 80, '3500'),
(1289, 80, '414'),
(1290, 80, '416'),
(1291, 80, '418'),
(1292, 80, '420'),
(1293, 80, '45'),
(1294, 80, '618'),
(1295, 80, '620'),
(1296, 80, '623'),
(1297, 80, '75'),
(1298, 80, '820'),
(1299, 80, '825'),
(1300, 80, '827'),
(1301, 80, 'ESTATE'),
(1302, 80, 'FREIGHT'),
(1303, 80, 'STREETWISE'),
(1304, 81, '9-3'),
(1305, 81, '9-3 BERLINE DE SPORT'),
(1306, 81, '9-3 SPORT HATCH'),
(1307, 81, '9-3 X'),
(1308, 81, '9-5'),
(1309, 81, '9-5 ESTATE'),
(1310, 81, '900'),
(1311, 81, '9000'),
(1312, 82, 'S300'),
(1313, 82, 'S350'),
(1314, 82, 'S410'),
(1315, 82, 'S413'),
(1316, 82, 'SAMURAI'),
(1317, 82, 'VITARA'),
(1318, 83, 'ALHAMBRA'),
(1319, 83, 'ALTEA'),
(1320, 83, 'ALTEA  XL'),
(1321, 83, 'ARONA'),
(1322, 83, 'AROSA'),
(1323, 83, 'ATECA'),
(1324, 83, 'CORDOBA'),
(1325, 83, 'EXEO'),
(1326, 83, 'FURA'),
(1327, 83, 'IBIZA'),
(1328, 83, 'IBIZA*'),
(1329, 83, 'INCA'),
(1330, 83, 'LEON'),
(1331, 83, 'LEON IV'),
(1332, 83, 'MALAGA'),
(1333, 83, 'MARBELLA'),
(1334, 83, 'MII'),
(1335, 83, 'RONDA'),
(1336, 83, 'TARRACO'),
(1337, 83, 'TERRA'),
(1338, 83, 'TOLEDO'),
(1339, 84, 'EC35'),
(1340, 84, 'SERES 3'),
(1341, 85, '1050'),
(1342, 85, '120'),
(1343, 85, '130'),
(1344, 85, 'CITIGO'),
(1345, 85, 'ENYAQ'),
(1346, 85, 'FABIA'),
(1347, 85, 'FABIA IV'),
(1348, 85, 'FAVORIT'),
(1349, 85, 'FELICIA'),
(1350, 85, 'KAMIQ'),
(1351, 85, 'KAROQ'),
(1352, 85, 'KODIAQ'),
(1353, 85, 'OCTAVIA'),
(1354, 85, 'OCTAVIA IV'),
(1355, 85, 'RAPID'),
(1356, 85, 'ROOMSTER'),
(1357, 85, 'SCALA'),
(1358, 85, 'SUPERB'),
(1359, 85, 'YETI'),
(1360, 86, 'CABRIO'),
(1361, 86, 'CITY-COUPE'),
(1362, 86, 'FORFOUR'),
(1363, 86, 'FORTWO'),
(1364, 86, 'FORTWO BUSINESS'),
(1365, 86, 'FORTWO CABRIO'),
(1366, 86, 'FORTWO COUPE'),
(1367, 86, 'ROADSTER'),
(1368, 86, 'ROADSTER-COUPE'),
(1369, 87, 'ACTYON'),
(1370, 87, 'FAMILY'),
(1371, 87, 'KORANDO'),
(1372, 87, 'KORANDO II'),
(1373, 87, 'KYRON'),
(1374, 87, 'MUSSO'),
(1375, 87, 'REXTON'),
(1376, 87, 'REXTON III'),
(1377, 87, 'RODIUS'),
(1378, 87, 'TIVOLI'),
(1379, 88, 'B9 TRIBECA'),
(1380, 88, 'BRZ'),
(1381, 88, 'E12'),
(1382, 88, 'FORESTER'),
(1383, 88, 'FORESTER V'),
(1384, 88, 'G3X JUSTY'),
(1385, 88, 'IMPREZA'),
(1386, 88, 'IMPREZA V'),
(1387, 88, 'JUSTY'),
(1388, 88, 'LEGACY'),
(1389, 88, 'LEVORG'),
(1390, 88, 'OUTBACK'),
(1391, 88, 'OUTBACK VI'),
(1392, 88, 'SVX'),
(1393, 88, 'TREZIA'),
(1394, 88, 'VIVIO'),
(1395, 88, 'XV'),
(1396, 88, 'XV II'),
(1397, 89, '1000'),
(1398, 89, '1250'),
(1399, 89, '1300'),
(1400, 89, '1500'),
(1401, 89, '1600'),
(1402, 89, '1725'),
(1403, 89, 'AVENGER'),
(1404, 89, 'LOTUS'),
(1405, 89, 'TI'),
(1406, 90, 'ACROSS'),
(1407, 90, 'ALTO'),
(1408, 90, 'BALENO'),
(1409, 90, 'CELERIO'),
(1410, 90, 'GRAND VITARA'),
(1411, 90, 'IGNIS'),
(1412, 90, 'JIMNY'),
(1413, 90, 'JIMNY II'),
(1414, 90, 'KIZASHI'),
(1415, 90, 'LIANA'),
(1416, 90, 'S-CROSS'),
(1417, 90, 'S-CROSS II'),
(1418, 90, 'SAMURAI'),
(1419, 90, 'SPLASH'),
(1420, 90, 'SUPERCARRY'),
(1421, 90, 'SWACE'),
(1422, 90, 'SWIFT'),
(1423, 90, 'SX4'),
(1424, 90, 'VITARA'),
(1425, 90, 'WAGON R+'),
(1426, 90, 'X90'),
(1427, 91, '1000'),
(1428, 91, '1005'),
(1429, 91, '1006'),
(1430, 91, '1100'),
(1431, 91, '1300'),
(1432, 91, '1301'),
(1433, 91, '1307'),
(1434, 91, '1308'),
(1435, 91, '1309'),
(1436, 91, '1500'),
(1437, 91, '1501'),
(1438, 91, '1510'),
(1439, 91, '160'),
(1440, 91, '1610'),
(1441, 91, '2L'),
(1442, 91, 'ARONDE'),
(1443, 91, 'HORIZON'),
(1444, 91, 'SAMBA'),
(1445, 91, 'SIM QUATRE'),
(1446, 91, 'SOLARA'),
(1447, 91, 'TAGORA'),
(1448, 92, 'TELCOLINE'),
(1449, 92, 'TELCOSPORT'),
(1450, 93, 'MODEL 3'),
(1451, 93, 'MODEL S'),
(1452, 93, 'MODEL X'),
(1453, 93, 'MODEL Y'),
(1454, 94, 'CITY'),
(1455, 95, 'AURIS'),
(1456, 95, 'AVENSIS'),
(1457, 95, 'AYGO'),
(1458, 95, 'AYGO X'),
(1459, 95, 'C-HR'),
(1460, 95, 'CAMRY'),
(1461, 95, 'CAMRY II'),
(1462, 95, 'CARINA'),
(1463, 95, 'CARINA E'),
(1464, 95, 'CARINA II'),
(1465, 95, 'CELICA'),
(1466, 95, 'COROLLA'),
(1467, 95, 'COROLLA VERSO'),
(1468, 95, 'COROLLA X'),
(1469, 95, 'CORONA'),
(1470, 95, 'CRESSIDA'),
(1471, 95, 'CROWN'),
(1472, 95, 'DYNA'),
(1473, 95, 'FUNCRUISER'),
(1474, 95, 'GR86'),
(1475, 95, 'GT86'),
(1476, 95, 'HI-ACE'),
(1477, 95, 'HI-LUX'),
(1478, 95, 'HIGHLANDER'),
(1479, 95, 'IQ'),
(1480, 95, 'LANDCRUISER'),
(1481, 95, 'LEXUS'),
(1482, 95, 'LITE ACE'),
(1483, 95, 'MIRAI'),
(1484, 95, 'MIRAI II'),
(1485, 95, 'MODELE F'),
(1486, 95, 'MR'),
(1487, 95, 'PASEO'),
(1488, 95, 'PICNIC'),
(1489, 95, 'PREVIA'),
(1490, 95, 'PRIUS'),
(1491, 95, 'PROACE'),
(1492, 95, 'PROACE CITY'),
(1493, 95, 'RAV4'),
(1494, 95, 'RAV4 III'),
(1495, 95, 'RAV4 IV'),
(1496, 95, 'RAV4 V'),
(1497, 95, 'RUNNER'),
(1498, 95, 'STARLET'),
(1499, 95, 'SUPRA'),
(1500, 95, 'SUPRA V'),
(1501, 95, 'TERCEL'),
(1502, 95, 'URBAN CRUISER'),
(1503, 95, 'VERSO'),
(1504, 95, 'VERSO-S'),
(1505, 95, 'YARIS'),
(1506, 95, 'YARIS CROSS'),
(1507, 95, 'YARIS II'),
(1508, 95, 'YARIS III'),
(1509, 95, 'YARIS IV'),
(1510, 96, '1300'),
(1511, 96, '2000'),
(1512, 96, '2500'),
(1513, 96, 'ACCLAIM'),
(1514, 96, 'DOLOMITE'),
(1515, 96, 'HERALD'),
(1516, 96, 'SPITFIRE'),
(1517, 96, 'STAG'),
(1518, 96, 'TOLEDO'),
(1519, 96, 'TR'),
(1520, 96, 'TR4'),
(1521, 96, 'TR6'),
(1522, 97, 'ALTER'),
(1523, 98, '1,6L'),
(1524, 98, '1600'),
(1525, 98, '181'),
(1526, 98, '183'),
(1527, 98, '411'),
(1528, 98, '412'),
(1529, 98, 'AMAROK'),
(1530, 98, 'ARTEON'),
(1531, 98, 'BORA'),
(1532, 98, 'CADDY'),
(1533, 98, 'CADDY V'),
(1534, 98, 'COCCINELLE'),
(1535, 98, 'CORRADO'),
(1536, 98, 'CRAFTER'),
(1537, 98, 'EOS'),
(1538, 98, 'FOX'),
(1539, 98, 'GOLF'),
(1540, 98, 'GOLF III'),
(1541, 98, 'GOLF IV'),
(1542, 98, 'GOLF PLUS'),
(1543, 98, 'GOLF SPORTSVAN'),
(1544, 98, 'GOLF V'),
(1545, 98, 'GOLF VI'),
(1546, 98, 'GOLF VII'),
(1547, 98, 'GOLF VIII'),
(1548, 98, 'ID.3'),
(1549, 98, 'ID.4'),
(1550, 98, 'ID.5'),
(1551, 98, 'ID.BUZZ'),
(1552, 98, 'JETTA'),
(1553, 98, 'JETTA II'),
(1554, 98, 'JETTA III'),
(1555, 98, 'K70'),
(1556, 98, 'LT28'),
(1557, 98, 'LT31'),
(1558, 98, 'LT32'),
(1559, 98, 'LT35'),
(1560, 98, 'LT40A'),
(1561, 98, 'LT46A'),
(1562, 98, 'LUPO'),
(1563, 98, 'MULTIVAN T7'),
(1564, 98, 'NEW BEETLE'),
(1565, 98, 'PASSAT'),
(1566, 98, 'PASSAT CC'),
(1567, 98, 'PASSAT SW'),
(1568, 98, 'PASSAT*'),
(1569, 98, 'PHAETON'),
(1570, 98, 'POLO'),
(1571, 98, 'POLO V'),
(1572, 98, 'POLO VI'),
(1573, 98, 'SANTANA'),
(1574, 98, 'SCIROCCO'),
(1575, 98, 'SHARAN'),
(1576, 98, 'T-CROSS'),
(1577, 98, 'T-ROC'),
(1578, 98, 'TAIGO'),
(1579, 98, 'TARO'),
(1580, 98, 'TIGUAN'),
(1581, 98, 'TOUAREG'),
(1582, 98, 'TOUAREG III'),
(1583, 98, 'TOURAN'),
(1584, 98, 'TRANSPORTER'),
(1585, 98, 'UP'),
(1586, 98, 'VENTO'),
(1587, 99, '122'),
(1588, 99, '142'),
(1589, 99, '144'),
(1590, 99, '164'),
(1591, 99, '1800'),
(1592, 99, '240'),
(1593, 99, '242'),
(1594, 99, '244'),
(1595, 99, '245'),
(1596, 99, '262'),
(1597, 99, '264'),
(1598, 99, '265'),
(1599, 99, '340'),
(1600, 99, '360'),
(1601, 99, '440'),
(1602, 99, '460'),
(1603, 99, '480'),
(1604, 99, '66'),
(1605, 99, '740'),
(1606, 99, '760'),
(1607, 99, '780'),
(1608, 99, '850'),
(1609, 99, '940'),
(1610, 99, '960'),
(1611, 99, 'C30'),
(1612, 99, 'C40'),
(1613, 99, 'C70'),
(1614, 99, 'CROSS COUNTRY'),
(1615, 99, 'S40'),
(1616, 99, 'S60'),
(1617, 99, 'S60 III'),
(1618, 99, 'S70'),
(1619, 99, 'S80'),
(1620, 99, 'S90'),
(1621, 99, 'V40'),
(1622, 99, 'V50'),
(1623, 99, 'V60'),
(1624, 99, 'V60 II'),
(1625, 99, 'V70'),
(1626, 99, 'V90'),
(1627, 99, 'XC40'),
(1628, 99, 'XC60'),
(1629, 99, 'XC70'),
(1630, 99, 'XC90'),
(1631, 100, '1100'),
(1632, 100, '1300'),
(1633, 100, 'YUGO'),
(1634, 101, 'TAVRIA');

-- --------------------------------------------------------

--
-- Structure de la table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `music_option_id` int(11) DEFAULT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `music`
--

INSERT INTO `music` (`id`, `music_option_id`, `genre`) VALUES
(1, 1, 'Rock'),
(2, 2, 'Jazz'),
(3, 3, 'Rap'),
(4, 4, 'Métal'),
(5, 5, 'Pop');

-- --------------------------------------------------------

--
-- Structure de la table `option`
--

CREATE TABLE `option` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `silence` tinyint(1) NOT NULL,
  `smoke` tinyint(1) NOT NULL,
  `animals` tinyint(1) NOT NULL,
  `music` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `option`
--

INSERT INTO `option` (`id`, `owner_id`, `silence`, `smoke`, `animals`, `music`) VALUES
(1, 1, 1, 1, 1, 0),
(2, 2, 1, 1, 1, 0),
(3, 4, 0, 1, 0, 1),
(4, 3, 0, 1, 0, 0),
(5, 5, 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `traject_ref_id` int(11) DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL,
  `places` smallint(6) NOT NULL,
  `small_baggage` smallint(6) NOT NULL,
  `large_baggage` smallint(6) NOT NULL,
  `booked_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `traject_ref_id`, `accepted`, `places`, `small_baggage`, `large_baggage`, `booked_at`) VALUES
(1, 1, 1, 1, 1, 0, '2023-06-19 12:45:07'),
(2, 1, 1, 1, 1, 0, '2023-06-19 12:45:07'),
(3, 1, 0, 1, 1, 0, '2023-06-19 12:45:07'),
(4, 1, 0, 1, 1, 0, '2023-06-19 12:45:07'),
(5, 2, 1, 2, 1, 1, '2023-06-19 12:45:07'),
(6, 2, 0, 1, 1, 0, '2023-06-19 15:05:00');

-- --------------------------------------------------------

--
-- Structure de la table `traject`
--

CREATE TABLE `traject` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `passengers` longtext DEFAULT NULL COMMENT '(DC2Type:json)',
  `places` smallint(6) NOT NULL,
  `price` smallint(6) NOT NULL,
  `small_baggage` smallint(6) NOT NULL,
  `large_baggage` smallint(6) NOT NULL,
  `start_time` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `traject`
--

INSERT INTO `traject` (`id`, `owner_id`, `passengers`, `places`, `price`, `small_baggage`, `large_baggage`, `start_time`, `created_at`, `updated_at`) VALUES
(1, 1, '[]', 3, 169, 3, 0, '2023-07-01 12:45:07', '2023-07-01 12:45:07', '2023-06-19 12:45:07'),
(2, 2, '[]', 5, 132, 2, 2, '2023-07-02 12:45:07', '2023-06-19 12:45:07', '2023-06-19 12:45:07'),
(3, 2, '[]', 5, 47, 2, 0, '2023-07-19 12:45:07', '2023-06-19 12:45:07', '2023-06-19 12:45:07'),
(4, 1, '[]', 2, 96, 1, 5, '2023-07-19 12:45:07', '2023-06-19 12:45:07', '2023-06-19 12:45:07'),
(5, 10, '[]', 1, 169, 0, 5, '2023-08-14 12:45:07', '2023-06-19 12:45:07', '2023-06-19 12:45:07');

-- --------------------------------------------------------

--
-- Structure de la table `type_address`
--

CREATE TABLE `type_address` (
  `id` int(11) NOT NULL,
  `label` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_address`
--

INSERT INTO `type_address` (`id`, `label`) VALUES
(1, 'start'),
(2, 'end'),
(3, 'step');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `last_activity` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `avatar` varchar(255) DEFAULT NULL,
  `birth_date` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `is_verified` tinyint(1) DEFAULT NULL,
  `total_credits` int(11) NOT NULL,
  `report` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `pseudo`, `first_name`, `last_name`, `created_at`, `last_activity`, `avatar`, `birth_date`, `is_verified`, `total_credits`, `report`) VALUES
(1, 'eleonore.lenoir@payet.com', '[\"ROLE_USER\"]', '$2y$13$KqXesAk.3xQXoLsgYyEqPerah99qF5VwJz2c6IZQaeEV/1ZXKzmg2', 'elisabeth69', 'Luc', 'Guillou', '2023-01-02 00:00:00', '2023-06-02 00:00:00', '', '2001-06-19 00:00:00', 1, 8400, 0),
(2, 'mlacombe@orange.fr', '[\"ROLE_USER\"]', '$2y$13$mweP212w42.tjTquydabr.nfamsSpvjvUDD3kS5knk41FrSMxKPL6', 'gilles82', 'Daniel', 'Robin', '2023-01-19 12:45:00', '2023-05-19 12:45:00', '', '2001-06-19 00:00:00', 1, 9100, 0),
(3, 'rene94@paul.fr', '[\"ROLE_USER\"]', '$2y$13$WqnlrQWyZ2Br3t9GGivpQ.tZ0hGW/9Zt7rJEc6ms7u5zkLjC1etAS', 'wpruvost', 'Bernadette', 'Noel', '2023-02-19 12:45:01', '2023-04-19 12:45:01', '', '2002-04-15 00:00:00', 1, 59, 1),
(4, 'tregnier@dacosta.com', '[\"ROLE_USER\"]', '$2y$13$dSe90ivINRtXNU4qnSCC7OYxx3iXYXVAshq9OLE4gP49Cwq8k6KOy', 'lthibault', 'Matthieu', 'Gomes', '2023-02-20 12:45:02', '2023-06-20 12:45:02', '', '1999-06-19 00:00:00', 1, 1200, 0),
(5, 'iroux@charles.fr', '[\"ROLE_USER\"]', '$2y$13$CiqvelWsVlWpbXoow1Df5OsgYppsGaWI5f2oFycuvyOgWAxfuThpK', 'pauline25', 'Nicolas', 'Becker', '2023-03-19 12:45:02', '2023-06-19 12:45:02', '', '2000-11-05 00:00:00', 1, 2300, 0),
(6, 'wboucher@faivre.fr', '[\"ROLE_USER\"]', '$2y$13$BRPwNNn3W88QTWm1PsxJOup8SfiMGuWjgP0JpXECm3lneTGrNtE06', 'julien01', 'Guy', 'Faivre', '2023-04-19 12:45:03', '2023-05-19 12:45:03', '', '2000-01-10 00:00:00', 1, 770, 1),
(7, 'lucas33@gallet.net', '[\"ROLE_USER\"]', '$2y$13$gvrWtJUs5CAanmFWAkR5I.1WucFYDjFdmy6Eo7.DgX65dmD8g0Ms6', 'claire.reynaud', 'Vincent', 'Didier', '2023-05-29 12:45:04', '2023-06-01 12:45:04', '', '1975-12-25 00:00:00', 1, 1724, 0),
(8, 'jacques28@live.com', '[\"ROLE_USER\"]', '$2y$13$vHyJ5wnmEv5ftA9M.RaaWuKpD4dqjnkDvQPAQK1sRa16ryq8lGkyG', 'rene80', 'Cécile', 'Begue', '2023-06-19 12:45:04', '2023-06-19 12:45:04', '', '1983-06-19 00:00:00', 0, 20, 0),
(9, 'antoine30@yahoo.fr', '[\"ROLE_USER\"]', '$2y$13$guoKi8hobuDbKNJf3BCNnegtq.O5gJpL3Er8BdESfJEh0Fv2092De', 'marechal.marthe', 'Frédérique', 'Faure', '2023-06-19 12:45:05', '2023-06-19 12:45:05', '', '2000-06-18 00:00:00', 1, 4780, 0),
(10, 'theodore.pierre@hotmail.fr', '[\"ROLE_USER\"]', '$2y$13$jMz2B0qHgCsVADw4INnBsOSyRpfZQVNrVi9qCqHgifp3tAM2kus02', 'leon.legrand', 'Jeanne', 'Perret', '2023-06-19 12:45:07', '2023-06-19 12:45:07', '', '2001-08-19 00:00:00', 1, 540, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user_reservation`
--

CREATE TABLE `user_reservation` (
  `user_id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_reservation`
--

INSERT INTO `user_reservation` (`user_id`, `reservation_id`) VALUES
(2, 1),
(3, 2),
(3, 5),
(4, 3),
(4, 6),
(5, 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D4E6F81A0CADD4` (`traject_id`),
  ADD KEY `IDX_D4E6F81C54C8C93` (`type_id`);

--
-- Index pour la table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_773DE69D7E3C61F9` (`owner_id`),
  ADD KEY `IDX_773DE69D7975B7E7` (`model_id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9474526C7E3C61F9` (`owner_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_68C58ED97E3C61F9` (`owner_id`);

--
-- Index pour la table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D79572D944F5D008` (`brand_id`);

--
-- Index pour la table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_CD52224A750E8BCE` (`music_option_id`);

--
-- Index pour la table `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5A8600B07E3C61F9` (`owner_id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_42C84955C68EF6E6` (`traject_ref_id`);

--
-- Index pour la table `traject`
--
ALTER TABLE `traject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64CC4A9C7E3C61F9` (`owner_id`);

--
-- Index pour la table `type_address`
--
ALTER TABLE `type_address`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  ADD UNIQUE KEY `UNIQ_8D93D64986CC499D` (`pseudo`);

--
-- Index pour la table `user_reservation`
--
ALTER TABLE `user_reservation`
  ADD PRIMARY KEY (`user_id`,`reservation_id`),
  ADD KEY `IDX_EBD380C0A76ED395` (`user_id`),
  ADD KEY `IDX_EBD380C0B83297E7` (`reservation_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pour la table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1635;

--
-- AUTO_INCREMENT pour la table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `option`
--
ALTER TABLE `option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `traject`
--
ALTER TABLE `traject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `type_address`
--
ALTER TABLE `type_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_D4E6F81A0CADD4` FOREIGN KEY (`traject_id`) REFERENCES `traject` (`id`),
  ADD CONSTRAINT `FK_D4E6F81C54C8C93` FOREIGN KEY (`type_id`) REFERENCES `type_address` (`id`);

--
-- Contraintes pour la table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `FK_773DE69D7975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  ADD CONSTRAINT `FK_773DE69D7E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526C7E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `FK_68C58ED97E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `FK_D79572D944F5D008` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

--
-- Contraintes pour la table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `FK_CD52224A750E8BCE` FOREIGN KEY (`music_option_id`) REFERENCES `option` (`id`);

--
-- Contraintes pour la table `option`
--
ALTER TABLE `option`
  ADD CONSTRAINT `FK_5A8600B07E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_42C84955C68EF6E6` FOREIGN KEY (`traject_ref_id`) REFERENCES `traject` (`id`);

--
-- Contraintes pour la table `traject`
--
ALTER TABLE `traject`
  ADD CONSTRAINT `FK_64CC4A9C7E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_reservation`
--
ALTER TABLE `user_reservation`
  ADD CONSTRAINT `FK_EBD380C0A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_EBD380C0B83297E7` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
