create TRIGGER [dbo].[WarehouseReturnDetailUpdateAfter] on [dbo].[WarehouseReturnDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseReturnDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

END