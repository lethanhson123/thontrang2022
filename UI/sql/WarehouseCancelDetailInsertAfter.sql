create TRIGGER [dbo].[WarehouseCancelDetailInsertAfter] on [dbo].[WarehouseCancelDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseCancelDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END