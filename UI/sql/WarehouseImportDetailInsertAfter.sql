create TRIGGER [dbo].[WarehouseImportDetailInsertAfter] on [dbo].[WarehouseImportDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

declare @IDMin int=0

declare @IDMax int=0


select @IDMin=min(ID) from inserted

select @IDMax=max(ID) from inserted

while(@IDMin<=@IDMax)
begin

select @ProductID=ProductID, @ID=ID from inserted where ID=@IDMin

if(@ID>0)
begin

exec sp_WarehouseImportDetailInitializationByID @ID=@ID

end

if(@ProductID>0)
begin

exec sp_ProductInitializationByID @ID=@ProductID

end

set @IDMin=@IDMin+1

end

END