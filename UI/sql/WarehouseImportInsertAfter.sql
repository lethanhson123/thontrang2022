create TRIGGER [dbo].[WarehouseImportInsertAfter] on [dbo].[WarehouseImport] AFTER INSERT

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

update WarehouseImport set WarehouseImport.UserFoundedDisplay=Membership.Display from WarehouseImport (nolock) join Membership (nolock) on WarehouseImport.UserFoundedID=Membership.ID and WarehouseImport.ID=@ID

update WarehouseImport set WarehouseImport.StatusName=Status.Display from WarehouseImport (nolock) join Status (nolock) on WarehouseImport.StatusID=Status.ID and WarehouseImport.ID=@ID

update WarehouseImport set 

WarehouseImport.CompanyCode=Company.Code 

,WarehouseImport.CompanyDisplay=Company.Display 

,WarehouseImport.CompanyTaxCode=Company.TaxCode 

,WarehouseImport.CompanyPhone=Company.Phone 

from WarehouseImport (nolock) join Company (nolock) on WarehouseImport.CompanyID=Company.ID and WarehouseImport.ID=@ID

update WarehouseImport set 

WarehouseImport.CustomerCode=Customer.Code 

,WarehouseImport.CustomerDisplay=Customer.Display 

,WarehouseImport.CustomerTaxCode=Customer.TaxCode 

,WarehouseImport.CustomerPhone=Customer.Phone 

from WarehouseImport (nolock) join Customer (nolock) on WarehouseImport.CustomerID=Customer.ID and WarehouseImport.ID=@ID

end

set @IDMin=@IDMin+1

end

END