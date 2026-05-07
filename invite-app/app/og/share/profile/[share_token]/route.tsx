import { renderFallbackOgImage, renderShareProfileOgImage } from "@/lib/og";
import { resolveShare } from "@/lib/resolvers";

type Context = {
  params: Promise<{
    share_token: string;
  }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { share_token: shareToken } = await params;
  const outcome = await resolveShare(shareToken, "og");

  if (!outcome.ok) {
    return renderFallbackOgImage();
  }

  return renderShareProfileOgImage(outcome.data);
}
