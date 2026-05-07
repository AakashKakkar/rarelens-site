import { AppOpenController } from "@/components/AppOpenController";
import type { ResolverShellState } from "@/lib/shell-state";

type ResolverShellProps = {
  state: ResolverShellState;
};

function Initials({ label }: { label: string }) {
  const initial = label.trim().charAt(0).toUpperCase() || "R";

  return (
    <div className="flex size-20 items-center justify-center rounded-full bg-[#d7ede9] text-3xl font-bold text-[#0f766e] ring-4 ring-white">
      {initial}
    </div>
  );
}

function statusCopy(status: ResolverShellState["status"]) {
  switch (status) {
    case "blocked":
      return "Open RareLens to continue";
    case "install":
      return "RareLens app required";
    case "outage":
      return "Temporary issue";
    case "unavailable":
      return "Unavailable";
    default:
      return "Ready to open";
  }
}

export function ResolverShell({ state }: ResolverShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="w-full max-w-[560px] rounded-[8px] border border-[#e5ded7] bg-white/90 p-6 shadow-[0_24px_80px_rgba(22,19,17,0.10)] backdrop-blur sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            {state.eyebrow}
          </p>
          <p className="rounded-full border border-[#e5ded7] px-3 py-1 text-xs font-medium text-[#6f6761]">
            {statusCopy(state.status)}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4">
          {state.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              className="size-20 rounded-full object-cover ring-4 ring-white"
              src={state.avatarUrl}
            />
          ) : (
            <Initials label={state.avatarLabel} />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#6f6761]">
              {state.avatarLabel}
            </p>
            {state.socialProof ? (
              <p className="mt-1 text-sm text-[#8a8179]">{state.socialProof}</p>
            ) : null}
          </div>
        </div>

        <h1 className="mt-7 text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.05] tracking-normal text-[#161311]">
          {state.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[#6f6761]">
          {state.description}
        </p>

        <AppOpenController
          androidStoreUrl={state.androidStoreUrl}
          appRoute={state.appRoute}
          iosStoreUrl={state.iosStoreUrl}
          primaryAction={state.primaryAction}
        />
      </section>
    </main>
  );
}
