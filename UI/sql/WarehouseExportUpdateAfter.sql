create TRIGGER [dbo].[WarehouseExportUpdateAfter] on [dbo].[WarehouseExport] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @IDMin int=0

declare @IDMax int=0


select @IDMin=min(ID) from inserted

select @IDMax=max(ID) from inserted

while(@IDMin<=@IDMax)
begin

select @ID=ID from inserted where ID=@IDMin

if(@ID>0)
begin

exec sp_DeliveryInitializationByWarehouseExportID @WarehouseExportID=@ID

end

end

END

END