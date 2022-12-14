create TRIGGER [dbo].[OrderDetailInsertAfter] on [dbo].[OrderDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

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

select @CustomerID=isnull(CustomerID,0) from [Order] (nolock) where ID=@ParentID

update CustomerPrice set IsWishlist=1 where ParentID=@CustomerID and ProductID=@ProductID

exec sp_OrderDetailInitializationByID @ID=@ID

end

set @IDMin=@IDMin+1

end

END