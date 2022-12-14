-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2022 at 01:26 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pakaiancustom`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id_akun` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id_akun`, `username`, `password`, `email`, `alamat`, `no_telp`, `role`) VALUES
(1, 'Budi_456', 'Budi456', 'Budi_456@gmail.com', 'Jalan Cimbuleuit 28, Bandung', '082219761575', 'Admin'),
(2, 'Asep_777', 'BosAsep', 'Asep_777@gmail.com', 'Jalan Cimbuleuit 20, Bandung', '081213965522', 'Pemilik'),
(3, 'Joni_213', 'BroJon', 'Joni_213@gmail.com', 'Jalan Cimbuleuit 21, Bandung', '081213965542', 'Pemesan'),
(4, 'Adi_987', 'BroAdi', 'Adi_987@gmail.com', 'Jalan Cimbuleuit 22, Bandung', '082218965465', 'Pemesan'),
(5, 'Samsul_333', 'BroSam', 'Samsul_333@gmail.com', 'Jalan Cimbuleuit 25, Bandung', '082219761543', 'Pemesan'),
(6, 'Botak_673', 'BroBotak', 'Botak_673@gmail.com', 'Jalan Cimbuleuit 27, Bandung', '082219761523', 'Pemesan'),
(7, 'Edi_007', 'BroEdi', 'Edi_007@gmail.com', 'Jalan cimbuleuit 30, bandung', '082231466151', 'Pemesan'),
(8, 'GiovanniS', 'Samara12', 'giosamara1@gmail.com', 'Jl. Gading Raya 1', '081221313122', 'Pemesan');

-- --------------------------------------------------------

--
-- Table structure for table `bahan`
--

CREATE TABLE `bahan` (
  `id_bahan` int(11) NOT NULL,
  `namabahan` varchar(50) NOT NULL,
  `gambarbahan` varchar(50) NOT NULL,
  `deskripsibahan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bahan`
--

INSERT INTO `bahan` (`id_bahan`, `namabahan`, `gambarbahan`, `deskripsibahan`) VALUES
(1, 'Katun', 'pengertian-kain-katun.jpg', 'ini kain katun'),
(2, 'Wool', 'Wool.jpg', 'Kain Wool menghangatkan tubuh\r\npemakaianya, sangat cocok digunakan di\r\ndaerah digin'),
(3, 'Linen', 'Linen.png', 'Kain Linen bahan yang berasal dari serat\r\ntumbuhan \'linen\'');

-- --------------------------------------------------------

--
-- Table structure for table `buktipembayaran`
--

CREATE TABLE `buktipembayaran` (
  `id_pesanan` int(11) NOT NULL,
  `bukti` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buktipembayaran`
--

INSERT INTO `buktipembayaran` (`id_pesanan`, `bukti`) VALUES
(1, 'buktipembca.jpg'),
(2, 'buktibni.jpg'),
(3, 'buktibni5.jpg'),
(4, 'buktipem3.jpg'),
(5, 'buktipem.jpg'),
(6, 'buktipem2.jpg'),
(7, 'buktipem5.jpg'),
(8, 'buktibca5.jpg'),
(9, 'buktibca1.jpg'),
(10, 'buktibca2.jpg'),
(11, 'buktibca6.jpg'),
(12, 'buktibca3.jpg'),
(13, 'buktibca4.jpeg'),
(14, 'buktibca7.jpg'),
(15, 'f46ee094-76eb-410d-8633-5bd2beb49b70.jpg'),
(16, 'afc91838-9dbb-4017-ac6c-39577265b6bf.jpeg'),
(17, 'd135eab8-6a55-41b0-a5b4-9e703ef6cc7e.jpeg'),
(18, '9dc6a1ff-405f-4620-ab1e-46ab75320455.jpeg'),
(19, 'ab7a4779-2093-4686-b921-25254c5a0c57.jpeg'),
(20, 'fd74ffd4-b585-4e7b-a5ef-3d3da5bfc454.jpg'),
(21, '3a708851-b4f0-4a46-a422-6b083063c707.jpeg'),
(22, 'a8d81f13-c78a-4603-8b58-c2ec6359951a.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `daftaraksesoris`
--

CREATE TABLE `daftaraksesoris` (
  `id_aksesoris` int(11) NOT NULL,
  `gambaraksesoris` varchar(50) NOT NULL,
  `namaaksesoris` varchar(50) NOT NULL,
  `hargaaksesoris` int(11) NOT NULL,
  `jumlahaksesoris` int(11) NOT NULL,
  `deskripsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftaraksesoris`
--

INSERT INTO `daftaraksesoris` (`id_aksesoris`, `gambaraksesoris`, `namaaksesoris`, `hargaaksesoris`, `jumlahaksesoris`, `deskripsi`) VALUES
(1, 'img_kancing.jpeg', 'kancing', 10000, 10, 'ini kancing'),
(2, 'Renda.jpg', 'renda', 15000, 2, 'Ini renda');

-- --------------------------------------------------------

--
-- Table structure for table `daftarproduk`
--

CREATE TABLE `daftarproduk` (
  `id_produk` int(11) NOT NULL,
  `id_model` int(11) NOT NULL,
  `id_bahan` int(11) NOT NULL,
  `hargaproduk` int(11) NOT NULL,
  `biayajahit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daftarproduk`
--

INSERT INTO `daftarproduk` (`id_produk`, `id_model`, `id_bahan`, `hargaproduk`, `biayajahit`) VALUES
(1, 1, 1, 200000, 100000),
(2, 1, 2, 300000, 100000),
(3, 1, 3, 250000, 100000),
(4, 2, 1, 150000, 100000),
(5, 2, 2, 250000, 100000),
(6, 2, 3, 200000, 100000),
(7, 3, 1, 250000, 100000),
(8, 3, 2, 350000, 100000),
(9, 3, 3, 300000, 100000),
(10, 4, 1, 150000, 100000),
(11, 4, 2, 250000, 100000),
(12, 4, 3, 200000, 100000),
(13, 5, 1, 250000, 100000),
(14, 5, 2, 350000, 100000),
(15, 5, 3, 300000, 100000),
(16, 6, 1, 100000, 100000),
(17, 6, 2, 200000, 100000),
(18, 6, 3, 150000, 100000),
(19, 7, 1, 200000, 100000),
(20, 7, 2, 300000, 100000),
(21, 7, 3, 250000, 100000),
(22, 8, 1, 150000, 120000),
(23, 8, 2, 250000, 120000),
(24, 8, 3, 200000, 120000),
(25, 9, 1, 150000, 130000),
(26, 9, 2, 250000, 130000),
(27, 9, 3, 300000, 130000),
(28, 10, 1, 200000, 150000),
(29, 10, 2, 300000, 150000),
(30, 10, 3, 250000, 150000),
(31, 11, 1, 200000, 150000),
(32, 11, 2, 300000, 150000),
(33, 11, 3, 250000, 150000),
(34, 12, 1, 200000, 100000),
(35, 12, 2, 300000, 100000),
(36, 12, 3, 250000, 100000),
(37, 13, 1, 100000, 80000),
(38, 13, 2, 200000, 80000),
(39, 13, 3, 150000, 80000);

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `id_model` int(11) NOT NULL,
  `namamodel` varchar(50) NOT NULL,
  `gambarmodel` varchar(50) NOT NULL,
  `deskripsimodel` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`id_model`, `namamodel`, `gambarmodel`, `deskripsimodel`) VALUES
(1, 'Kaos Berkerah (Polo)', 'img_baju_polo.png', 'Kaos polo modern yang terinspirasi dari kemeja rugger tradisional. Nyaman dikenakan dan mudah dirawat'),
(2, 'Kemeja Formal', 'img_kemeja.png', 'Kemeja Formal yang nyaman dikenakan dan mudah dirawat'),
(3, 'Kaos Lengan Panjang', 'img_kaos_panjang.png', 'Kaos Lengan Panjang yang nyaman dikenakan dan mudah dirawat'),
(4, 'Kemeja Kasual', 'img_fakboi.png', 'Kemeja Kasual modern yang nyaman dikenakan dan mudah dirawat'),
(5, 'Kemeja Kasual Panjang', '42312312312312-removebg-preview.png', 'Kemeja Kasual Panjang yang nyaman dikenakan dan mudah dirawat'),
(6, 'Kaos Lengan Pendek', 'kaos_polos.png', 'Kaos Lengan Pendek yang nyaman dikenakan dan mudah dirawat'),
(7, 'Kaos Polo Bergaris', 'kaos polo garis lengan pendek.png', 'Kaos Polo Bergaris'),
(8, 'Kaos Ghibli', 'my ghibli lengan pendek.png', 'Kaos Ghibli model dari Jepang'),
(9, 'Kaos Ghibli Rain', 'my ghibli rain lengan pendek.png', 'Kaos Ghibli kehujanan'),
(10, 'Kaos Final Fantasy TSOTD', 'final fantasy TSOTSD lengan pendek.png', 'Kaos Final Fantasy The Scions Of The Seventh Dawn '),
(11, 'Kaos Final Fantasy VI', 'ut final fantasy lengan pendek.png', 'Kaos Final Fantasy Season 6'),
(12, 'Kemeja Flannel', 'kemeja flannel kotak lengan panjang.png', 'Kemeja Flannel Kota Lengan Panjang yang nyaman dipakai'),
(13, 'Baju SD', 'Baju SD.png', 'Ini baju buat bocil di Sekolah Dasar');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(50) NOT NULL,
  `waktu` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `detailpesanan` varchar(100) NOT NULL,
  `total_biaya` varchar(50) NOT NULL,
  `status_pesanan` varchar(50) NOT NULL,
  `status` varchar(100) NOT NULL,
  `kurir` varchar(50) NOT NULL,
  `noresi` varchar(50) NOT NULL,
  `catatanaksesoris` varchar(150) NOT NULL,
  `validasi` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `waktu`, `username`, `detailpesanan`, `total_biaya`, `status_pesanan`, `status`, `kurir`, `noresi`, `catatanaksesoris`, `validasi`) VALUES
(1, 'Senin, 13 Juni 2022 Jam 17:59', 'Edi_007', 'Produk:Kaos Berkerah (Polo)+Warna:ungu+Ukuran:M+Bahan:Katun+Aksesoris:kancing', 'Rp 310000', 'sudah bayar', 'Jumat, 24 Juni 2022 Jam 23:18 sudah bayar', 'JNE', 'TPXL-0000000W111', '-', 'y'),
(2, 'Senin, 13 Juni 2022 Jam 18:23', 'Edi_007', 'Produk:Kemeja Formal+Warna:merah+Ukuran:M+Bahan:Katun+Aksesoris:kancing', 'Rp 260000', 'sudah bayar', 'Selasa, 14 Juni 2022 Jam 14:33 sudah bayar', 'Sicepat', 'TPXL-0000000W112', '-', 'y'),
(3, 'Senin, 13 Juni 2022 Jam 22:21', 'Joni_213', 'Produk:Kaos Berkerah (Polo)+Warna:ungu+Ukuran:M+Bahan:Katun+Aksesoris:kancing', 'Rp 310000', 'sudah bayar', 'Senin, 13 Juni 2022 Jam 22:24 sudah bayar', 'JNT', 'TPXL-0000000W113', '-', 'y'),
(4, 'Senin, 13 Juni 2022 Jam 22:44', 'Adi_987', 'Produk:Kemeja Formal+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:kancing', 'Rp 260000', 'sudah bayar', 'Selasa, 14 Juni 2022 Jam 14:33 sudah bayar', 'JNE', 'TPXL-0000000W114', 'kancing nya besar', 'y'),
(5, 'Senin, 13 Juni 2022 Jam 23:10', 'Samsul_333', 'Produk:Kemeja Kasual+Warna:hijau+Ukuran:L+Bahan:Katun+Aksesoris:kancing', 'Rp 260000', '-', 'Rabu, 15 Juni 2022 Jam 15:20 sudah selesai', '-', '-', 'kancing nya jangan terlalu besar', 'n'),
(6, 'Senin, 13 Juni 2022 Jam 23:12', 'Samsul_333', 'Produk:Kemeja Formal+Warna:ungu+Ukuran:L+Bahan:Linen+Aksesoris:renda', 'Rp 315000', '-', '-', '-', '-', '', 'n'),
(7, 'Senin, 13 Juni 2022 Jam 23:22', 'Joni_213', 'Produk:Kemeja Formal+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:kancing', 'Rp 260000', '-', '-', '-', '-', '-', 'n'),
(8, 'Selasa, 14 Juni 2022 Jam 15:27', 'Joni_213', 'Produk:Kaos Berkerah (Polo)+Warna:ungu+Ukuran:L+Bahan:Katun+Aksesoris:kancing', 'Rp 310000', 'sudah bayar', 'Selasa, 14 Juni 2022 Jam 15:30 sudah bayar', 'JNE', 'TPXL-0000000W115', 'kancingnya besar', 'y'),
(9, 'Selasa, 14 Juni 2022 Jam 16:06', 'Joni_213', 'Produk:Kemeja Kasual+Warna:merah+Ukuran:L+Bahan:Linen+Aksesoris:kancing', 'Rp 310000', 'sudah bayar', 'Selasa, 14 Juni 2022 Jam 16:10 sudah bayar', 'Sicepat', 'TPXL-0000000W116', 'kancingnya yang bagus', 'y'),
(10, 'Selasa, 14 Juni 2022 Jam 17:19', 'Joni_213', 'Produk:Kemeja Formal+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:-', 'Rp 250000', '-', '-', '-', '-', '-', 'n'),
(11, 'Rabu, 15 Juni 2022 Jam 15:10', 'GiovanniS', 'Produk:Kemeja Kasual+Warna:ungu+Ukuran:L+Bahan:Katun+Aksesoris:kancing', 'Rp 260000', 'sudah bayar', 'Rabu, 15 Juni 2022 Jam 15:14 sudah bayar', 'JNT', 'TPXL-0000000W117', 'kancingnya besar', 'y'),
(12, 'Kamis, 16 Juni 2022 Jam 08:51', 'Joni_213', 'Produk:Kemeja Kasual Panjang+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:-', 'Rp 350000', '-', '-', '-', '-', '-', 'n'),
(13, 'Jumat, 17 Juni 2022 Jam 13:13', 'Joni_213', 'Produk:Kemeja Kasual Panjang+Warna:ungu+Ukuran:XXS+Bahan:Wool+Aksesoris:kancing', 'Rp 460000', '-', '-', '-', '-', 'kancingnya besar', 'n'),
(14, 'Jumat, 17 Juni 2022 Jam 14:04', 'Adi_987', 'Produk:Kemeja Formal+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:-', 'Rp 250000', '-', '-', '-', '-', '-', 'n'),
(15, 'Jumat, 17 Juni 2022 Jam 14:15', 'Adi_987', 'Produk:Kemeja Kasual Panjang+Warna:hijau+Ukuran:M+Bahan:Katun+Aksesoris:kancing', 'Rp 360000', '-', '-', '-', '-', '-', 'n'),
(16, 'Jumat, 17 Juni 2022 Jam 14:30', 'Adi_987', 'Produk:Kaos Lengan Panjang+Warna:coklat+Ukuran:M+Bahan:Wool+Aksesoris:-', 'Rp 450000', '-', '-', '-', '-', '-', 'n'),
(17, 'Sabtu, 18 Juni 2022 Jam 15:06', 'Joni_213', 'Produk:Kaos Ghibli+Warna:merah+Ukuran:M+Bahan:Katun+Aksesoris:renda', 'Rp 285000', '-', '-', '-', '-', 'kasih hiasan renda motif jepang', 'n'),
(18, 'Sabtu, 18 Juni 2022 Jam 15:09', 'Adi_987', 'Produk:Baju SD+Warna:merah+Ukuran:M+Bahan:Wool+Aksesoris:renda', 'Rp 295000', '-', '-', '-', '-', 'kasih motif asik', 'n'),
(19, 'Sabtu, 18 Juni 2022 Jam 15:28', 'Joni_213', 'Produk:Kaos Polo Bergaris+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:kancing', 'Rp 310000', '-', '-', '-', '-', '-', 'n'),
(20, 'Jumat, 24 Juni 2022 Jam 23:36', 'Joni_213', 'Produk:Kaos Ghibli+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:-', 'Rp 270000', 'sudah bayar', '-', 'JNE', 'TPXL-0000000W118', '-', 'y'),
(21, 'Jumat, 24 Juni 2022 Jam 23:53', 'Joni_213', 'Produk:Kaos Ghibli+Warna:ungu+Ukuran:XXS+Bahan:Katun+Aksesoris:-', 'Rp 270000', '-', 'Sabtu, 25 Juni 2022 Jam 13:50 sudah bayar', '-', '-', '-', 'n'),
(22, 'Sabtu, 25 Juni 2022 Jam 13:51', 'Joni_213', 'Produk:Kaos Final Fantasy VI+Warna:ungu+Ukuran:M+Bahan:Katun+Aksesoris:kancing', 'Rp 360000', '-', '-', '-', '-', 'bagus', 'n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id_akun`);

--
-- Indexes for table `bahan`
--
ALTER TABLE `bahan`
  ADD PRIMARY KEY (`id_bahan`);

--
-- Indexes for table `buktipembayaran`
--
ALTER TABLE `buktipembayaran`
  ADD KEY `FK_buktipembayaran` (`id_pesanan`);

--
-- Indexes for table `daftaraksesoris`
--
ALTER TABLE `daftaraksesoris`
  ADD PRIMARY KEY (`id_aksesoris`);

--
-- Indexes for table `daftarproduk`
--
ALTER TABLE `daftarproduk`
  ADD PRIMARY KEY (`id_produk`),
  ADD KEY `FK_daftarproduk` (`id_model`),
  ADD KEY `FK_daftarproduk1` (`id_bahan`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id_model`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id_akun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bahan`
--
ALTER TABLE `bahan`
  MODIFY `id_bahan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `daftaraksesoris`
--
ALTER TABLE `daftaraksesoris`
  MODIFY `id_aksesoris` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `daftarproduk`
--
ALTER TABLE `daftarproduk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `id_model` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buktipembayaran`
--
ALTER TABLE `buktipembayaran`
  ADD CONSTRAINT `FK_buktipembayaran` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`);

--
-- Constraints for table `daftarproduk`
--
ALTER TABLE `daftarproduk`
  ADD CONSTRAINT `FK_daftarproduk` FOREIGN KEY (`id_model`) REFERENCES `model` (`id_model`),
  ADD CONSTRAINT `FK_daftarproduk1` FOREIGN KEY (`id_bahan`) REFERENCES `bahan` (`id_bahan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
