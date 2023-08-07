-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2023 at 06:07 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vms`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_carts`
--

CREATE TABLE `add_to_carts` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_id` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_id` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cat_code` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('1','2') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `cat_code`, `slug`, `image`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 'Regular Servicing', NULL, NULL, NULL, 'Bike', '1', '2022-11-14 06:45:59', '2022-12-29 11:05:43'),
(2, 1, 'Repairs', NULL, NULL, NULL, 'Hero Honda', '1', '2022-11-14 06:46:27', '2022-11-14 06:46:27'),
(3, 0, 'Modifications', NULL, NULL, NULL, 'Demo', '1', '2022-11-14 07:08:32', '2022-12-29 11:06:08'),
(4, 3, 'Accesories ', NULL, NULL, NULL, 'Demo', '2', '2022-11-14 07:09:15', '2022-11-14 07:09:48'),
(5, 0, 'Insurance Services', NULL, NULL, NULL, NULL, '1', '2022-12-29 11:04:43', '2022-12-29 11:04:43');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_otps`
--

CREATE TABLE `login_otps` (
  `id` int(11) NOT NULL,
  `otp` int(11) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0 COMMENT '1 => used',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login_otps`
--

INSERT INTO `login_otps` (`id`, `otp`, `phone`, `status`, `updated_at`, `created_at`) VALUES
(0, 123456, '85858585141', 1, '2022-12-27 11:16:07', '2022-12-27 11:16:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2022_11_12_095534_create_users_details_table', 2),
(6, '2022_11_12_101900_create_role__table', 3),
(7, '2022_11_12_102541_create_categories_table', 4),
(8, '2022_11_12_103111_create_service_table', 5),
(10, '2022_11_12_105442_create_order_table', 6),
(11, '2022_11_12_112427_create_vendor_assign_table', 7),
(12, '2022_11_12_113229_create_trasection_details_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `scheduled_time` timestamp(6) NULL DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `type_service` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('0','1','2','3','4','5','6') NOT NULL DEFAULT '0' COMMENT '0 for Pending, 1 for Assigned, 2 for On going ,3 for Pickedup, 4 for Completed, 5 for Rejected 1 for dispute',
  `accepted_on` varchar(255) DEFAULT NULL,
  `payment_status` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0 -> payment incomplete, 1 -> payment complete',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order_price` varchar(255) DEFAULT NULL,
  `vendor_price` varchar(255) DEFAULT NULL,
  `vendor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `current_address`, `zip_code`, `scheduled_time`, `services`, `type_service`, `description`, `status`, `accepted_on`, `payment_status`, `created_at`, `updated_at`, `order_price`, `vendor_price`, `vendor`) VALUES
(4, 5, 'noida', NULL, '2022-11-07 17:41:00.000000', '1,2', 'yes', 'hkh', '2', NULL, '0', '2022-11-17 13:40:42', '2022-12-18 12:13:24', '52', '41.6', 3),
(5, 7, 'Xyz', NULL, '2022-11-23 12:58:00.000000', '1,2', 'no', 'abc', '2', '23-05-11 03:07', '0', '2022-11-21 12:59:14', '2023-05-10 21:37:05', '1000', '800', 2),
(6, 5, 'tugalpur', NULL, '2022-11-08 20:54:00.000000', '1,2', 'yes', 'jjbb knk kl jjk', '6', '22-12-14 17:59', '1', '2022-11-21 16:55:41', '2022-12-14 12:49:46', '100', '80', 2),
(8, 7, 'Noida', NULL, '2022-12-07 18:00:00.000000', '2', 'yes', 'demo demo', '0', NULL, '0', '2022-12-18 12:28:30', '2022-12-18 12:29:07', '500', '400', 3),
(10, 20, 'jfkdkjf jkldjfklaj kjdfjdskla', 210200, '0000-00-00 00:00:00.000000', '1,2', NULL, NULL, '', NULL, '0', '2023-01-03 06:47:53', '2023-01-03 06:47:53', '1200', '960', 12),
(11, 20, 'jfkdkjf jkldjfklaj kjdfjdskla', 22222, '2023-01-07 18:30:00.000000', '1,2', NULL, NULL, '', NULL, '0', '2023-01-03 06:53:37', '2023-01-03 06:53:37', '1200', '960', 12),
(12, 20, 'jfkdkjf jkldjfklaj kjdfjdskla', 20201, '2023-01-06 18:30:00.000000', '1,2', NULL, NULL, '', NULL, '0', '2023-01-03 08:15:19', '2023-01-03 08:15:19', '1200', '960', 9),
(13, 20, 'tugalpur Greater Noida noida noida', 210210, '2023-01-09 00:00:00.000000', '1', NULL, NULL, '0', NULL, '0', '2023-01-05 12:18:24', '2023-01-05 12:18:24', '500', '400', 3);

-- --------------------------------------------------------

--
-- Table structure for table `order_proofs`
--

CREATE TABLE `order_proofs` (
  `id` int(11) NOT NULL,
  `order_id` int(50) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `vendor` varchar(255) DEFAULT NULL,
  `vendor_image` text DEFAULT NULL,
  `vendor_desc` text DEFAULT NULL,
  `admin_desc` text DEFAULT NULL,
  `admin_doc` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0=>dispute,1=>complete',
  `refund` varchar(255) DEFAULT NULL COMMENT 'refund to customer',
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_proofs`
--

INSERT INTO `order_proofs` (`id`, `order_id`, `user`, `type`, `image`, `desc`, `vendor`, `vendor_image`, `vendor_desc`, `admin_desc`, `admin_doc`, `status`, `refund`, `updated_at`, `created_at`) VALUES
(1, 6, '5', '2', 'http://localhost/vms_new/storage/app/public/proofs/9041vendor_proof.png,http://localhost/vms_new/storage/app/public/proofs/1063vendor_proof.png', 'kfldkdfg', '2', 'http://localhost/vms_new/storage/app/public/proofs/6703vendor_proof.png,http://localhost/vms_new/storage/app/public/proofs/2005vendor_proof.jpg', 'Vendor Desc', 'hbhbhhhg', 'http://localhost/vms_new/storage/app/public/proofs/admin/7602admin_proof.png', 1, '500', '2022-12-22 10:48:49', '2022-12-17 11:50:07');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `rating`, `comment`, `user_id`, `vendor_id`, `created_at`, `updated_at`) VALUES
(1, 4, 'Good services', 5, 2, '2022-12-04 11:19:27', '2022-12-04 11:19:27'),
(2, 2, 'on time delivery services', 7, 2, '2022-12-04 11:19:27', '2022-12-04 11:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `permissions`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '[\'all\']', NULL, NULL),
(2, 'Vendor', '[\'all\']', NULL, NULL),
(3, 'User', '[\'all\']', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `service_code` varchar(255) DEFAULT NULL,
  `price` double(10,2) NOT NULL DEFAULT 0.00,
  `service_pic` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('1','2') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `cat_id`, `name`, `service_code`, `price`, `service_pic`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Regular Servicing', '3340', 500.00, '3265service.png', 'We offer regular servicing packages that include oil changes, filter replacements, brake checkups, and more. Our technicians will ensure that your bike is in good condition and running smoothly', '1', '2022-11-16 16:34:45', '2022-12-02 09:10:16'),
(2, 2, 'Repairs', '96324', 700.00, NULL, 'We can provide repairs for a variety of issues, from flat tires to engine problems. Our team is equipped to handle all kinds of repairs and we guarantee a quick and efficient service.', '1', '2022-12-02 09:09:29', '2022-12-02 09:09:29'),
(3, 3, 'Modifications', NULL, 0.00, NULL, 'If you want to give your bike a new look or upgrade its performance, we can help. Our team can provide customizations and modifications to enhance your two-wheeler\'s appearance and performance.\n', '1', NULL, NULL),
(4, 4, 'Accesories ', NULL, 0.00, NULL, 'We offer a wide range of accessories, from helmets to bike covers, locks, and more. You can count on us to have everything you need to keep your two-wheeler safe and comfortable.', '1', NULL, NULL),
(5, 5, 'Insurance Services', NULL, 0.00, NULL, 'Be insured about your vehicle in a single click. For More details you are more than welcome. ', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trasection_details`
--

CREATE TABLE `trasection_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(8,1) NOT NULL,
  `discount` decimal(8,1) NOT NULL,
  `grand_total` decimal(8,1) NOT NULL,
  `currency_symbol_position` varchar(255) DEFAULT NULL,
  `currency_text` varchar(255) DEFAULT NULL,
  `currency_text_position` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `gateway_type` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `usercode` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` bigint(20) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `profile_image` varchar(250) DEFAULT NULL,
  `privacy_policy` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `usercode`, `email`, `number`, `email_verified_at`, `password`, `remember_token`, `profile_image`, `privacy_policy`, `created_at`, `updated_at`) VALUES
(1, 1, 'Admin Admin', 'VMS_876543', 'admin@argon.com', 0, '2022-11-07 06:04:23', '$2y$10$J3MeQqXnxg4apRgTXuMh6unO.haVZc.Jq.TzpFAIPfSp9fI24su82', '20K7oPq4GpuGBGxjBQin7YSDpZgm6oDlguEQdRPzPSJhTvxgL6SeljF7xGYe', NULL, NULL, '2022-11-07 06:04:23', '2022-11-07 06:04:23'),
(2, 2, 'Mohan Kumar', 'VJU649', 'mohan@gmail.com', 64456454, NULL, '$2y$10$J3MeQqXnxg4apRgTXuMh6unO.haVZc.Jq.TzpFAIPfSp9fI24su82', NULL, 'http://localhost/vms_new/storage/app/public/user_profile/4435vendor.jpg', NULL, '2022-11-14 06:42:38', '2022-12-12 11:36:36'),
(3, 2, 'Rohan Kumar', 'VJU917', 'mohansharma@gmail.com', 8585858585, NULL, '$2y$10$M7UDhzLJjUnpsjbfld9DQ.dc2znrutuvw2V4u79LQeB386BmBDuJy', NULL, NULL, NULL, '2022-11-14 06:43:55', '2022-11-14 06:43:55'),
(4, 2, 'Sohan Kumar', 'VJU402', 'mohansharma1@gmail.com', 8585858585, NULL, '$2y$10$2pm5a3sDeFdAs1ty9c6MVevZbdpn1jY40BUAbttroeOWH/tYlT1RK', NULL, NULL, NULL, '2022-11-14 06:44:40', '2022-11-14 06:44:40'),
(5, 3, 'Rohit', 'VJU202', 'Rohit@gmail.com', 7858585858, NULL, '$2y$10$68PWmq92GJdaKkKO7zBZsuH.kGg3gQryYVscd88VRZwTTwGnmAvGS', NULL, NULL, NULL, '2022-11-14 06:47:13', '2022-11-14 06:47:13'),
(6, 2, 'Client', 'VJU109', 'client@gmail.com', 9898565654, NULL, '$2y$10$ypPWeBlN/hbN2cd.8b/7fujAw8jDrGYiPXyNNHKjtnUx063Q2kBji', NULL, NULL, NULL, '2022-11-14 06:58:30', '2022-11-14 06:58:30'),
(7, 3, 'Test1', 'VJU998', 'user1@gmail.com', 9876543, NULL, '$2y$10$xycQgLNA4IImka/djWYHR.Gr9/3hAuoXd9D7skPg/ytTa7aA6rA2W', NULL, NULL, NULL, '2022-11-14 07:00:54', '2022-11-14 07:00:54'),
(9, 2, 'kik', 'VJU705', 'k@gmail.com', 343455, NULL, '', NULL, NULL, '1', '2022-12-23 08:12:09', '2022-12-23 08:12:09'),
(10, 2, 'raja ram mohan', 'VJU722', 'rajaram@gmail.com', 85858585858, NULL, '', NULL, NULL, '1', '2022-12-27 10:48:59', '2022-12-27 10:48:59'),
(12, 2, 'raja ram mohan', 'VJU872', 'rajaram00@gmail.com', 85858585800, NULL, 'password', NULL, NULL, '1', '2022-12-27 10:58:19', '2022-12-27 10:58:19'),
(14, 2, 'raja ram mohan', 'VJU163', 'rajaram10@gmail.com', 85858585801, NULL, '', NULL, NULL, '1', '2022-12-27 11:01:11', '2022-12-27 11:01:11'),
(15, 2, 'raja ram mohan', 'VJU603', 'rajaram170@gmail.com', 85858585807, NULL, '', NULL, NULL, '1', '2022-12-27 11:02:08', '2022-12-27 11:02:08'),
(16, 2, 'raja ram mohan', 'VJU226', 'rajaram1770@gmail.com', 85858585805, NULL, '', NULL, NULL, '1', '2022-12-27 11:04:28', '2022-12-27 11:04:28'),
(17, 2, 'raja ram mohan', 'VJU929', 'rajaram99@gmail.com', 858585858999, NULL, '', NULL, NULL, '1', '2022-12-27 11:05:36', '2022-12-27 11:05:36'),
(19, 2, 'raja ram mohan', 'VJU585', 'rajaram909@gmail.com', 85858585855, NULL, '$2y$10$APzQK4cyd/6IM9OFVx2T2ehzkJ9lTkLbLWhOec9byXiYccKkGMcMq', NULL, NULL, '1', '2022-12-27 11:06:20', '2022-12-27 11:08:01'),
(20, 3, 'raja ram mohann', 'VJU485', 'user@gmail.com', 85858585141, NULL, '$2y$10$64QULhFQY31VusfBaXiKIO2RMdtPKIo7uvC9NpAMsWgXvq1TvBnFS', NULL, NULL, '1', '2022-12-27 11:16:07', '2023-01-04 09:06:45'),
(21, 0, 'raja ram mohan', '', '', 0, NULL, '', NULL, NULL, NULL, '2023-01-04 09:04:26', '2023-01-04 09:04:26');

-- --------------------------------------------------------

--
-- Table structure for table `users_details`
--

CREATE TABLE `users_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `shop_address` varchar(255) DEFAULT NULL,
  `junction_type` enum('authorized','verified','pending','cancel') DEFAULT NULL,
  `property_type` enum('own','rent','other') DEFAULT NULL,
  `documentation` varchar(255) DEFAULT NULL,
  `shop_pic` varchar(255) DEFAULT NULL,
  `rendered_services` varchar(255) DEFAULT NULL,
  `pick_drop` enum('yes','no') DEFAULT NULL,
  `service_offer` text DEFAULT NULL,
  `agreement_price` varchar(255) DEFAULT NULL,
  `type_mode` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `bike_name` varchar(255) DEFAULT NULL,
  `bike_image` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `agreement` int(11) NOT NULL DEFAULT 0,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `status` enum('1','2','3','4','5') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_details`
--

INSERT INTO `users_details` (`id`, `user_id`, `shop_address`, `junction_type`, `property_type`, `documentation`, `shop_pic`, `rendered_services`, `pick_drop`, `service_offer`, `agreement_price`, `type_mode`, `gender`, `description`, `vehicle_model`, `bike_name`, `bike_image`, `country`, `agreement`, `state`, `city`, `zip_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'noida', 'authorized', 'own', 'all', NULL, '500', 'yes', '1', '8', 'Samll', NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, '2', '2022-11-14 06:44:40', '2022-12-02 09:08:34'),
(2, 5, 'noida', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Bmw-714', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-11-14 06:47:13', '2022-11-14 06:47:13'),
(3, 6, 'Noida', 'verified', 'own', 'SNSN', NULL, '2000', 'yes', '1,2', '4', 'Big', NULL, NULL, NULL, NULL, NULL, NULL, 80, NULL, NULL, NULL, '5', '2022-11-14 06:58:30', '2022-12-02 09:11:04'),
(4, 7, 'Noida', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'B232BS', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-11-14 07:00:54', '2022-11-14 07:00:54'),
(5, 2, '4', NULL, NULL, 'http://localhost/vms_newstorage/app/public/vendor/document/8950service.jpg', NULL, NULL, 'no', NULL, NULL, 'Big', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-12 11:30:09', '2022-12-12 11:31:02'),
(6, 9, 'dsfdsf', '', '', NULL, NULL, NULL, 'yes', 'ksdfksdf', '500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-23 08:12:09', '2022-12-23 08:12:09'),
(7, 10, 'dsfdsf', 'authorized', 'own', NULL, NULL, NULL, 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-27 10:48:59', '2022-12-27 10:48:59'),
(8, 12, 'dsfdsf', 'authorized', 'own', NULL, NULL, NULL, 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-27 10:58:19', '2022-12-27 10:58:19'),
(9, 17, 'dsfdsf', 'authorized', 'own', NULL, NULL, NULL, 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-27 11:05:36', '2022-12-27 11:05:36'),
(10, 19, 'dsfdsf', 'authorized', 'own', NULL, NULL, NULL, 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '2022-12-27 11:06:20', '2022-12-27 11:06:20'),
(11, 20, 'dsfdsf', 'authorized', 'own', NULL, NULL, NULL, 'yes', '1,2', '50', NULL, NULL, NULL, '145248743iik', 'hero Honda', 'http://3.108.94.165/vms_project/storage/app/public/user/bike/6844bike.jpg', NULL, 0, NULL, NULL, NULL, NULL, '2022-12-27 11:16:07', '2023-01-05 09:54:31');

-- --------------------------------------------------------

--
-- Table structure for table `user_temps`
--

CREATE TABLE `user_temps` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `usercode` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `shop_address` varchar(500) DEFAULT NULL,
  `junction_type` enum('authorized','verified','pending','cancel') DEFAULT NULL,
  `property_type` enum('own','rent','other') DEFAULT NULL,
  `documentation` varchar(500) DEFAULT NULL,
  `shop_pic` varchar(500) DEFAULT NULL,
  `rendered_services` varchar(500) DEFAULT NULL,
  `pick_drop` enum('yes','no') DEFAULT NULL,
  `service_offer` varchar(500) DEFAULT NULL,
  `agreement_price` varchar(500) DEFAULT NULL,
  `type_mode` varchar(500) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `agreement` varchar(255) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `zip_code` varchar(100) DEFAULT NULL,
  `status` enum('1','2','3','4','5') DEFAULT NULL,
  `privacy_policy` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_temps`
--

INSERT INTO `user_temps` (`id`, `role_id`, `name`, `usercode`, `email`, `number`, `password`, `profile_image`, `shop_address`, `junction_type`, `property_type`, `documentation`, `shop_pic`, `rendered_services`, `pick_drop`, `service_offer`, `agreement_price`, `type_mode`, `gender`, `description`, `vehicle_model`, `country`, `agreement`, `state`, `city`, `zip_code`, `status`, `privacy_policy`, `created_at`, `updated_at`) VALUES
(5, 2, 'kik', 'VJU705', 'k@gmail.com', '343455', NULL, NULL, 'dsfdsf', '', '', NULL, NULL, 'sss', 'yes', 'ksdfksdf', '500', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-23 08:08:36', '2022-12-23 08:08:36'),
(6, 2, 'kik', 'VJU903', 'k@gmail.com', '343455', NULL, NULL, 'dsfdsf', '', '', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-23 08:48:00', '2022-12-23 08:48:00'),
(7, 2, 'raja ram mohan', 'VJU722', 'rajaram@gmail.com', '85858585858', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 10:48:54', '2022-12-27 10:48:54'),
(8, 2, 'raja ram mohan', 'VJU872', 'rajaram00@gmail.com', '85858585800', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 10:58:12', '2022-12-27 10:58:12'),
(9, 2, 'raja ram mohan', 'VJU163', 'rajaram10@gmail.com', '85858585801', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:01:05', '2022-12-27 11:01:05'),
(10, 2, 'raja ram mohan', 'VJU603', 'rajaram170@gmail.com', '85858585807', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:02:02', '2022-12-27 11:02:02'),
(11, 2, 'raja ram mohan', 'VJU226', 'rajaram1770@gmail.com', '85858585805', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:04:20', '2022-12-27 11:04:20'),
(12, 2, 'raja ram mohan', 'VJU929', 'rajaram99@gmail.com', '858585858999', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:05:31', '2022-12-27 11:05:31'),
(13, 2, 'raja ram mohan', 'VJU585', 'rajaram909@gmail.com', '85858585855', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:06:13', '2022-12-27 11:06:13'),
(14, 2, 'raja ram mohan', 'VJU485', 'rajaram141@gmail.com', '85858585141', NULL, NULL, 'dsfdsf', 'authorized', 'own', NULL, NULL, 'sss', 'yes', '1,2', '50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2022-12-27 11:16:02', '2022-12-27 11:16:02');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_assign`
--

CREATE TABLE `vendor_assign` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `vendor_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('0','1','2','3','4','5','6') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_comments`
--

CREATE TABLE `vendor_comments` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendor_comments`
--

INSERT INTO `vendor_comments` (`id`, `comment`, `order_id`, `vendor_id`, `created_at`, `updated_at`) VALUES
(1, 'Order is big.', 4, 3, '2022-12-04 11:28:02', '2022-12-04 11:28:02'),
(2, 'Order is not big.', 5, 2, '2022-12-04 11:28:06', '2022-12-04 11:28:55'),
(3, 'hbjhb', 5, 2, '2022-12-12 12:38:15', '2022-12-12 12:38:15'),
(4, 'kdkdsfksf', 5, 2, '2022-12-12 12:41:26', '2022-12-12 12:41:26'),
(5, 'kdkdsfksf', 5, 2, '2022-12-12 12:41:32', '2022-12-12 12:41:32'),
(6, 'kdkdsfksf fkfksjdf;lkdsjf', 5, 2, '2022-12-12 12:41:42', '2022-12-12 12:41:42'),
(7, 'kdkdsfksf fkfksjdf;lkdsjf hghgh', 5, 2, '2022-12-12 12:42:05', '2022-12-12 12:42:05'),
(8, 'mllskddksdj', 5, 2, '2022-12-12 12:44:42', '2022-12-12 12:44:42'),
(9, 'mllskddksdj', 6, 2, '2022-12-12 12:46:00', '2022-12-12 12:46:00'),
(10, 'mllskddksdj', 6, 2, '2022-12-12 12:46:06', '2022-12-12 12:46:06'),
(11, 'mllskddksdj', 6, 2, '2022-12-12 12:46:11', '2022-12-12 12:46:11'),
(12, 'sdmfdlfdskfksdkfldksf', 5, 2, '2022-12-14 12:39:27', '2022-12-14 12:39:27'),
(13, 'ksdflkdsf', 5, 2, '2022-12-14 12:46:22', '2022-12-14 12:46:22'),
(14, 'ksdflkdsf', 5, 2, '2022-12-14 12:46:47', '2022-12-14 12:46:47'),
(15, 'ksdflkdsf', 5, 2, '2022-12-14 12:46:49', '2022-12-14 12:46:49'),
(16, 'dsfdsfdsf', 5, 2, '2022-12-14 12:47:11', '2022-12-14 12:47:11'),
(17, 'dsfdsfdsf', 5, 2, '2022-12-14 12:47:20', '2022-12-14 12:47:20'),
(18, 'dsfdsf', 5, 2, '2022-12-14 12:48:01', '2022-12-14 12:48:01'),
(19, 'fdsfsdflsdf', 6, 2, '2022-12-14 12:49:46', '2022-12-14 12:49:46'),
(20, 'skldfsdflkdsf', 5, 2, '2022-12-14 12:51:04', '2022-12-14 12:51:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_carts`
--
ALTER TABLE `add_to_carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_proofs`
--
ALTER TABLE `order_proofs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_cat_id_foreign` (`cat_id`);

--
-- Indexes for table `trasection_details`
--
ALTER TABLE `trasection_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trasection_details_order_id_foreign` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `users_details`
--
ALTER TABLE `users_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_temps`
--
ALTER TABLE `user_temps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_assign`
--
ALTER TABLE `vendor_assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_assign_order_id_foreign` (`order_id`);

--
-- Indexes for table `vendor_comments`
--
ALTER TABLE `vendor_comments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_carts`
--
ALTER TABLE `add_to_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_proofs`
--
ALTER TABLE `order_proofs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trasection_details`
--
ALTER TABLE `trasection_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users_details`
--
ALTER TABLE `users_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_temps`
--
ALTER TABLE `user_temps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vendor_assign`
--
ALTER TABLE `vendor_assign`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendor_comments`
--
ALTER TABLE `vendor_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `order_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `service_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `trasection_details`
--
ALTER TABLE `trasection_details`
  ADD CONSTRAINT `trasection_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `users_details`
--
ALTER TABLE `users_details`
  ADD CONSTRAINT `users_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `vendor_assign`
--
ALTER TABLE `vendor_assign`
  ADD CONSTRAINT `vendor_assign_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
