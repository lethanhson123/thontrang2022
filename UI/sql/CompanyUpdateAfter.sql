create TRIGGER [dbo].[CompanyUpdateAfter] on [dbo].[Company] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

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

update Product set Product.CompanyName=inserted.Display

from Product (nolock) join inserted on Product.ParentID=inserted.ID and inserted.ID=@ID

end

set @IDMin=@IDMin+1

end

END