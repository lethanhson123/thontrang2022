create TRIGGER [dbo].[WarehouseExportDetailDeleteAfter] on [dbo].[WarehouseExportDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from deleted

select @IDMax=max(ID) from deleted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID from deleted where ID=@IDMin

if(@ParentID>0)
begin

exec sp_WarehouseExportInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END