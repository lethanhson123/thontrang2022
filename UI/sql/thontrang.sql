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

create TRIGGER [dbo].[DeliveryDetailDeleteAfter] on [dbo].[DeliveryDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from deleted

select @IDMax=max(ID) from deleted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID from deleted where ID=@IDMin

if(@ParentID>0)
begin

exec sp_DeliveryInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END

create TRIGGER [dbo].[DeliveryDetailInsertAfter] on [dbo].[DeliveryDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

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

create TRIGGER [dbo].[OrderDetailDeleteAfter] on [dbo].[OrderDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from deleted

select @IDMax=max(ID) from deleted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID from deleted where ID=@IDMin

if(@ParentID>0)
begin

exec sp_OrderInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END

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


create TRIGGER [dbo].[ProductCategoryUpdated] on [dbo].[ProductCategory] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

update Product set Product.ParentName=inserted.Display

from Product (nolock) join inserted on Product.ParentID=inserted.ID

END


create TRIGGER [dbo].[SystemMenuUpdateAfter] on [dbo].[SystemMenu] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

update MembershipSystemMenu set MembershipSystemMenu.Active=inserted.Active, MembershipSystemMenu.SortOrder=inserted.SortOrder

from MembershipSystemMenu (nolock) join inserted on MembershipSystemMenu.SystemMenuID=inserted.ID

END

create TRIGGER [dbo].[WarehouseCancelDetailDeleteAfter] on [dbo].[WarehouseCancelDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ParentID int=0

select @ParentID=ParentID from deleted

exec sp_WarehouseCancelInitializationByID @ID=@ParentID

END

create TRIGGER [dbo].[WarehouseCancelDetailInsertAfter] on [dbo].[WarehouseCancelDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseCancelDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

create TRIGGER [dbo].[WarehouseCancelDetailUpdateAfter] on [dbo].[WarehouseCancelDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseCancelDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

END

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

create TRIGGER [dbo].[WarehouseExportDetailDeleteAfter] on [dbo].[WarehouseExportDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from deleted

select @IDMax=max(ID) from deleted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID from deleted where ID=@IDMin

if(@ParentID>0)
begin

exec sp_WarehouseExportInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END

create TRIGGER [dbo].[WarehouseExportDetailInsertAfter] on [dbo].[WarehouseExportDetail] AFTER INSERT

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

exec sp_WarehouseExportDetailInitializationByID @ID=@ID

end

if(@ProductID>0)
begin

exec sp_ProductInitializationByID @ID=@ProductID

end

set @IDMin=@IDMin+1

end

END

create TRIGGER [dbo].[WarehouseExportDetailUpdateAfter] on [dbo].[WarehouseExportDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ProductID int=0

declare @IDMin int=0

declare @IDMax int=0


select @IDMin=min(ID) from inserted

select @IDMax=max(ID) from inserted

while(@IDMin<=@IDMax)
begin

select @ProductID=ProductID, @ID=ID from inserted where ID=@IDMin

if(@ID>0)
begin

exec sp_WarehouseExportDetailInitializationByID @ID=@ID

end

if(@ProductID>0)
begin

exec sp_ProductInitializationByID @ID=@ProductID

end

set @IDMin=@IDMin+1

end

END

END

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

create TRIGGER [dbo].[WarehouseExportUpdateAfter] on [dbo].[WarehouseExport] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

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

exec sp_DeliveryInitializationByWarehouseExportID @WarehouseExportID=@ID

end

end

END

END

create TRIGGER [dbo].[WarehouseImportDetailDeleteAfter] on [dbo].[WarehouseImportDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ParentID int=0

declare @IDMin int=0

declare @IDMax int=0

select @IDMin=min(ID) from deleted

select @IDMax=max(ID) from deleted

while(@IDMin<=@IDMax)
begin

select @ParentID=ParentID from deleted where ID=@IDMin

if(@ParentID>0)
begin

exec sp_WarehouseImportInitializationByID @ID=@ParentID

end

set @IDMin=@IDMin+1

end

END

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

create TRIGGER [dbo].[WarehouseImportDetailUpdateAfter] on [dbo].[WarehouseImportDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

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

END

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

create TRIGGER [dbo].[WarehouseReturnDetailDeleteAfter] on [dbo].[WarehouseReturnDetail] AFTER DELETE

AS
BEGIN

SET NOCOUNT ON;

declare @ParentID int=0

select @ParentID=ParentID from deleted

exec sp_WarehouseReturnInitializationByID @ID=@ParentID

END

create TRIGGER [dbo].[WarehouseReturnDetailInsertAfter] on [dbo].[WarehouseReturnDetail] AFTER INSERT

AS
BEGIN

SET NOCOUNT ON;

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseReturnDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

create TRIGGER [dbo].[WarehouseReturnDetailUpdateAfter] on [dbo].[WarehouseReturnDetail] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

IF ((SELECT TRIGGER_NESTLEVEL()) < 2)
BEGIN

declare @ID int=0

declare @ProductID int=0

select @ProductID=ProductID, @ID=ID from inserted

exec sp_WarehouseReturnDetailInitializationByID @ID=@ID

--exec sp_ProductInitializationByID @ID=@ProductID

END

END

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
