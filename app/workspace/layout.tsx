import WorkspaceHeader from "@/components/custom/WorkspaceHeader";
import Provider from "@/app/provider";

function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div>
        <WorkspaceHeader/>
        {children}
      </div>
    </Provider>
  )
}

export default WorkspaceLayout