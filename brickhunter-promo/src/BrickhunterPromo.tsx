/**
 * BrickhunterPromo — 30s promotional video for the Brickhunter storefront.
 * 1920x1080 @ 30fps (900 frames). Uses the storefront's documented
 * "Brutalist Luxury" brand tokens (docs/DESIGN.md) and real project assets
 * copied into public/ — no stock/placeholder content.
 */

import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: serif } = loadPlayfair();
const { fontFamily: mono } = loadJetBrains();

// Brand tokens — Brutalist Luxury (docs/DESIGN.md)
const VOID = "#0A0A0A";
const EMBER = "#D83528";
const BONE = "#F0F0F0";
const ASH = "#8A8A8A";
const GOLD = "#C5A059";
const ONYX = "#161616";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Fade a section in over its first 12 frames and out over its last 12. */
const sectionOpacity = (frame: number, duration: number) =>
  interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const riseIn = (frame: number, from: number, distance = 40) => ({
  opacity: interpolate(frame, [from, from + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  }),
  translate: `0px ${interpolate(frame, [from, from + 25], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  })}px`,
});

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = ASH,
}) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 22,
      letterSpacing: "0.45em",
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);

// ─── 1. Intro (0–90): wordmark on void ────────────────────────────────────
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VOID,
        justifyContent: "center",
        alignItems: "center",
        gap: 36,
        opacity: sectionOpacity(frame, 90),
      }}
    >
      <div style={riseIn(frame, 5)}>
        <Kicker>Brutalist Luxury Storefront</Kicker>
      </div>
      <div
        style={{
          fontFamily: serif,
          fontSize: 150,
          color: BONE,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          ...riseIn(frame, 12),
        }}
      >
        Brickhunter
      </div>
      <div
        style={{
          height: 2,
          backgroundColor: GOLD,
          width: interpolate(frame, [25, 65], [0, 560], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeOut,
          }),
        }}
      />
    </AbsoluteFill>
  );
};

// ─── 2. Hero (90–240): real hero screenshot, slow dolly ───────────────────
const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: VOID, opacity: sectionOpacity(frame, 150) }}>
      <Img
        src={staticFile("hero-desktop.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(
            interpolate(frame, [0, 150], [1.05, 1.14], { easing: Easing.linear }),
          ),
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${VOID} 0%, transparent 45%, ${VOID}66 100%)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: 110, gap: 22 }}>
        <div style={riseIn(frame, 15)}>
          <Kicker color={GOLD}>One brick. One custodian.</Kicker>
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: 96,
            color: BONE,
            lineHeight: 1.05,
            maxWidth: 1100,
            ...riseIn(frame, 25),
          }}
        >
          It&rsquo;s not a brick. It&rsquo;s a lifestyle.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── 3. Provenance (240–420): 3 real brick photos + story copy ────────────
const PROVENANCE_STEPS = [
  { src: "brick-clay-raw.webp", step: "01", title: "Compressed Earth." },
  { src: "brick-kiln-fired.webp", step: "02", title: "Calcined Fire." },
  { src: "brick-structure-analysis.webp", step: "03", title: "Timeless Structure." },
];

const Provenance: React.FC = () => {
  const frame = useCurrentFrame();
  const PER = 60; // frames per step
  return (
    <AbsoluteFill style={{ backgroundColor: VOID, opacity: sectionOpacity(frame, 180) }}>
      {PROVENANCE_STEPS.map((s, i) => {
        const local = frame - i * PER;
        // Later steps stack on top of earlier ones and simply fade in —
        // the previous photo stays fully rendered underneath, so step
        // boundaries crossfade instead of dipping to black.
        const visible = interpolate(local, [0, 14], [i === 0 ? 1 : 0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <AbsoluteFill key={s.step} style={{ opacity: visible, backgroundColor: VOID }}>
            <Img
              src={staticFile(s.src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.55,
                scale: String(
                  interpolate(local, [0, PER], [1, 1.06], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                ),
              }}
            />
            <AbsoluteFill
              style={{
                background: `linear-gradient(to top, ${VOID} 5%, transparent 60%)`,
              }}
            />
            <AbsoluteFill style={{ justifyContent: "flex-end", padding: 110, gap: 18 }}>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 24,
                  letterSpacing: "0.4em",
                  color: EMBER,
                }}
              >
                {s.step}
              </div>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: 88,
                  color: BONE,
                  ...riseIn(local, 5, 30),
                }}
              >
                {s.title}
              </div>
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── 4. Specs (420–570): native stat animations, real values ──────────────
const STATS = [
  { label: "Thermal Synthesis", value: "1,200°C", countTo: 1200, suffix: "°C" },
  { label: "Mass Index", value: "4.2 kg", countTo: 4.2, suffix: " kg", decimals: 1 },
  { label: "Curation Defect Limit", value: "0.001%" },
  { label: "Earthen Origin", value: "1890", countTo: 1890 },
  { label: "Projected Life", value: "∞ Yrs" },
];

const Specs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VOID,
        justifyContent: "center",
        padding: 110,
        gap: 60,
        opacity: sectionOpacity(frame, 150),
      }}
    >
      <div style={riseIn(frame, 5)}>
        <Kicker>Technical Specifications of Absolute Structuralism</Kicker>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
        {STATS.map((s, i) => {
          const from = 15 + i * 10;
          let display = s.value;
          if (s.countTo !== undefined) {
            const v = interpolate(frame, [from, from + 40], [0, s.countTo], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            });
            const num = s.decimals ? v.toFixed(s.decimals) : Math.round(v).toLocaleString("en-US");
            display = `${num}${s.suffix ?? ""}`;
          }
          return (
            <div
              key={s.label}
              style={{
                backgroundColor: ONYX,
                border: `1px solid ${ASH}33`,
                padding: "44px 52px",
                minWidth: 480,
                flex: "1 1 480px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                ...riseIn(frame, from, 30),
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 20,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: ASH,
                }}
              >
                {s.label}
              </span>
              <span style={{ fontFamily: mono, fontSize: 84, color: EMBER, letterSpacing: "-0.03em" }}>
                {display}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── 5. The Commons (570–720): real section screenshot + copy ─────────────
const Commons: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: VOID, opacity: sectionOpacity(frame, 150) }}>
      <Img
        src={staticFile("the-commons.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          opacity: 0.4,
          translate: `0px ${interpolate(frame, [0, 150], [0, -60])}px`,
        }}
      />
      <AbsoluteFill
        style={{ background: `linear-gradient(to right, ${VOID} 30%, transparent 90%)` }}
      />
      <AbsoluteFill style={{ justifyContent: "center", padding: 110, gap: 30 }}>
        <div
          style={{
            border: `1px solid ${GOLD}66`,
            backgroundColor: ONYX,
            padding: "14px 26px",
            width: "fit-content",
            ...riseIn(frame, 8),
          }}
        >
          <Kicker color={GOLD}>Local Exchange &bull; Bangladesh</Kicker>
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: 92,
            color: BONE,
            ...riseIn(frame, 18),
          }}
        >
          The Commons.
        </div>
        <div
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 44,
            color: ASH,
            maxWidth: 950,
            ...riseIn(frame, 28),
          }}
        >
          One brick is a statement. Ten thousand build a home.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─── 6. Outro (720–900): CTA + museum-grade sign-off ──────────────────────
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: VOID,
        justifyContent: "center",
        alignItems: "center",
        gap: 34,
        opacity: sectionOpacity(frame, 180),
      }}
    >
      <div
        style={{ fontFamily: serif, fontSize: 116, color: BONE, ...riseIn(frame, 8) }}
      >
        Acquire the Brick.
      </div>
      <div
        style={{
          fontFamily: mono,
          fontSize: 54,
          color: GOLD,
          letterSpacing: "-0.02em",
          ...riseIn(frame, 22),
        }}
      >
        $1,250.00 USD
      </div>
      <div
        style={{
          height: 1,
          width: 420,
          backgroundColor: `${ASH}44`,
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          fontFamily: serif,
          fontSize: 44,
          color: BONE,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          ...riseIn(frame, 55),
        }}
      >
        Brickhunter
      </div>
      <div style={riseIn(frame, 70)}>
        <Kicker>Unyielding &bull; Elemental &bull; Absolute</Kicker>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main composition ──────────────────────────────────────────────────────
export const BrickhunterPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOID }}>
      <Sequence name="Intro" durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence name="Hero" from={90} durationInFrames={150}>
        <Hero />
      </Sequence>
      <Sequence name="Provenance" from={240} durationInFrames={180}>
        <Provenance />
      </Sequence>
      <Sequence name="Specs" from={420} durationInFrames={150}>
        <Specs />
      </Sequence>
      <Sequence name="The Commons" from={570} durationInFrames={150}>
        <Commons />
      </Sequence>
      <Sequence name="Outro" from={720} durationInFrames={180}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
