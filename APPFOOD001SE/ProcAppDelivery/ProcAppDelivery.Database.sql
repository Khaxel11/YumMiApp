USE [master]
GO
/****** Object:  Database [ProcAppDelivery]    Script Date: 04/04/2024 03:21:11 p. m. ******/
CREATE DATABASE [ProcAppDelivery]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProcAppDelivery', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLDEV2017\MSSQL\DATA\ProcAppDelivery.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProcAppDelivery_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLDEV2017\MSSQL\DATA\ProcAppDelivery_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ProcAppDelivery] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProcAppDelivery].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProcAppDelivery] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProcAppDelivery] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProcAppDelivery] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ProcAppDelivery] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProcAppDelivery] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET RECOVERY FULL 
GO
ALTER DATABASE [ProcAppDelivery] SET  MULTI_USER 
GO
ALTER DATABASE [ProcAppDelivery] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProcAppDelivery] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProcAppDelivery] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProcAppDelivery] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProcAppDelivery] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ProcAppDelivery', N'ON'
GO
ALTER DATABASE [ProcAppDelivery] SET QUERY_STORE = OFF
GO
ALTER DATABASE [ProcAppDelivery] SET  READ_WRITE 
GO
