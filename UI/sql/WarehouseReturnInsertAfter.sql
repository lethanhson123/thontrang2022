create TRIGGER [dbo].[WarehouseReturnInsertAfter] on [dbo].[WarehouseReturn] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

select @ID=ID from inserted

update WarehouseReturn set WarehouseReturn.UserFoundedDisplay=Membership.Display from WarehouseReturn (nolock) join Membership (nolock) on WarehouseReturn.UserFoundedID=Membership.ID and WarehouseReturn.ID=@ID

update WarehouseReturn set WarehouseReturn.StatusName=Status.Display from WarehouseReturn (nolock) join Status (nolock) on WarehouseReturn.StatusID=Status.ID and WarehouseReturn.ID=@ID

update WarehouseReturn set 

WarehouseReturn.CompanyCode=Company.Code 

,WarehouseReturn.CompanyDisplay=Company.Display 

,WarehouseReturn.CompanyTaxCode=Company.TaxCode 

,WarehouseReturn.CompanyPhone=Company.Phone 

from WarehouseReturn (nolock) join Company (nolock) on WarehouseReturn.CompanyID=Company.ID and WarehouseReturn.ID=@ID

update WarehouseReturn set 

WarehouseReturn.CustomerCode=Customer.Code 

,WarehouseReturn.CustomerDisplay=Customer.Display 

,WarehouseReturn.CustomerTaxCode=Customer.TaxCode 

,WarehouseReturn.CustomerPhone=Customer.Phone 

from WarehouseReturn (nolock) join Customer (nolock) on WarehouseReturn.CustomerID=Customer.ID and WarehouseReturn.ID=@ID


END