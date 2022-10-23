create TRIGGER [dbo].[WarehouseReturnDetailDeleteAfter] on [dbo].[WarehouseReturnDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ParentID int=0

select @ParentID=ParentID from deleted

exec sp_WarehouseReturnInitializationByID @ID=@ParentID

END