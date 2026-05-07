import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const profileAllowed = {
  status: "ok",
  reason: null,
  type: "profile",
  preview: {
    kind: "profile_other",
    image_url: "https://invite.rarelens.ai/og/share/profile/shr_abc123",
    message_text: "Check out Ridhima on RareLens.",
    card_text:
      "Aakash sees Ridhima's answers every day. You're not seeing what Aakash sees.",
    subject: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Ridhima",
      profile_image_url: "https://invite.rarelens.ai/media/profile_pics/ridhima.jpg",
      class_year: "2026",
      primary_major: "Computer Science",
    },
    sharer: {
      id: "22222222-2222-2222-2222-222222222222",
      name: "Aakash",
    },
  },
  destination: {
    app_route:
      "rarelens://share/profile?token=shr_abc123&click_id=9f7c6d47-82f2-4ef1-9bd8-0e4a32d9f001",
    web_path: "/share/profile/shr_abc123",
  },
  access: {
    state: "allowed",
    reason: null,
  },
  meta: {
    version: 1,
    token: "shr_abc123",
    click_id: "9f7c6d47-82f2-4ef1-9bd8-0e4a32d9f001",
    timestamp: "2026-05-06T10:15:30.000000+00:00",
  },
};

const inviteValid = {
  status: "valid",
  click_id: "14d652fc-6dca-40d3-8c61-90a4f6ea2004",
  invite_code: "RARE123",
  canonical_url: "https://invite.rarelens.ai/invite/RARE123",
  inviter: {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Aakash Kakkar",
    profile_image_url: "https://invite.rarelens.ai/media/profile_pics/aakash.jpg",
    class_year: "2026",
    primary_major: "Computer Science",
  },
  social_proof: {
    count: 12345,
  },
};

test("representative share payload keeps backend-owned app route", () => {
  assert.equal(profileAllowed.status, "ok");
  assert.equal(profileAllowed.type, "profile");
  assert.equal(profileAllowed.access.state, "allowed");
  assert.match(profileAllowed.destination.app_route, /^rarelens:\/\/share\/profile/);
});

test("invite deeplink contract uses invite_code and click_id", () => {
  const url = new URL("rarelens://invite");
  url.searchParams.set("invite_code", inviteValid.invite_code);
  url.searchParams.set("click_id", inviteValid.click_id);

  assert.equal(
    url.toString(),
    "rarelens://invite?invite_code=RARE123&click_id=14d652fc-6dca-40d3-8c61-90a4f6ea2004",
  );
});

test("resolver implementation sends preview-only header only for og purpose", async () => {
  const source = await readFile(new URL("../src/lib/resolvers.ts", import.meta.url), "utf8");

  assert.match(source, /purpose === "og"/);
  assert.match(source, /headers\["X-Resolver-Purpose"\] = "og"/);
  assert.doesNotMatch(source, /code=<invite_code>/);
});
