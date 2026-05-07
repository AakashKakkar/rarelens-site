import { renderInviteOgImage } from "@/lib/og";
import { resolveInvite } from "@/lib/resolvers";

type Context = {
  params: Promise<{
    invite_code: string;
  }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { invite_code: inviteCode } = await params;
  const outcome = await resolveInvite(inviteCode, "og");

  return renderInviteOgImage(outcome.ok ? outcome.data : null);
}
