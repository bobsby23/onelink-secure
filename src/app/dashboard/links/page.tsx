
import { loggedInUser } from "@/lib/data";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { AddLinkDialog } from "./_components/add-link-dialog";

export default function LinksPage() {
  const links = loggedInUser.profile.blocks.filter(block => block.type === 'link');

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Links</h1>
          <p className="text-muted-foreground">
            Manage all your public, private, and friends-only links.
          </p>
        </div>
        <AddLinkDialog />
      </div>
      <DataTable columns={columns} data={links} />
    </div>
  );
}
