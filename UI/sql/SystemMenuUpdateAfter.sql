create TRIGGER [dbo].[SystemMenuUpdateAfter] on [dbo].[SystemMenu] AFTER UPDATE

AS
BEGIN

SET NOCOUNT ON;

update MembershipSystemMenu set MembershipSystemMenu.Active=inserted.Active, MembershipSystemMenu.SortOrder=inserted.SortOrder

from MembershipSystemMenu (nolock) join inserted on MembershipSystemMenu.SystemMenuID=inserted.ID

END