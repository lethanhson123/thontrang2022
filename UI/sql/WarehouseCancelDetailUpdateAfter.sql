create TRIGGER [dbo].[WarehouseCancelDetailUpdateAfter] on [dbo].[WarehouseCancelDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseCancelDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

END