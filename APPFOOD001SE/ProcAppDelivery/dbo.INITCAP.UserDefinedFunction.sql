USE [ProcAppDelivery]
GO
/****** Object:  UserDefinedFunction [dbo].[INITCAP]    Script Date: 04/04/2024 03:21:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[INITCAP] (@inputString NVARCHAR(MAX))
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @resultString NVARCHAR(MAX);
    DECLARE @i INT = 1;
    DECLARE @len INT = LEN(@inputString);
    DECLARE @isSpace BIT = 1; -- Flag to track if the current character is a space

    SET @resultString = LOWER(@inputString);

    WHILE @i <= @len
    BEGIN
        IF SUBSTRING(@inputString, @i, 1) = ' '
        BEGIN
            SET @isSpace = 1; -- Current character is a space
        END
        ELSE
        BEGIN
            IF @isSpace = 1
            BEGIN
                SET @resultString = STUFF(@resultString, @i, 1, UPPER(SUBSTRING(@inputString, @i, 1)));
            END
            SET @isSpace = 0; -- Reset the flag
        END

        SET @i = @i + 1;
    END

    RETURN @resultString;
END;
GO
