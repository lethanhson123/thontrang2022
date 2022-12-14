create TRIGGER [dbo].[OrderInsertAfter] on [dbo].[Order] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

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

update [Order] set [Order].UserFoundedDisplay=Membership.Display from [Order] (nolock) join Membership (nolock) on [Order].UserFoundedID=Membership.ID and [Order].ID=@ID

update [Order] set [Order].StatusName=Status.Display from [Order] (nolock) join Status (nolock) on [Order].StatusID=Status.ID and [Order].ID=@ID

update [Order] set 

[Order].CompanyCode=Company.Code 

,[Order].CompanyDisplay=Company.Display 

,[Order].CompanyTaxCode=Company.TaxCode 

,[Order].CompanyPhone=Company.Phone 

from [Order] (nolock) join Company (nolock) on [Order].CompanyID=Company.ID and [Order].ID=@ID

update [Order] set 

[Order].CustomerCode=Customer.Code 

,[Order].CustomerDisplay=Customer.Display 

,[Order].CustomerTaxCode=Customer.TaxCode 

,[Order].CustomerPhone=Customer.Phone 

from [Order] (nolock) join Customer (nolock) on [Order].CustomerID=Customer.ID and [Order].ID=@ID

end

set @IDMin=@IDMin+1

end

END