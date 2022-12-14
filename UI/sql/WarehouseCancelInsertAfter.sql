create TRIGGER [dbo].[WarehouseCancelInsertAfter] on [dbo].[WarehouseCancel] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

select @ID=ID from inserted

update WarehouseCancel set WarehouseCancel.UserFoundedDisplay=Membership.Display from WarehouseCancel (nolock) join Membership (nolock) on WarehouseCancel.UserFoundedID=Membership.ID and WarehouseCancel.ID=@ID

update WarehouseCancel set WarehouseCancel.StatusName=Status.Display from WarehouseCancel (nolock) join Status (nolock) on WarehouseCancel.StatusID=Status.ID and WarehouseCancel.ID=@ID

update WarehouseCancel set 

WarehouseCancel.CompanyCode=Company.Code 

,WarehouseCancel.CompanyDisplay=Company.Display 

,WarehouseCancel.CompanyTaxCode=Company.TaxCode 

,WarehouseCancel.CompanyPhone=Company.Phone 

from WarehouseCancel (nolock) join Company (nolock) on WarehouseCancel.CompanyID=Company.ID and WarehouseCancel.ID=@ID

update WarehouseCancel set 

WarehouseCancel.CustomerCode=Customer.Code 

,WarehouseCancel.CustomerDisplay=Customer.Display 

,WarehouseCancel.CustomerTaxCode=Customer.TaxCode 

,WarehouseCancel.CustomerPhone=Customer.Phone 

from WarehouseCancel (nolock) join Customer (nolock) on WarehouseCancel.CustomerID=Customer.ID and WarehouseCancel.ID=@ID


END