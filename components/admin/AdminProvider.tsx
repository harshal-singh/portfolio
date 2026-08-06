"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader2 } from "lucide-react";
import { fetchAdminContent, type AdminBootstrap, type AdminContent } from "@/lib/admin/client";
import { SetupErrorScreen } from "@/components/admin/SetupErrorScreen";

interface AdminContextValue {
  content: AdminContent;
  spreadsheetId: string;
  publicReadConfigured: boolean;
  refresh: () => Promise<void>;
  updateContent: (patch: Partial<AdminContent>) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [boot, setBoot] = useState<AdminBootstrap | null>(null);
  const [setupError, setSetupError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setSetupError(false);
    try {
      const data = await fetchAdminContent();
      setBoot(data);
    } catch (err) {
      const code = err instanceof Error ? (err as Error & { code?: string }).code : undefined;
      if (code === "SpreadsheetSetupError" || (err instanceof Error && err.message === "SpreadsheetSetupError")) {
        setSetupError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateContent = useCallback((patch: Partial<AdminContent>) => {
    setBoot((prev) =>
      prev ? { ...prev, content: { ...prev.content, ...patch } } : prev
    );
  }, []);

  const value = useMemo(() => {
    if (!boot) return null;
    return {
      content: boot.content,
      spreadsheetId: boot.spreadsheetId,
      publicReadConfigured: boot.publicReadConfigured,
      refresh: load,
      updateContent,
    };
  }, [boot, load, updateContent]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading from Google Sheet…
      </div>
    );
  }

  if (setupError) {
    return <SetupErrorScreen onRetry={load} />;
  }

  if (!value) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        Could not load content. Try refreshing.
      </div>
    );
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
