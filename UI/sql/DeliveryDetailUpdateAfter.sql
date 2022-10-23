create TRIGGER [dbo].[DeliveryDetailUpdateAfter] on [dbo].[DeliveryDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from inserted

select @IDMax=max(ID) from inserted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID, @ID=ID from inserted where ID=@IDMin

if(@ID>0)
begin

exec sp_DeliveryDetailInitializationByID @ID=@ID

end

if(@ParentID>0)
begin

exec sp_DeliveryInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END

END