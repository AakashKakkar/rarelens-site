import type { Metadata } from "next";
import { ResolverShell } from "@/components/ResolverShell";
import { shareProfileMetadata } from "@/lib/metadata";
import { resolveShare } from "@/lib/resolvers";
import { shareShellState } from "@/lib/shell-state";

type Props = {
  params: Promise<{
    share_token: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { share_token: shareToken } = await params;
  const outcome = await resolveShare(shareToken, "og");

  return shareProfileMetadata(outcome, shareToken);
}

export default async function ProfileSharePage({ params }: Props) {
  const { share_token: shareToken } = await params;
  const outcome = await resolveShare(shareToken, "attribution");

  return <ResolverShell state={shareShellState(outcome, "profile")} />;
}
