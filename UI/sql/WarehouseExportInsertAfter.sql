create TRIGGER [dbo].[WarehouseExportInsertAfter] on [dbo].[WarehouseExport] AFTER INSERT

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

update WarehouseExport set WarehouseExport.UserFoundedDisplay=Membership.Display from WarehouseExport (nolock) join Membership (nolock) on WarehouseExport.UserFoundedID=Membership.ID and WarehouseExport.ID=@ID

update WarehouseExport set WarehouseExport.StatusName=Status.Display from WarehouseExport (nolock) join Status (nolock) on WarehouseExport.StatusID=Status.ID and WarehouseExport.ID=@ID

update WarehouseExport set 

WarehouseExport.CompanyCode=Company.Code 

,WarehouseExport.CompanyDisplay=Company.Display 

,WarehouseExport.CompanyTaxCode=Company.TaxCode 

,WarehouseExport.CompanyPhone=Company.Phone 

from WarehouseExport (nolock) join Company (nolock) on WarehouseExport.CompanyID=Company.ID and WarehouseExport.ID=@ID

update WarehouseExport set 

WarehouseExport.CustomerCode=Customer.Code 

,WarehouseExport.CustomerDisplay=Customer.Display 

,WarehouseExport.CustomerTaxCode=Customer.TaxCode 

,WarehouseExport.CustomerPhone=Customer.Phone 

from WarehouseExport (nolock) join Customer (nolock) on WarehouseExport.CustomerID=Customer.ID and WarehouseExport.ID=@ID

exec sp_DeliveryInitializationByWarehouseExportID @WarehouseExportID=@ID

end

set @IDMin=@IDMin+1

end

END