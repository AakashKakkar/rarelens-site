import { renderShareContentOgImage } from "@/lib/og";
import { resolveShare } from "@/lib/resolvers";

type Context = {
  params: Promise<{
    share_token: string;
  }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { share_token: shareToken } = await params;
  const outcome = await resolveShare(shareToken, "og");

  return renderShareContentOgImage(outcome.ok ? outcome.data : null);
}
