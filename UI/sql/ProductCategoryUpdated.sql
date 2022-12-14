create TRIGGER [dbo].[ProductCategoryUpdated] on [dbo].[ProductCategory] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

update Product set Product.ParentName=inserted.Display

from Product (nolock) join inserted on Product.ParentID=inserted.ID

END