create TRIGGER [dbo].[WarehouseCancelDetailDeleteAfter] on [dbo].[WarehouseCancelDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ParentID int=0

select @ParentID=ParentID from deleted

exec sp_WarehouseCancelInitializationByID @ID=@ParentID

END