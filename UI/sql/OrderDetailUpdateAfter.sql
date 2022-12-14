create TRIGGER [dbo].[OrderDetailUpdateAfter] on [dbo].[OrderDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ProductID int=0

declare @CustomerID int=0

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from inserted

select @IDMax=max(ID) from inserted

while(@IDMin<=@IDMax)
begin

select @ParentID=isnull(ParentID,0), @ProductID=isnull(ProductID,0), @ID=isnull(ID,0) from inserted where ID=@IDMin

if(@ID>0)
begin

exec sp_OrderDetailInitializationByID @ID=@ID

end

set @IDMin=@IDMin+1

end

END

END
