import { AdminProvider } from "@/components/admin/AdminProvider";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
