create TRIGGER [dbo].[WarehouseReturnDetailInsertAfter] on [dbo].[WarehouseReturnDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseReturnDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END