import type { Metadata } from "next";
import { ResolverShell } from "@/components/ResolverShell";
import { inviteMetadata } from "@/lib/metadata";
import { resolveInvite } from "@/lib/resolvers";
import { inviteShellState } from "@/lib/shell-state";

type Props = {
  params: Promise<{
    invite_code: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { invite_code: inviteCode } = await params;
  const outcome = await resolveInvite(inviteCode, "og");

  return inviteMetadata(outcome, inviteCode);
}

export default async function InvitePage({ params }: Props) {
  const { invite_code: inviteCode } = await params;
  const outcome = await resolveInvite(inviteCode, "attribution");

  return <ResolverShell state={inviteShellState(outcome)} />;
}
